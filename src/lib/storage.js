const STORAGE_KEY = "voyage.passport.v1";

export const DEFAULT_STORE = {
  version: 1,
  traveler: { name: "" },
  trips: [],
  wishlist: [],
};

export function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORE;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return DEFAULT_STORE;

    // Migration logic if version changes in the future
    if (parsed.version !== 1) {
      return migrateStore(parsed);
    }

    return {
      version: 1,
      traveler: { name: parsed.traveler?.name || "" },
      trips: Array.isArray(parsed.trips) ? parsed.trips : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
    };
  } catch (err) {
    console.warn("Corrupted passport store recovered:", err);
    return DEFAULT_STORE;
  }
}

export function saveStore(store) {
  try {
    const dataToSave = {
      version: 1,
      traveler: { name: store.traveler?.name || "" },
      trips: Array.isArray(store.trips) ? store.trips : [],
      wishlist: Array.isArray(store.wishlist) ? store.wishlist : [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    return true;
  } catch (err) {
    console.error("Failed to save passport store (quota or disabled):", err);
    return false;
  }
}

function migrateStore(oldData) {
  return {
    version: 1,
    traveler: { name: oldData.traveler?.name || "" },
    trips: Array.isArray(oldData.trips) ? oldData.trips : [],
    wishlist: Array.isArray(oldData.wishlist) ? oldData.wishlist : [],
  };
}
