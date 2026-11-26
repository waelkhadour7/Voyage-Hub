package com.voyageplus.travel.passport

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

data class PassportConfig(
    val code: String,
    val countryName: String,
    val flagEmoji: String
)

data class Country(
    val id: String,
    val name: String,
    val flagEmoji: String,
    val continent: String,
    val isVisaFree: Boolean,
    val isVisited: Boolean = false
)

data class PassportUiState(
    val originPassport: PassportConfig,
    val countries: List<Country>,
    val visitedCount: Int = 0,
    val visaFreeCount: Int = 0,
    val isLoading: Boolean = false
)

interface PassportRepository {
    fun getVisitedCountries(): Flow<Set<String>>
    fun getOriginPassportCode(): Flow<String>
    suspend fun toggleCountryVisited(countryId: String)
    suspend fun setOriginPassport(passportCode: String)
}

/**
 * Local DataStore / SharedPreferences Repository for Digital Passport offline persistence.
 */
class DataStoreRepository(context: Context) : PassportRepository {

    private val prefs: SharedPreferences =
        context.getSharedPreferences("digital_passport_prefs", Context.MODE_PRIVATE)

    private val _visitedCountriesFlow = MutableStateFlow(loadVisitedCountries())
    private val _originPassportFlow = MutableStateFlow(loadOriginPassportCode())

    companion object {
        private const val KEY_VISITED_COUNTRIES = "visited_country_ids"
        private const val KEY_ORIGIN_PASSPORT = "origin_passport_code"

        val AVAILABLE_PASSPORTS = listOf(
            PassportConfig("UAE", "United Arab Emirates", "🇦🇪"),
            PassportConfig("KSA", "Saudi Arabia", "🇸🇦"),
            PassportConfig("EGY", "Egypt", "🇪🇬"),
            PassportConfig("QAT", "Qatar", "🇶🇦"),
            PassportConfig("KWT", "Kuwait", "🇰🇼"),
            PassportConfig("OMN", "Oman", "🇴🇲"),
            PassportConfig("BHR", "Bahrain", "🇧🇭"),
            PassportConfig("JOR", "Jordan", "🇯🇴")
        )

        val DEFAULT_COUNTRIES = listOf(
            Country("philippines", "Philippines", "🇵🇭", "Asia", isVisaFree = true),
            Country("china", "China", "🇨🇳", "Asia", isVisaFree = false),
            Country("japan", "Japan", "🇯🇵", "Asia", isVisaFree = true),
            Country("thailand", "Thailand", "🇹🇭", "Asia", isVisaFree = true),
            Country("korea", "South Korea", "🇰🇷", "Asia", isVisaFree = true),
            Country("indonesia", "Indonesia", "🇮🇩", "Asia", isVisaFree = true),
            Country("vietnam", "Vietnam", "🇻🇳", "Asia", isVisaFree = true),
            Country("nepal", "Nepal", "🇳🇵", "Asia", isVisaFree = true),
            Country("uk", "United Kingdom", "🇬🇧", "Europe", isVisaFree = true),
            Country("france", "France", "🇫🇷", "Europe", isVisaFree = true),
            Country("italy", "Italy", "🇮🇹", "Europe", isVisaFree = true),
            Country("turkey", "Turkey", "🇹🇷", "Europe/Asia", isVisaFree = true)
        )
    }

    private fun loadVisitedCountries(): Set<String> {
        return prefs.getStringSet(KEY_VISITED_COUNTRIES, emptySet()) ?: emptySet()
    }

    private fun loadOriginPassportCode(): String {
        return prefs.getString(KEY_ORIGIN_PASSPORT, "UAE") ?: "UAE"
    }

    override fun getVisitedCountries(): Flow<Set<String>> = _visitedCountriesFlow.asStateFlow()

    override fun getOriginPassportCode(): Flow<String> = _originPassportFlow.asStateFlow()

    override suspend fun toggleCountryVisited(countryId: String) {
        val currentSet = _visitedCountriesFlow.value.toMutableSet()
        if (currentSet.contains(countryId)) {
            currentSet.remove(countryId)
        } else {
            currentSet.add(countryId)
        }
        prefs.edit().putStringSet(KEY_VISITED_COUNTRIES, currentSet).apply()
        _visitedCountriesFlow.value = currentSet
    }

    override suspend fun setOriginPassport(passportCode: String) {
        prefs.edit().putString(KEY_ORIGIN_PASSPORT, passportCode).apply()
        _originPassportFlow.value = passportCode
    }
}
