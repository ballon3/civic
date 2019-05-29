/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { HeatMap, DemoJSONLoader } from "../src";

const heatmapComponent = data => {
  if (data === null) {
    return null;
  }

  const dataProperty = "new_units";
  const dataMin = 0;
  const dataMax = 2;

  const maxZoom = 19;

  const startZoomTransition = 11;
  const endZoomTransition = 15;

  const heatZoomFadeStart = 14;
  const heatZoomFadeOut = 15;
  const circleZoomFadeEnd = 15;
  const circleZoomFadeIn = 14;

  const heatMapWeight = [
    "interpolate",
    ["linear"],
    ["get", dataProperty],
    dataMin,
    0,
    dataMax,
    1
  ];

  const heatMapIntensity = [
    "interpolate",
    ["linear"],
    ["zoom"],
    startZoomTransition,
    1,
    endZoomTransition,
    2
  ];

  const colorOptions = {
    Plasma: [
      0,
      "rgba(0,0,0,0)",
      0.2,
      "#6a00a8",
      0.4,
      "#b12a90",
      0.6,
      "#e16462",
      0.8,
      "#fca636",
      1,
      "#f0f921"
    ],
    Viridis: [
      0,
      "rgba(0,0,0,0)",
      0.2,
      "#414487",
      0.4,
      "#2a788e",
      0.6,
      "#22a884",
      0.8,
      "#7ad151",
      1,
      "#fde725"
    ],
    Inferno: [
      0,
      "rgba(0,0,0,0)",
      0.2,
      "#420a68",
      0.4,
      "#932667",
      0.6,
      "#dd513a",
      0.8,
      "#fca50a",
      1,
      "#fcffa4"
    ],
    Magma: [
      0,
      "rgba(0,0,0,0)",
      0.2,
      "#3b0f70",
      0.4,
      "#8c2981",
      0.6,
      "#de4968",
      0.8,
      "#fe9f6d",
      1,
      "#fcfdbf"
    ],
    Warm: [
      0,
      "rgba(0,0,0,0)",
      0.2,
      "rgb(191, 60, 175)",
      0.4,
      "rgb(254, 75, 131)",
      0.6,
      "rgb(255, 120, 71)",
      0.8,
      "rgb(226, 183, 47)",
      1,
      "rgb(175, 240, 91)"
    ],
    Cool: [
      0,
      "rgba(0,0,0,0)",
      0.2,
      "rgb(76, 110, 219)",
      0.4,
      "rgb(35, 171, 216)",
      0.6,
      "rgb(29, 223, 163)",
      0.8,
      "rgb(82, 246, 103)",
      1,
      "rgb(175, 240, 91)"
    ]
  };
  const colorScale = select("Heat Color", colorOptions, colorOptions.Plasma);

  const heatMapColorScale = [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    ...colorScale
  ];

  const heatMapRadius = [
    "interpolate",
    ["linear"],
    ["zoom"],
    startZoomTransition,
    15,
    endZoomTransition,
    20
  ];

  const heatMapOpacity = [
    "interpolate",
    ["linear"],
    ["zoom"],
    heatZoomFadeStart,
    1,
    heatZoomFadeOut,
    0
  ];

  const circleRadius = [
    "interpolate",
    ["linear"],
    ["zoom"],
    circleZoomFadeEnd,
    ["interpolate", ["linear"], ["get", dataProperty], dataMin, 1, dataMax, 10],
    maxZoom,
    ["interpolate", ["linear"], ["get", dataProperty], dataMin, 11, dataMax, 20]
  ];

  const circleOpacity = [
    "interpolate",
    ["linear"],
    ["zoom"],
    circleZoomFadeIn,
    0,
    circleZoomFadeEnd,
    1
  ];

  const circleFillColor = colorScale[11];

  const circleStrokeColor = colorScale[5];

  const circleStrokeWidth = 1.5;

  const circleStrokeOpacity = [
    "interpolate",
    ["linear"],
    ["zoom"],
    circleZoomFadeIn,
    0,
    circleZoomFadeEnd,
    1
  ];

  return (
    <HeatMap
      id="building-permits"
      centerLatitude={45.5597}
      centerLongitude={-122.7066}
      initialZoom={9.75}
      maxZoom={maxZoom}
      mapStyle="mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg"
      data={data.results}
      heatMapWeight={heatMapWeight}
      heatMapIntensity={heatMapIntensity}
      heatMapColorScale={heatMapColorScale}
      heatMapRadius={heatMapRadius}
      heatMapOpacity={heatMapOpacity}
      circleRadius={circleRadius}
      circleOpacity={circleOpacity}
      circleFillColor={circleFillColor}
      circleStrokeColor={circleStrokeColor}
      circleStrokeWidth={circleStrokeWidth}
      circleStrokeOpacity={circleStrokeOpacity}
    />
  );
};

export default () =>
  storiesOf("Component Lib|Maps/Heat Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add("Simple usage", () => {
      const url =
        "https://service.civicpdx.org/housing-affordability/api/permits/" +
        "?new_type=Apartments/Condos,Duplex,Rowhouse,Townhouse&new_class=New+Construction&is_adu=false" +
        "&format=json&limit=3000&year=2015";
      return (
        <DemoJSONLoader urls={[url]}>
          {data => heatmapComponent(data)}
        </DemoJSONLoader>
      );
    });
