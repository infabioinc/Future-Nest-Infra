"use client";
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const locations = [
  {
    id: "lothal",
    name: "Lothal NMHC Proximity",
    coords: [22.525, 72.247],
    zoom: 11,
    stats: "Distance: 20 Mins",
    description: "Home to the National Maritime Heritage Complex (NMHC), driving tourism, research, and high-value cultural zoning nearby."
  },
  {
    id: "expressway",
    name: "Ahmedabad-Dholera Expressway",
    coords: [22.450, 72.260],
    zoom: 10,
    stats: "Distance: Adjacent",
    description: "109 km access-controlled 4-lane high-speed corridor (expandable to 8 lanes) reducing travel time between Ahmedabad and Dholera to under 1 hour."
  },
  {
    id: "airport",
    name: "Dholera International Airport",
    coords: [22.361, 72.188],
    zoom: 11,
    stats: "Distance: 15 Mins",
    description: "Upcoming greenfield international airport cargo-hub spanning 1426 hectares, driving global connectivity."
  },
  {
    id: "activation",
    name: "Activation Area (TP2 & TP4)",
    coords: [22.241, 72.195],
    zoom: 12,
    stats: "Distance: Primary Zone",
    description: "First phase activation zone of 22.5 Sq. Km. featuring plug-and-play industrial plots, smart utilities, and active multi-nationals."
  }
];

export default function MapSection() {
  const [activeLoc, setActiveLoc] = useState(locations[0]);
  const [mapStyle, setMapStyle] = useState("streets"); // streets or satellite
  const [coords, setCoords] = useState({ lat: 22.250, lng: 72.200 });
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef({});
  const activePolylineRef = useRef(null);
  const LRef = useRef(null);

  // Load Leaflet dynamically on mount
  useEffect(() => {
    let map = null;
    const initMap = async () => {
      const L = (await import("leaflet")).default;
      LRef.current = L;

      // Custom pulsing marker icon
      const customIcon = L.divIcon({
        className: "leaflet-custom-marker-container",
        html: '<div class="leaflet-custom-marker"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      // Create map instance
      map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true
      }).setView([22.250, 72.200], 10);
      mapInstanceRef.current = map;

      // Add base layer
      const baseTile = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20
      }).addTo(map);
      tileLayerRef.current = baseTile;

      // Draw faint dotted full route line
      const fullRouteCoords = locations.map(loc => loc.coords);
      L.polyline(fullRouteCoords, {
        color: "var(--accent-orange)",
        weight: 2,
        dashArray: "5, 8",
        opacity: 0.25
      }).addTo(map);

      // Draw solid active route line
      const activeIdx = locations.findIndex(loc => loc.id === activeLoc.id);
      const activeCoords = locations.slice(0, activeIdx + 1).map(loc => loc.coords);
      // Polyline needs at least two points to draw cleanly, if single, connect to itself
      const initialCoords = activeCoords.length === 1 ? [activeCoords[0], activeCoords[0]] : activeCoords;
      const activePolyline = L.polyline(initialCoords, {
        color: "var(--accent-orange)",
        weight: 3.5,
        opacity: 0.85
      }).addTo(map);
      activePolylineRef.current = activePolyline;

      // Add markers
      locations.forEach(loc => {
        const marker = L.marker(loc.coords, { icon: customIcon })
          .addTo(map)
          .bindPopup(`<strong>${loc.name}</strong><br/>${loc.stats}`);

        marker.on("click", () => {
          setActiveLoc(loc);
        });

        markersRef.current[loc.id] = marker;
      });

      // Mousemove event for coordinates
      map.on("mousemove", (e) => {
        setCoords({
          lat: parseFloat(e.latlng.lat.toFixed(3)),
          lng: parseFloat(e.latlng.lng.toFixed(3))
        });
      });

      // Set active marker style and open popup
      setTimeout(() => {
        const activeMarker = markersRef.current[activeLoc.id];
        if (activeMarker) {
          const el = activeMarker.getElement();
          if (el) {
            const inner = el.querySelector(".leaflet-custom-marker");
            if (inner) inner.classList.add("active");
            activeMarker.openPopup();
          }
        }
      }, 300);

      setLeafletLoaded(true);
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // Update map layer on mapStyle state change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = LRef.current;
    if (!map || !L) return;

    // Remove old tile layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let newTile;
    if (mapStyle === "satellite") {
      newTile = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      });
    } else {
      newTile = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20
      });
    }

    newTile.addTo(map);
    tileLayerRef.current = newTile;
  }, [mapStyle]);

  // Update active marker class, active route line, and map pan/zoom when activeLoc changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = LRef.current;
    if (!map || !L || !leafletLoaded) return;

    // Pan map to new active location
    map.flyTo(activeLoc.coords, activeLoc.zoom);

    // Update active marker active class in DOM
    locations.forEach(loc => {
      const marker = markersRef.current[loc.id];
      if (marker) {
        const el = marker.getElement();
        if (el) {
          const inner = el.querySelector(".leaflet-custom-marker");
          if (inner) {
            if (loc.id === activeLoc.id) {
              inner.classList.add("active");
              marker.openPopup();
            } else {
              inner.classList.remove("active");
            }
          }
        }
      }
    });

    // Update active polyline coordinates
    if (activePolylineRef.current) {
      const activeIdx = locations.findIndex(loc => loc.id === activeLoc.id);
      const activeCoords = locations.slice(0, activeIdx + 1).map(loc => loc.coords);
      if (activeCoords.length === 1) {
        activePolylineRef.current.setLatLngs([activeCoords[0], activeCoords[0]]);
      } else {
        activePolylineRef.current.setLatLngs(activeCoords);
      }
    }
  }, [activeLoc, leafletLoaded]);

  return (
    <section id="map-ecosystem" className="section-padding" style={{ backgroundColor: "transparent" }}>
      <div className="container">
        <div style={{ marginBottom: "64px", maxWidth: "800px" }}>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-orange)", fontWeight: "600", display: "block", marginBottom: "12px" }}>
            Ecosystem Map
          </span>
          <h2 style={{ marginBottom: "20px" }}>The Infrastructure Backbone</h2>
          <p>Dholera is engineered as a master-planned smart city. Interact with the map and explore key infrastructure projects shaping the future appreciation of this region.</p>
        </div>

        <div className="grid-12" style={{ alignItems: "center" }}>
          {/* Map Area */}
          <div className="col-8">
            <div className="map-container">
              <div className="map-wrapper">
                <div ref={mapContainerRef} id="interactive-map" />
                
                {/* SITE SATELLITE RADAR overlay */}
                <div className="map-overlay-card">
                  <div className="card-title">SITE SATELLITE RADAR</div>
                  <div className="coords">LAT: {coords.lat} &nbsp; LNG: {coords.lng}</div>
                  <div className="map-layer-selector">
                    <button 
                      className={`btn-layer ${mapStyle === "streets" ? "active" : ""}`}
                      onClick={() => setMapStyle("streets")}
                    >
                      STREETS
                    </button>
                    <button 
                      className={`btn-layer ${mapStyle === "satellite" ? "active" : ""}`}
                      onClick={() => setMapStyle("satellite")}
                    >
                      SATELLITE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reactive Locations List */}
          <div className="col-4">
            <div className="nodes-list">
              {locations.map((loc) => {
                const isActive = activeLoc.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    className={`node-item ${isActive ? "active" : ""}`}
                    onClick={() => setActiveLoc(loc)}
                    onMouseEnter={() => setActiveLoc(loc)}
                  >
                    <div className="node-header">
                      <div className="node-indicator" />
                      <span className="node-name">{loc.name}</span>
                      <span className="node-dist">{loc.stats.replace("Distance: ", "")}</span>
                    </div>
                    <div className="node-details">
                      <p>{loc.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
