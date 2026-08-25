export const species = [
  "All species",
  "Blue-footed booby",
  "Red-footed booby",
  "Brown booby",
  "Masked booby",
  "Nazca booby",
  "Peruvian booby"
];

export const sightings = [
  {
    id: "galapagos-blue-footed",
    title: "Galápagos",
    place: "North Seymour Island, Ecuador",
    species: "Blue-footed booby",
    scientificName: "Sula nebouxii",
    observedOn: "24 August 2026",
    note: "A small courtship group gathered just above the tide line.",
    coordinates: [-90.286, -0.396],
    image: "https://boobs.pictures/assets/blue-footed-booby-hero.png"
  },
  {
    id: "christmas-red-footed",
    title: "Christmas Island",
    place: "Indian Ocean, Australia",
    species: "Red-footed booby",
    scientificName: "Sula sula",
    observedOn: "18 August 2026",
    note: "Seen returning to the forest canopy in the late afternoon.",
    coordinates: [105.62, -10.49]
  },
  {
    id: "ascension-masked",
    title: "Ascension Island",
    place: "South Atlantic Ocean",
    species: "Masked booby",
    scientificName: "Sula dactylatra",
    observedOn: "03 August 2026",
    note: "Two adults resting on volcanic rock near the colony edge.",
    coordinates: [-14.36, -7.95]
  },
  {
    id: "hawaii-brown",
    title: "Moku Manu",
    place: "Oʻahu, Hawaiʻi",
    species: "Brown booby",
    scientificName: "Sula leucogaster",
    observedOn: "29 July 2026",
    note: "A clean diving pass just beyond the offshore islet.",
    coordinates: [-157.72, 21.47]
  },
  {
    id: "malpelo-nazca",
    title: "Malpelo Island",
    place: "Colombian Pacific",
    species: "Nazca booby",
    scientificName: "Sula granti",
    observedOn: "11 July 2026",
    note: "A nesting pair observed from a respectful distance.",
    coordinates: [-81.61, 4.0]
  },
  {
    id: "paracas-peruvian",
    title: "Paracas",
    place: "Ica, Peru",
    species: "Peruvian booby",
    scientificName: "Sula variegata",
    observedOn: "26 June 2026",
    note: "A feeding flock moving north along the reserve coastline.",
    coordinates: [-76.25, -13.83]
  }
];

export function sightingsToGeoJSON(items) {
  return {
    type: "FeatureCollection",
    features: items.map((sighting) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: sighting.coordinates
      },
      properties: {
        id: sighting.id,
        species: sighting.species,
        title: sighting.title
      }
    }))
  };
}
