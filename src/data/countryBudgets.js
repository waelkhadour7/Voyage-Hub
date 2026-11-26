export const DEPARTURE_CITIES = [
  { code: "DXB", name: "Dubai", iso: "ae", flag: "🇦🇪" },
  { code: "RUH", name: "Riyadh", iso: "sa", flag: "🇸🇦" },
  { code: "CAI", name: "Cairo", iso: "eg", flag: "🇪🇬" },
];

export const COUNTRY_BUDGETS = {
  Kenya: {
    name: "Kenya",
    iso: "ke",
    flag: "🇰🇪",
    currency: "KES (Kenyan Shilling)",
    budget: { economy: "$60 / day", midrange: "$140 / day", luxury: "$350 / day" },
    startingPrices: { DXB: "$950", RUH: "$1,020", CAI: "$1,150" },
  },
  Egypt: {
    name: "Egypt",
    iso: "eg",
    flag: "🇪🇬",
    currency: "EGP (Egyptian Pound)",
    budget: { economy: "$30 / day", midrange: "$80 / day", luxury: "$200 / day" },
    startingPrices: { DXB: "$650", RUH: "$720", CAI: "$250" },
  },
  Philippines: {
    name: "Philippines",
    iso: "ph",
    flag: "🇵🇭",
    currency: "PHP (Philippine Peso)",
    budget: { economy: "$45 / day", midrange: "$110 / day", luxury: "$280 / day" },
    startingPrices: { DXB: "$850", RUH: "$920", CAI: "$1,050" },
  },
  China: {
    name: "China",
    iso: "cn",
    flag: "🇨🇳",
    currency: "CNY (Chinese Yuan)",
    budget: { economy: "$55 / day", midrange: "$130 / day", luxury: "$320 / day" },
    startingPrices: { DXB: "$900", RUH: "$980", CAI: "$1,100" },
  },
  Nepal: {
    name: "Nepal",
    iso: "np",
    flag: "🇳🇵",
    currency: "NPR (Nepalese Rupee)",
    budget: { economy: "$30 / day", midrange: "$80 / day", luxury: "$200 / day" },
    startingPrices: { DXB: "$700", RUH: "$760", CAI: "$890" },
  },
  Korea: {
    name: "South Korea",
    iso: "kr",
    flag: "🇰🇷",
    currency: "KRW (Korean Won)",
    budget: { economy: "$70 / day", midrange: "$160 / day", luxury: "$380 / day" },
    startingPrices: { DXB: "$1,100", RUH: "$1,180", CAI: "$1,300" },
  },
  Thailand: {
    name: "Thailand",
    iso: "th",
    flag: "🇹🇭",
    currency: "THB (Thai Baht)",
    budget: { economy: "$40 / day", midrange: "$100 / day", luxury: "$250 / day" },
    startingPrices: { DXB: "$750", RUH: "$820", CAI: "$950" },
  },
  Japan: {
    name: "Japan",
    iso: "jp",
    flag: "🇯🇵",
    currency: "JPY (Japanese Yen)",
    budget: { economy: "$75 / day", midrange: "$170 / day", luxury: "$400 / day" },
    startingPrices: { DXB: "$1,200", RUH: "$1,280", CAI: "$1,400" },
  },
  Vietnam: {
    name: "Vietnam",
    iso: "vn",
    flag: "🇻🇳",
    currency: "VND (Vietnamese Dong)",
    budget: { economy: "$35 / day", midrange: "$85 / day", luxury: "$220 / day" },
    startingPrices: { DXB: "$780", RUH: "$850", CAI: "$970" },
  },
  Indonesia: {
    name: "Indonesia",
    iso: "id",
    flag: "🇮🇩",
    currency: "IDR (Indonesian Rupiah)",
    budget: { economy: "$35 / day", midrange: "$90 / day", luxury: "$230 / day" },
    startingPrices: { DXB: "$800", RUH: "$870", CAI: "$990" },
  },
};

export function getCountryBudget(countryName) {
  return COUNTRY_BUDGETS[countryName] || {
    name: countryName,
    iso: "un",
    flag: "🌍",
    currency: "USD",
    budget: { economy: "$50 / day", midrange: "$120 / day", luxury: "$300 / day" },
    startingPrices: { DXB: "$850", RUH: "$920", CAI: "$1,050" },
  };
}
