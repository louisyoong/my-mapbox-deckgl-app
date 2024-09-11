import React, { useRef, useEffect } from "react";
import { Map } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { getTooltip } from "../helper/tooltopHelper";
import { useRouter } from "next/router";

const INITIAL_VIEW_STATE = {
  latitude: 39.1,
  longitude: -94.57,
  zoom: 4,
  maxZoom: 10,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE = "mapbox://styles/mapbox/dark-v10";

const DATA_INDEX = {
  UNIQUE_ID: 0,
  SPECIES: 1,
  LONGITUDE: 5,
  LATITUDE: 6,
};

const observationData = [
  // Turtles (Green)
  {
    [DATA_INDEX.UNIQUE_ID]: 1,
    [DATA_INDEX.SPECIES]: "turtle",
    [DATA_INDEX.LONGITUDE]: -74.57,
    [DATA_INDEX.LATITUDE]: 17.1,
  },
  {
    [DATA_INDEX.UNIQUE_ID]: 2,
    [DATA_INDEX.SPECIES]: "turtle",
    [DATA_INDEX.LONGITUDE]: -90.6,
    [DATA_INDEX.LATITUDE]: 25.11,
  },
  {
    [DATA_INDEX.UNIQUE_ID]: 3,
    [DATA_INDEX.SPECIES]: "turtle",
    [DATA_INDEX.LONGITUDE]: -96.58,
    [DATA_INDEX.LATITUDE]: 24.09,
  },
  // Dolphins (Blue)
  {
    [DATA_INDEX.UNIQUE_ID]: 4,
    [DATA_INDEX.SPECIES]: "dolphin",
    [DATA_INDEX.LONGITUDE]: -92.59,
    [DATA_INDEX.LATITUDE]: 29.12,
  },
  {
    [DATA_INDEX.UNIQUE_ID]: 5,
    [DATA_INDEX.SPECIES]: "dolphin",
    [DATA_INDEX.LONGITUDE]: -72.55,
    [DATA_INDEX.LATITUDE]: 22.1,
  },
  {
    [DATA_INDEX.UNIQUE_ID]: 6,
    [DATA_INDEX.SPECIES]: "dolphin",
    [DATA_INDEX.LONGITUDE]: -82.01,
    [DATA_INDEX.LATITUDE]: 26.13,
  },
  {
    [DATA_INDEX.UNIQUE_ID]: 7,
    [DATA_INDEX.SPECIES]: "dolphin",
    [DATA_INDEX.LONGITUDE]: -81.57,
    [DATA_INDEX.LATITUDE]: 24.14,
  },
  {
    [DATA_INDEX.UNIQUE_ID]: 8,
    [DATA_INDEX.SPECIES]: "dolphin",
    [DATA_INDEX.LONGITUDE]: -90.58,
    [DATA_INDEX.LATITUDE]: 26.13,
  },
  // // Whales (Purple)
  {
    [DATA_INDEX.UNIQUE_ID]: 9,
    [DATA_INDEX.SPECIES]: "whale",
    [DATA_INDEX.LONGITUDE]: -90.14,
    [DATA_INDEX.LATITUDE]: 23.15,
  },
  {
    [DATA_INDEX.UNIQUE_ID]: 10,
    [DATA_INDEX.SPECIES]: "whale",
    [DATA_INDEX.LONGITUDE]: -74.53,
    [DATA_INDEX.LATITUDE]: 29.14,
  },
];

const speciesColorMapping = {
  turtle: [0, 255, 0], // Green
  dolphin: [0, 0, 255], // Blue
  whale: [128, 0, 128], // Purple
};

const ScenegraphMap = ({ sizeScale = 25, mapStyle = MAP_STYLE }) => {
  const deckRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  useEffect(() => {
    window.deckgl = deckRef.current;
  }, []);

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoibG91aXN5b29uZyIsImEiOiJjbHJ1MTdzNGwwNXU4MmlvM2x4d2gzd2dnIn0.Kuz52xD-JDk8XzFlmYPLfw"; // Replace with your Mapbox token

  const layer =
    observationData &&
    new ScatterplotLayer({
      id: "scatterplot-layer",
      data: observationData,
      pickable: true,
      radiusScale: sizeScale,
      radiusMinPixels: 5,
      radiusMaxPixels: 20,
      getPosition: (d) => [d[DATA_INDEX.LONGITUDE], d[DATA_INDEX.LATITUDE]],
      getFillColor: (d) => speciesColorMapping[d[DATA_INDEX.SPECIES]],
      getRadius: (d) => 100,
    });

  return (
    <DeckGL
      ref={deckRef}
      layers={[layer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
      data-testid="cy-observation"
    >
      <Map reuseMaps mapboxAccessToken={MAPBOX_TOKEN} mapStyle={mapStyle} />

      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-gray-700 hover:bg-gray-500 text-white text-sm p-2 rounded"
      >
        Logout
      </button>
    </DeckGL>
  );
};

export default ScenegraphMap;
