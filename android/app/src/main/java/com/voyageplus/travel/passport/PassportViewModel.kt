package com.voyageplus.travel.passport

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class PassportViewModel(
    private val repository: PassportRepository
) : ViewModel() {

    private val viewModelScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)

    val uiState: StateFlow<PassportUiState> = combine(
        repository.getOriginPassportCode(),
        repository.getVisitedCountries()
    ) { passportCode, visitedIds ->
        val origin = DataStoreRepository.AVAILABLE_PASSPORTS.find { it.code == passportCode }
            ?: DataStoreRepository.AVAILABLE_PASSPORTS.first()

        val updatedCountries = DataStoreRepository.DEFAULT_COUNTRIES.map { country ->
            country.copy(isVisited = visitedIds.contains(country.id))
        }

        val visitedCount = updatedCountries.count { it.isVisited }
        val visaFreeCount = updatedCountries.count { it.isVisaFree }

        PassportUiState(
            originPassport = origin,
            countries = updatedCountries,
            visitedCount = visitedCount,
            visaFreeCount = visaFreeCount,
            isLoading = false
        )
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = PassportUiState(
            originPassport = DataStoreRepository.AVAILABLE_PASSPORTS.first(),
            countries = DataStoreRepository.DEFAULT_COUNTRIES,
            visitedCount = 0,
            visaFreeCount = 0,
            isLoading = true
        )
    )

    fun selectOriginPassport(passportCode: String) {
        viewModelScope.launch {
            repository.setOriginPassport(passportCode)
        }
    }

    fun toggleVisited(countryId: String) {
        viewModelScope.launch {
            repository.toggleCountryVisited(countryId)
        }
    }

    fun generateShareText(): String {
        val currentState = uiState.value
        val visitedList = currentState.countries
            .filter { it.isVisited }
            .joinToString(" ") { it.flagEmoji }

        return """
            ✈️ Digital Passport Progress 🛂
            Origin Passport: ${currentState.originPassport.flagEmoji} ${currentState.originPassport.countryName}
            Visited Countries (${currentState.visitedCount}/${currentState.countries.size}):
            $visitedList
            
            Tracked with Voyage Plus Travel App! 🌍
        """.trimIndent()
    }
}
