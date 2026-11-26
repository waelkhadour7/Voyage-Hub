package com.voyageplus.travel.passport

data class BudgetBreakdown(
    val economyDaily: String,
    val midrangeDaily: String,
    val luxuryDaily: String
)

data class CountryBudget(
    val id: String,
    val name: String,
    val flag: String,
    val currency: String,
    val budget: BudgetBreakdown,
    val baseStartingPrice: Map<String, String> // Departure City code -> Price
)

data class DepartureCity(
    val code: String,
    val name: String,
    val flag: String
)

object CountryBudgetRepository {
    val DEPARTURE_CITIES = listOf(
        DepartureCity("DXB", "Dubai", "🇦🇪"),
        DepartureCity("RUH", "Riyadh", "🇸🇦"),
        DepartureCity("CAI", "Cairo", "🇪🇬")
    )

    private val budgets = mapOf(
        "philippines" to CountryBudget(
            id = "philippines",
            name = "Philippines",
            flag = "🇵🇭",
            currency = "PHP (Philippine Peso)",
            budget = BudgetBreakdown("$45 / day", "$110 / day", "$280 / day"),
            baseStartingPrice = mapOf("DXB" to "$850", "RUH" to "$920", "CAI" to "$1,050")
        ),
        "china" to CountryBudget(
            id = "china",
            name = "China",
            flag = "🇨🇳",
            currency = "CNY (Chinese Yuan)",
            budget = BudgetBreakdown("$55 / day", "$130 / day", "$320 / day"),
            baseStartingPrice = mapOf("DXB" to "$900", "RUH" to "$980", "CAI" to "$1,100")
        ),
        "japan" to CountryBudget(
            id = "japan",
            name = "Japan",
            flag = "🇯🇵",
            currency = "JPY (Japanese Yen)",
            budget = BudgetBreakdown("$75 / day", "$170 / day", "$400 / day"),
            baseStartingPrice = mapOf("DXB" to "$1,200", "RUH" to "$1,280", "CAI" to "$1,400")
        ),
        "thailand" to CountryBudget(
            id = "thailand",
            name = "Thailand",
            flag = "🇹🇭",
            currency = "THB (Thai Baht)",
            budget = BudgetBreakdown("$40 / day", "$100 / day", "$250 / day"),
            baseStartingPrice = mapOf("DXB" to "$750", "RUH" to "$820", "CAI" to "$950")
        ),
        "korea" to CountryBudget(
            id = "korea",
            name = "South Korea",
            flag = "🇰🇷",
            currency = "KRW (South Korean Won)",
            budget = BudgetBreakdown("$70 / day", "$160 / day", "$380 / day"),
            baseStartingPrice = mapOf("DXB" to "$1,100", "RUH" to "$1,180", "CAI" to "$1,300")
        ),
        "indonesia" to CountryBudget(
            id = "indonesia",
            name = "Indonesia",
            flag = "🇮🇩",
            currency = "IDR (Indonesian Rupiah)",
            budget = BudgetBreakdown("$35 / day", "$90 / day", "$230 / day"),
            baseStartingPrice = mapOf("DXB" to "$800", "RUH" to "$870", "CAI" to "$990")
        )
    )

    fun getBudgetForCountry(countryId: String): CountryBudget {
        return budgets[countryId] ?: CountryBudget(
            id = countryId,
            name = countryId.replaceFirstChar { it.uppercase() },
            flag = "🌍",
            currency = "USD",
            budget = BudgetBreakdown("$50 / day", "$120 / day", "$300 / day"),
            baseStartingPrice = mapOf("DXB" to "$850", "RUH" to "$920", "CAI" to "$1,050")
        )
    }
}
