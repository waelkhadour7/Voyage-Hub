import test from "node:test";
import assert from "node:assert/strict";
import {
  parseDateUTC,
  formatDateUTC,
  getDaysCount,
  validateTrip,
  calculateSchengenStatus,
  calculateMaxStayFromDate,
  generateRollingTimeline,
} from "./schengenCalculator.js";

test("UTC date parsing & formatting consistency", () => {
  const ts = parseDateUTC("2024-02-29"); // Leap year
  assert.equal(formatDateUTC(ts), "2024-02-29");

  const ts2 = parseDateUTC("2024-01-01");
  assert.equal(formatDateUTC(ts2), "2024-01-01");
});

test("getDaysCount inclusive calculation", () => {
  // 2024-01-01 to 2024-01-01 is 1 full day (both entry & exit count)
  assert.equal(getDaysCount("2024-01-01", "2024-01-01"), 1);

  // 2024-01-01 to 2024-01-10 is 10 full days
  assert.equal(getDaysCount("2024-01-01", "2024-01-10"), 10);

  // Leap year 2024-02-01 to 2024-03-01 (Feb has 29 days) -> 29 + 1 = 30 days
  assert.equal(getDaysCount("2024-02-01", "2024-03-01"), 30);
});

test("validateTrip input validation and overlaps", () => {
  const existing = [{ id: "1", entryDate: "2024-05-01", exitDate: "2024-05-15" }];

  // Missing fields
  assert.equal(validateTrip({ entryDate: "" }).valid, false);

  // Exit before entry
  assert.equal(
    validateTrip({ entryDate: "2024-05-10", exitDate: "2024-05-01" }).valid,
    false
  );

  // Overlap with existing
  const overlapRes = validateTrip(
    { entryDate: "2024-05-10", exitDate: "2024-05-20" },
    existing
  );
  assert.equal(overlapRes.valid, false);

  // Valid non-overlapping trip
  const validRes = validateTrip(
    { entryDate: "2024-05-16", exitDate: "2024-05-25" },
    existing
  );
  assert.equal(validRes.valid, true);
});

test("calculateSchengenStatus - 90 consecutive days stay", () => {
  // 90 days stay from 2024-01-01 to 2024-03-30
  const trips = [{ entryDate: "2024-01-01", exitDate: "2024-03-30" }];

  const status = calculateSchengenStatus(trips, "2024-03-30");
  assert.equal(status.daysUsed, 90);
  assert.equal(status.daysRemaining, 0);
  assert.equal(status.isOverstay, false);
  assert.equal(status.statusLevel, "warning");
});

test("calculateSchengenStatus - Overstay detection", () => {
  // 95 days stay from 2024-01-01 to 2024-04-04
  const trips = [{ entryDate: "2024-01-01", exitDate: "2024-04-04" }];

  const status = calculateSchengenStatus(trips, "2024-04-04");
  assert.equal(status.daysUsed, 95);
  assert.equal(status.daysRemaining, 0);
  assert.equal(status.isOverstay, true);
  assert.equal(status.overstayAmount, 5);
  assert.equal(status.statusLevel, "overstay");
});

test("calculateMaxStayFromDate - Planning mode & day recovery", () => {
  // Trip 1: 90 days stay from 2024-01-01 to 2024-03-30
  const trips = [{ entryDate: "2024-01-01", exitDate: "2024-03-30" }];

  // Planning entry on 2024-04-01 (no days recovered yet)
  const planImmediate = calculateMaxStayFromDate(trips, "2024-04-01");
  assert.equal(planImmediate.maxConsecutiveDays, 0);

  // Planning entry on 2024-06-29 (180 days after 2024-01-01: 1st day recovers)
  const planRecovery = calculateMaxStayFromDate(trips, "2024-06-29");
  assert.ok(planRecovery.maxConsecutiveDays > 0);

  // Planning entry after 180 full days away (2024-07-01): Full 90 days allowed
  const planFull = calculateMaxStayFromDate(trips, "2024-07-01");
  assert.equal(planFull.maxConsecutiveDays, 90);
  assert.equal(planFull.isFullStayAllowed, true);
});

test("generateRollingTimeline creates 180-day window entries", () => {
  const trips = [{ entryDate: "2024-01-01", exitDate: "2024-01-10" }];
  const timeline = generateRollingTimeline(trips, "2024-01-01", 30);

  assert.equal(timeline.length, 30);
  assert.equal(timeline[0].inSchengen, true);
  assert.equal(timeline[9].inSchengen, true);
  assert.equal(timeline[10].inSchengen, false);
});
