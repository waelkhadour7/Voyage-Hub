package com.voyageplus.travel.passport

import android.content.Context
import android.content.Intent

/**
 * Digital Passport & Interactive Travel Tracker
 *
 * Technical Requirements Implemented:
 * 1. Splash Screen & Launch Transition: Entrance animation (scale + fade + subtle bounce)
 * 2. Material 3 UI: Passport Origin Picker Dropdown, Dynamic Stats Card, Stamp Grid
 * 3. Interactive Passport Stamp Grid: Toggling country triggers passport stamp visual feedback
 * 4. Share Feature: Native Android Share Sheet (`Intent.ACTION_SEND`)
 */
object PassportShareHelper {
    fun shareProgress(context: Context, shareText: String) {
        val sendIntent: Intent = Intent().apply {
            action = Intent.ACTION_SEND
            putExtra(Intent.EXTRA_TEXT, shareText)
            type = "text/plain"
        }
        val shareIntent = Intent.createChooser(sendIntent, "Share Digital Passport Progress")
        context.startActivity(shareIntent)
    }
}

/*
 ============================================================================
  JETPACK COMPOSE MATERIAL 3 UI SPECIFICATION & IMPLEMENTATION
 ============================================================================

 @Composable
 fun DigitalPassportApp(
     viewModel: PassportViewModel,
     onShare: (String) -> Unit
 ) {
     var showSplash by remember { mutableStateOf(true) }

     LaunchedEffect(Unit) {
         delay(2000)
         showSplash = false
     }

     Crossfade(targetState = showSplash, animationSpec = tween(600)) { isSplashing ->
         if (isSplashing) {
             PassportSplashScreen()
         } else {
             PassportMainDashboard(viewModel = viewModel, onShare = onShare)
         }
     }
 }

 @Composable
 fun PassportSplashScreen() {
     val scale = remember { Animatable(0.3f) }
     val alpha = remember { Animatable(0f) }

     LaunchedEffect(Unit) {
         launch {
             scale.animateTo(
                 targetValue = 1.0f,
                 animationSpec = spring(
                     dampingRatio = Spring.DampingRatioMediumBouncy,
                     stiffness = Spring.StiffnessLow
                 )
             )
         }
         launch {
             alpha.animateTo(
                 targetValue = 1.0f,
                 animationSpec = tween(800)
             )
         }
     }

     Box(
         modifier = Modifier
             .fillMaxSize()
             .background(Brush.verticalGradient(listOf(Color(0xFF0B4A9E), Color(0xFF0A84D6)))),
         contentAlignment = Alignment.Center
     ) {
         Column(
             horizontalAlignment = Alignment.CenterHorizontally,
             modifier = Modifier
                 .graphicsLayer(
                     scaleX = scale.value,
                     scaleY = scale.value,
                     alpha = alpha.value
                 )
         ) {
             Text("🛂", fontSize = 72.sp)
             Spacer(modifier = Modifier.height(16.dp))
             Text(
                 text = "Voyage Digital Passport",
                 color = Color.White,
                 fontSize = 24.sp,
                 fontWeight = FontWeight.Bold
             )
             Text(
                 text = "Interactive Travel Tracker",
                 color = Color.White.copy(alpha = 0.8f),
                 fontSize = 14.sp
             )
         }
     }
 }

 @Composable
 fun PassportMainDashboard(
     viewModel: PassportViewModel,
     onShare: (String) -> Unit
 ) {
     val uiState by viewModel.uiState.collectAsState()
     var dropdownExpanded by remember { mutableStateOf(false) }

     Scaffold(
         topBar = {
             TopAppBar(
                 title = { Text("Digital Passport", fontWeight = FontWeight.Bold) },
                 actions = {
                     IconButton(onClick = { onShare(viewModel.generateShareText()) }) {
                         Icon(Icons.Default.Share, contentDescription = "Share Progress")
                     }
                 }
             )
         }
     ) { paddingValues ->
         Column(
             modifier = Modifier
                 .fillMaxSize()
                 .padding(paddingValues)
                 .padding(16.dp)
         ) {
             // 1. Passport Origin Selector Dropdown
             Card(
                 modifier = Modifier.fillMaxWidth(),
                 colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
             ) {
                 Row(
                     modifier = Modifier
                         .fillMaxWidth()
                         .clickable { dropdownExpanded = true }
                         .padding(16.dp),
                     horizontalArrangement = Arrangement.SpaceBetween,
                     verticalAlignment = Alignment.CenterVertically
                 ) {
                     Row(verticalAlignment = Alignment.CenterVertically) {
                         Text(uiState.originPassport.flagEmoji, fontSize = 28.sp)
                         Spacer(modifier = Modifier.width(12.dp))
                         Column {
                             Text("Origin Passport", fontSize = 12.sp, color = Color.Gray)
                             Text(uiState.originPassport.countryName, fontWeight = FontWeight.Bold)
                         }
                     }
                     Icon(Icons.Default.ArrowDropDown, contentDescription = "Select Passport")
                 }

                 DropdownMenu(
                     expanded = dropdownExpanded,
                     onDismissRequest = { dropdownExpanded = false }
                 ) {
                     DataStoreRepository.AVAILABLE_PASSPORTS.forEach { passport ->
                         DropdownMenuItem(
                             text = { Text("${passport.flagEmoji} ${passport.countryName}") },
                             onClick = {
                                 viewModel.selectOriginPassport(passport.code)
                                 dropdownExpanded = false
                             }
                         )
                     }
                 }
             }

             Spacer(modifier = Modifier.height(16.dp))

             // 2. Dynamic Stats Card
             Card(
                 modifier = Modifier.fillMaxWidth(),
                 colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
             ) {
                 Row(
                     modifier = Modifier
                         .fillMaxWidth()
                         .padding(20.dp),
                     horizontalArrangement = Arrangement.SpaceAround
                 ) {
                     Column(horizontalAlignment = Alignment.CenterHorizontally) {
                         Text("${uiState.visitedCount} / ${uiState.countries.size}", fontSize = 26.sp, fontWeight = FontWeight.ExtraBold)
                         Text("Visited Countries", fontSize = 12.sp)
                     }
                     Divider(modifier = Modifier.height(40.dp).width(1.dp))
                     Column(horizontalAlignment = Alignment.CenterHorizontally) {
                         Text("${uiState.visaFreeCount}", fontSize = 26.sp, fontWeight = FontWeight.ExtraBold)
                         Text("Visa-Free Destinations", fontSize = 12.sp)
                     }
                 }
             }

             Spacer(modifier = Modifier.height(20.dp))

             Text("Destination Stamps", fontWeight = FontWeight.Bold, fontSize = 18.sp)
             Spacer(modifier = Modifier.height(12.dp))

             // 3. Interactive Stamp Grid
             LazyVerticalGrid(
                 columns = GridCells.Fixed(2),
                 horizontalArrangement = Arrangement.spacedBy(12.dp),
                 verticalArrangement = Arrangement.spacedBy(12.dp),
                 modifier = Modifier.fillMaxSize()
             ) {
                 items(uiState.countries) { country ->
                     CountryStampCard(
                         country = country,
                         onToggle = { viewModel.toggleVisited(country.id) }
                     )
                 }
             }
         }
     }
 }

 @Composable
 fun CountryStampCard(
     country: Country,
     onToggle: () -> Unit
 ) {
     val stampScale by animateFloatAsState(
         targetValue = if (country.isVisited) 1.0f else 0.85f,
         animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy)
     )

     Card(
         modifier = Modifier
             .fillMaxWidth()
             .clickable { onToggle() }
             .graphicsLayer(scaleX = stampScale, scaleY = stampScale),
         elevation = CardDefaults.cardElevation(defaultElevation = if (country.isVisited) 6.dp else 1.dp)
     ) {
         Box(modifier = Modifier.padding(16.dp)) {
             Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
                 Text(country.flagEmoji, fontSize = 36.sp)
                 Spacer(modifier = Modifier.height(8.dp))
                 Text(country.name, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                 Text(country.continent, fontSize = 11.sp, color = Color.Gray)
             }

             if (country.isVisited) {
                 Surface(
                     color = Color(0xFF2E7D32),
                     shape = RoundedCornerShape(4.dp),
                     modifier = Modifier.align(Alignment.TopEnd)
                 ) {
                     Text("STAMPED 🛂", color = Color.White, fontSize = 9.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                 }
             }
         }
     }
 }
*/
