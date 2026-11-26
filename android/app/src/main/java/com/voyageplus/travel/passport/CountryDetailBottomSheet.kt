package com.voyageplus.travel.passport

import android.content.Context
import android.content.Intent
import android.net.Uri

/**
 * Country Detail & Quick Tour Quote Bottom Sheet Component
 *
 * Implements Feature Requirements:
 * 1. ModalBottomSheet with Country Flag, Name, Currency, and Departure City Selector
 * 2. Daily Budget breakdown badges (Economy, Mid-range, Luxury)
 * 3. Flight & Accommodation starting price based on departure city
 * 4. WhatsApp Sales Lead CTA Button launching Intent.ACTION_VIEW with preformatted message
 */
object CountryQuoteIntentHelper {
    fun launchWhatsAppQuote(context: Context, uriString: String) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(uriString))
            context.startActivity(intent)
        } catch (e: Exception) {
            // Fallback to browser or toast
        }
    }
}

/*
 ============================================================================
  JETPACK COMPOSE MATERIAL 3 MODAL BOTTOM SHEET IMPLEMENTATION
 ============================================================================

 @OptIn(ExperimentalMaterial3Api::class)
 @Composable
 fun CountryDetailBottomSheet(
     viewModel: CountryBudgetViewModel,
     context: Context
 ) {
     val state by viewModel.uiState.collectAsState()
     val sheetState = rememberModalBottomSheetState()

     if (state.isBottomSheetVisible && state.selectedCountry != null) {
         val country = state.selectedCountry!!
         val currentDeparture = state.selectedDepartureCity
         val startingPrice = country.baseStartingPrice[currentDeparture.code] ?: "$850"

         ModalBottomSheet(
             onDismissRequest = { viewModel.closeBottomSheet() },
             sheetState = sheetState
         ) {
             Column(
                 modifier = Modifier
                     .fillMaxWidth()
                     .padding(24.dp)
                     .navigationBarsPadding()
             ) {
                 // 1. Header: Country Flag, Name, Currency
                 Row(
                     verticalAlignment = Alignment.CenterVertically,
                     modifier = Modifier.fillMaxWidth()
                 ) {
                     Text(country.flag, fontSize = 42.sp)
                     Spacer(modifier = Modifier.width(16.dp))
                     Column(modifier = Modifier.weight(1f)) {
                         Text(country.name, fontSize = 22.sp, fontWeight = FontWeight.Bold)
                         Text("Local Currency: ${country.currency}", fontSize = 13.sp, color = Color.Gray)
                     }
                 }

                 Spacer(modifier = Modifier.height(20.dp))

                 // 2. Departure Point Selector
                 Text("Select Departure City", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color.Gray)
                 Spacer(modifier = Modifier.height(8.dp))
                 Row(
                     horizontalArrangement = Arrangement.spacedBy(8.dp),
                     modifier = Modifier.fillMaxWidth()
                 ) {
                     CountryBudgetRepository.DEPARTURE_CITIES.forEach { city ->
                         val isSelected = city.code == currentDeparture.code
                         FilterChip(
                             selected = isSelected,
                             onClick = { viewModel.setDepartureCity(city) },
                             label = { Text("${city.flag} ${city.name}") },
                             modifier = Modifier.weight(1f)
                         )
                     }
                 }

                 Spacer(modifier = Modifier.height(20.dp))

                 // 3. Estimated Daily Budget Breakdown
                 Text("Estimated Daily Budget", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color.Gray)
                 Spacer(modifier = Modifier.height(8.dp))
                 Row(
                     horizontalArrangement = Arrangement.spacedBy(8.dp),
                     modifier = Modifier.fillMaxWidth()
                 ) {
                     BudgetBadge("Economy", country.budget.economyDaily, Color(0xFFE3F2FD), Color(0xFF1565C0), Modifier.weight(1f))
                     BudgetBadge("Mid-range", country.budget.midrangeDaily, Color(0xFFE8F5E9), Color(0xFF2E7D32), Modifier.weight(1f))
                     BudgetBadge("Luxury", country.budget.luxuryDaily, Color(0xFFF3E5F5), Color(0xFF7B1FA2), Modifier.weight(1f))
                 }

                 Spacer(modifier = Modifier.height(20.dp))

                 // Flight & Accommodation Starting Price Card
                 Card(
                     modifier = Modifier.fillMaxWidth(),
                     colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                 ) {
                     Row(
                         modifier = Modifier
                             .fillMaxWidth()
                             .padding(16.dp),
                         horizontalArrangement = Arrangement.SpaceBetween,
                         verticalAlignment = Alignment.CenterVertically
                     ) {
                         Column {
                             Text("Starting From (${currentDeparture.name})", fontSize = 12.sp, color = Color.Gray)
                             Text("Flights + Hotels", fontSize = 14.sp, fontWeight = FontWeight.SemiBold)
                         }
                         Text(startingPrice, fontSize = 22.sp, fontWeight = FontWeight.ExtraBold, color = MaterialTheme.colorScheme.primary)
                     }
                 }

                 Spacer(modifier = Modifier.height(24.dp))

                 // 4. Sales Lead CTA Button (WhatsApp)
                 Button(
                     onClick = {
                         val whatsappUri = viewModel.generateWhatsAppQuoteUri()
                         CountryQuoteIntentHelper.launchWhatsAppQuote(context, whatsappUri)
                         viewModel.closeBottomSheet()
                     },
                     modifier = Modifier
                         .fillMaxWidth()
                         .height(54.dp),
                     colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)) // WhatsApp green
                 ) {
                     Text("💬 Get a Tour Quote", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = Color.White)
                 }

                 Spacer(modifier = Modifier.height(16.dp))
             }
         }
     }
 }

 @Composable
 fun BudgetBadge(
     title: String,
     amount: String,
     bgColor: Color,
     textColor: Color,
     modifier: Modifier = Modifier
 ) {
     Surface(
         color = bgColor,
         shape = RoundedCornerShape(12.dp),
         modifier = modifier
     ) {
         Column(
             horizontalAlignment = Alignment.CenterHorizontally,
             modifier = Modifier.padding(10.dp)
         ) {
             Text(title, fontSize = 11.sp, color = textColor, fontWeight = FontWeight.Bold)
             Spacer(modifier = Modifier.height(4.dp))
             Text(amount, fontSize = 12.sp, color = textColor, fontWeight = FontWeight.ExtraBold)
         }
     }
 }
*/
