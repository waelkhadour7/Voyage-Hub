import test from "node:test";
import assert from "node:assert/strict";
import {
  addTrip,
  removeTrip,
  toggleWishlist,
  visitedCountries,
  stats,
  deserializeStore,
  seededRandom,
} from "./passport.js";

const mockStore = {
  version: 1,
  traveler: { name: "Test Traveler" },
  trips: [
    {
      id: "t1",
      country: "PH",
      start: { y: 2022, m: 5 },
      city: "Manila",
    },
    {
      id: "t2",
      country: "CN",
      start: { y: 2023, m: 6 },
      city: "Beijing",
    },
    {
      id: "t3",
      country: "PH",
      start: { y: 2024, m: 1 },
      city: "Cebu",
    },
  ],
  wishlist: ["JP", "KR"],
};

test("visitedCountries returns unique list of visited country codes", () => {
  const visited = visitedCountries(mockStore);
  assert.deepEqual(visited, ["PH", "CN"]);
});

test("addTrip appends a valid trip to store", () => {
  const updated = addTrip(mockStore, {
    country: "NP",
    start: { y: 2024, m: 3 },
    city: "Kathmandu",
    note: "Great trek!",
  });

  assert.equal(updated.trips.length, 4);
  assert.equal(updated.trips[0].country, "NP");
  assert.equal(updated.trips[0].city, "Kathmandu");
});

test("addTrip throws error on invalid date or country", () => {
  assert.throws(() => {
    addTrip(mockStore, { country: "", start: { y: 2024, m: 1 } });
  });

  assert.throws(() => {
    addTrip(mockStore, { country: "PH", start: { y: 2050, m: 1 } });
  });
});

test("removeTrip deletes trip by id", () => {
  const updated = removeTrip(mockStore, "t2");
  assert.equal(updated.trips.length, 2);
  assert.equal(updated.trips.find((t) => t.id === "t2"), undefined);
});

test("toggleWishlist toggles presence in wishlist array", () => {
  const added = toggleWishlist(mockStore, "TH");
  assert.ok(added.wishlist.includes("TH"));

  const removed = toggleWishlist(added, "TH");
  assert.ok(!removed.wishlist.includes("TH"));
});

test("stats computes correct counts and streak", () => {
  const res = stats(mockStore);
  assert.equal(res.visitedCount, 2);
  assert.equal(res.totalTrips, 3);
  assert.equal(res.firstYear, 2022);
  assert.equal(res.latestYear, 2024);
  assert.equal(res.longestStreak, 3); // 2022, 2023, 2024
});

test("deserializeStore parses valid JSON and rejects malformed input", () => {
  const validJson = JSON.stringify(mockStore);
  const parsed = deserializeStore(validJson);
  assert.equal(parsed.traveler.name, "Test Traveler");
  assert.equal(parsed.trips.length, 3);

  assert.throws(() => deserializeStore("invalid json"));
  assert.throws(() => deserializeStore(JSON.stringify({ traveler: {} })));
});

test("seededRandom generates deterministic values", () => {
  const rand1 = seededRandom("seed-123");
  const rand2 = seededRandom("seed-123");
  assert.equal(rand1(), rand2());
  assert.equal(rand1(), rand2());
});
