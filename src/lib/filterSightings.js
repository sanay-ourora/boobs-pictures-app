export function filterSightings(sightings, selectedSpecies) {
  if (selectedSpecies === "All species") return sightings;
  return sightings.filter((sighting) => sighting.species === selectedSpecies);
}
