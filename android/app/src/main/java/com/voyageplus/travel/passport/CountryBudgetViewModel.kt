package com.voyageplus.travel.passport

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

data class CountryBudgetUiState(
    val selectedCountry: CountryBudget? = null,
    val selectedDepartureCity: DepartureCity = CountryBudgetRepository.DEPARTURE_CITIES.first(),
    val isBottomSheetVisible: Boolean = false
)

class CountryBudgetViewModel {

    private val _uiState = MutableStateFlow(CountryBudgetUiState())
    val uiState: StateFlow<CountryBudgetUiState> = _uiState.asStateFlow()

    fun openBottomSheet(countryId: String) {
        val budget = CountryBudgetRepository.getBudgetForCountry(countryId)
        _uiState.update {
            it.copy(
                selectedCountry = budget,
                isBottomSheetVisible = true
            )
        }
    }

    fun closeBottomSheet() {
        _uiState.update {
            it.copy(isBottomSheetVisible = false)
        }
    }

    fun setDepartureCity(city: DepartureCity) {
        _uiState.update {
            it.copy(selectedDepartureCity = city)
        }
    }

    fun generateWhatsAppQuoteUri(): String {
        val state = _uiState.value
        val countryName = state.selectedCountry?.name ?: "Selected Country"
        val cityName = state.selectedDepartureCity.name
        val message = "Hello Voyage Tours, I would like to get a customized tour quote for $countryName departing from $cityName."
        val encodedMessage = java.net.URLEncoder.encode(message, "UTF-8")
        return "https://wa.me/971565443990?text=$encodedMessage"
    }
}
