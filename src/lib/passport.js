import { worldPaths } from "../data/worldPaths.js";

// Deterministic pseudo-random number generator from seed string
export function seededRandom(seed) {
  let h = 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return function () {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function visitedCountries(store) {
  if (!store || !Array.isArray(store.trips)) return [];
  const unique = new Set(store.trips.map((t) => t.country).filter(Boolean));
  return Array.from(unique);
}

export function tripsByCountry(store, countryCode) {
  if (!store || !Array.isArray(store.trips) || !countryCode) return [];
  return store.trips.filter((t) => t.country === countryCode);
}

export function addTrip(store, tripData) {
  const currentYear = new Date().getFullYear();

  // Validate start date
  const startYear = parseInt(tripData.start?.y, 10);
  const startMonth = parseInt(tripData.start?.m, 10);

  if (!tripData.country || isNaN(startYear) || startYear > currentYear + 1) {
    throw new Error("Invalid trip start date or country");
  }

  if (tripData.end?.y) {
    const endYear = parseInt(tripData.end.y, 10);
    if (endYear < startYear) {
      throw new Error("End year cannot be before start year");
    }
  }

  const newTrip = {
    id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    country: tripData.country,
    start: { y: startYear, m: isNaN(startMonth) ? 1 : startMonth },
    end: tripData.end ? { y: parseInt(tripData.end.y, 10), m: parseInt(tripData.end.m, 10) || 1 } : null,
    city: tripData.city?.trim() || "",
    note: (tripData.note?.trim() || "").slice(0, 140),
    createdAt: new Date().toISOString(),
  };

  return {
    ...store,
    trips: [newTrip, ...store.trips],
  };
}

export function updateTrip(store, tripId, updatedFields) {
  if (!store || !Array.isArray(store.trips)) return store;
  return {
    ...store,
    trips: store.trips.map((t) => (t.id === tripId ? { ...t, ...updatedFields } : t)),
  };
}

export function removeTrip(store, tripId) {
  if (!store || !Array.isArray(store.trips)) return store;
  return {
    ...store,
    trips: store.trips.filter((t) => t.id !== tripId),
  };
}

export function toggleWishlist(store, countryCode) {
  if (!store || !countryCode) return store;
  const wishlist = Array.isArray(store.wishlist) ? store.wishlist : [];
  const exists = wishlist.includes(countryCode);
  const updated = exists ? wishlist.filter((c) => c !== countryCode) : [...wishlist, countryCode];
  return {
    ...store,
    wishlist: updated,
  };
}

export function stats(store) {
  const visited = visitedCountries(store);
  const totalTrips = store.trips?.length || 0;

  if (totalTrips === 0) {
    return {
      visitedCount: 0,
      totalTrips: 0,
      firstYear: null,
      latestYear: null,
      longestStreak: 0,
      mapPercentage: 0,
    };
  }

  const years = store.trips
    .map((t) => t.start?.y)
    .filter((y) => typeof y === "number" && !isNaN(y))
    .sort((a, b) => a - b);

  const firstYear = years.length > 0 ? years[0] : null;
  const latestYear = years.length > 0 ? years[years.length - 1] : null;

  // Calculate longest streak of consecutive years
  let longestStreak = 0;
  if (years.length > 0) {
    const uniqueYears = Array.from(new Set(years)).sort((a, b) => a - b);
    let currentStreak = 1;
    longestStreak = 1;

    for (let i = 1; i < uniqueYears.length; i++) {
      if (uniqueYears[i] === uniqueYears[i - 1] + 1) {
        currentStreak++;
        if (currentStreak > longestStreak) longestStreak = currentStreak;
      } else {
        currentStreak = 1;
      }
    }
  }

  const mapTotal = worldPaths.length || 177;
  const mapPercentage = Math.round((visited.length / mapTotal) * 100);

  return {
    visitedCount: visited.length,
    totalTrips,
    firstYear,
    latestYear,
    longestStreak,
    mapPercentage,
  };
}

export function serializeStore(store) {
  return JSON.stringify(store, null, 2);
}

export function deserializeStore(jsonString) {
  if (!jsonString || typeof jsonString !== "string") {
    throw new Error("Invalid backup format: Empty input");
  }

  const parsed = JSON.parse(jsonString);
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid backup format: Not an object");
  }

  if (!Array.isArray(parsed.trips)) {
    throw new Error("Invalid backup format: Missing trips array");
  }

  return {
    version: 1,
    traveler: { name: parsed.traveler?.name || "" },
    trips: parsed.trips.filter((t) => t && t.id && t.country && t.start?.y),
    wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
  };
}
