import { useEffect, useMemo, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { SpeciesFilter } from "./components/SpeciesFilter.jsx";
import { SightingPanel } from "./components/SightingPanel.jsx";
import { SubmissionNotice } from "./components/SubmissionNotice.jsx";
import { species, sightings } from "./data/sightings.js";
import { filterSightings } from "./lib/filterSightings.js";

const MAP_STYLE = {
  version: 8,
  sources: {
    basemap: {
      type: "raster",
      tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO"
    }
  },
  layers: [
    { id: "ocean", type: "background", paint: { "background-color": "#dce9e7" } },
    {
      id: "basemap",
      type: "raster",
      source: "basemap",
      paint: {
        "raster-opacity": 0.96,
        "raster-saturation": -0.34,
        "raster-contrast": 0.08
      }
    }
  ]
};

export function App() {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);
  const [selectedSpecies, setSelectedSpecies] = useState("All species");
  const [selectedSighting, setSelectedSighting] = useState(() =>
    window.matchMedia("(min-width: 601px)").matches ? sightings[0] : null
  );
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const filteredSightings = useMemo(
    () => filterSightings(sightings, selectedSpecies),
    [selectedSpecies]
  );

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return undefined;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [-20, 4],
      zoom: 1.35,
      minZoom: 1.1,
      maxZoom: 12,
      attributionControl: false
    });

    mapInstance.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-left");
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    return () => {
      map.remove();
      mapInstance.current = null;
      markers.current = [];
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (map) {
      markers.current.forEach((marker) => marker.remove());
      markers.current = filteredSightings.map((sighting) => {
        const markerElement = document.createElement("button");
        markerElement.type = "button";
        markerElement.className = "sighting-marker";
        markerElement.setAttribute("aria-label", `Open ${sighting.species} sighting at ${sighting.title}`);
        const signal = document.createElement("span");
        signal.className = "sighting-marker__signal";
        signal.setAttribute("aria-hidden", "true");
        markerElement.append(signal);
        markerElement.addEventListener("click", () => {
          setSelectedSighting(sighting);
          map.easeTo({
            center: sighting.coordinates,
            zoom: Math.max(map.getZoom(), 4.25),
            offset: window.innerWidth > 900 ? [-180, 0] : [0, -90],
            duration: 900
          });
        });
        return new maplibregl.Marker({ element: markerElement })
          .setLngLat(sighting.coordinates)
          .addTo(map);
      });
    }
    if (selectedSighting && !filteredSightings.some((item) => item.id === selectedSighting.id)) {
      setSelectedSighting(filteredSightings[0] ?? null);
    }
  }, [filteredSightings, selectedSighting]);

  return (
    <main className="app-shell">
      <div className="map-canvas" ref={mapContainer} aria-label="World map of booby sightings" />
      <div className="ocean-shade" aria-hidden="true" />

      <header className="app-header">
        <a className="brand" href="https://boobs.pictures" aria-label="Boobs Pictures home">
          <img
            src="/logo.svg"
            alt="Boobs Pictures"
          />
          <span>Field map</span>
        </a>
        <div className="header-actions">
          <span className="prototype-status"><i /> Prototype records</span>
          <button className="primary-action" type="button" onClick={() => setSubmissionOpen(true)}>
            <span>Add sighting</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </header>

      <div className="map-intro">
        <p className="eyebrow">Community field atlas</p>
        <h1>Six species.<br />One blue planet.</h1>
        <p className="intro-copy">
          Explore prototype sightings while we prepare community submissions.
        </p>
      </div>

      <div className="map-toolbar">
        <SpeciesFilter
          options={species}
          selected={selectedSpecies}
          onChange={setSelectedSpecies}
        />
        <span className="record-count">
          {String(filteredSightings.length).padStart(2, "0")} records
        </span>
      </div>

      <SightingPanel sighting={selectedSighting} onClose={() => setSelectedSighting(null)} />
      <SubmissionNotice open={submissionOpen} onClose={() => setSubmissionOpen(false)} />
    </main>
  );
}
