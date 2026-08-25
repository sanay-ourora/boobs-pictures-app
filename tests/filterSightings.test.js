import assert from "node:assert/strict";
import test from "node:test";
import { filterSightings } from "../src/lib/filterSightings.js";

const records = [
  { id: "one", species: "Blue-footed booby" },
  { id: "two", species: "Masked booby" }
];

test("returns all sightings for the default filter", () => {
  assert.deepEqual(filterSightings(records, "All species"), records);
});

test("returns only the selected species", () => {
  assert.deepEqual(filterSightings(records, "Masked booby"), [records[1]]);
});
