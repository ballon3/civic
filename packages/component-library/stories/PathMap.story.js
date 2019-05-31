import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { withKnobs, number, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { scaleThreshold } from "d3";
import { BaseMap, PathMap, MapTooltip, DemoJSONLoader } from "../src";
import notes from "./PathMap.notes.md";

const baseMapStyle = "mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg";

const colorSchemeOptions = {
  "Red Yellow Blue":
    "[[165,0,38,255],[215,48,39,255],[244,109,67,255],[253,174,97,255],[254,224,144,255],[224,243,248,255],[171,217,233,255],[116,173,209,255],[69,117,180,255],[49,54,149,255]]",
  "Purple Green":
    "[[64,0,75,255],[118,42,131,255],[153,112,171,255],[194,165,207,255],[231,212,232,255],[217,240,211,255],[166,219,160,255],[90,174,97,255],[27,120,55,255],[0,68,27,255]]",
  "Red Blue":
    "[[103,0,31,255],[178,24,43,255],[214,96,77,255],[244,165,130,255],[253,219,199,255],[209,229,240,255],[146,197,222,255],[67,147,195,255],[33,102,172,255],[5,48,97,255]]"
};

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05
};

const widthScaleOptions = {
  range: true,
  min: 1,
  max: 10,
  step: 0.5
};

const mapData = [
  "https://service.civicpdx.org/transportation-systems/sandbox/slides/routechange/"
];

const highlightColor = [125, 125, 125, 125];

const parseColors = colorScheme => JSON.parse(colorScheme);

const getPath = f => f.geometry.coordinates;
const getWidth = () => 15;

export default () => {
  storiesOf("Component Lib|Maps/Path Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add(
      "Standard",
      () => {
        const colorScheme = select(
          "Color Scheme:",
          colorSchemeOptions,
          colorSchemeOptions["Purple Green"]
        );
        const colors = parseColors(colorScheme);

        const divergingScale = scaleThreshold()
          .domain([-100, -75, -50, -25, 0, 25, 50, 75, 100])
          .range(colors);

        const getPathColor = f => {
          const percentChange = f.properties.pct_change;
          return divergingScale(percentChange);
        };

        const opacity = number("Opacity:", 0.95, opacityOptions);

        const widthScale = number("Width Scale:", 1, widthScaleOptions);
        const rounded = boolean("Rounded:", true);

        return (
          <DemoJSONLoader urls={mapData}>
            {data => {
              return (
                <BaseMap
                  mapboxStyle={baseMapStyle}
                  initialZoom={12}
                  initialLatitude={45.523027}
                  initialLongitude={-122.67037}
                >
                  <PathMap
                    data={data.slide_data.features}
                    getColor={getPathColor}
                    opacity={opacity}
                    getPath={getPath}
                    getWidth={getWidth}
                    widthScale={widthScale}
                    rounded={rounded}
                    highlightColor={highlightColor}
                    onLayerClick={info =>
                      action("Layer clicked:", { depth: 2 })(info, info.object)
                    }
                  />
                </BaseMap>
              );
            }}
          </DemoJSONLoader>
        );
      },
      { notes }
    )
    .add(
      "Example: With Tooltip",
      () => {
        const colorScheme = select(
          "Color Scheme:",
          colorSchemeOptions,
          colorSchemeOptions["Purple Green"]
        );
        const colors = parseColors(colorScheme);

        const divergingScale = scaleThreshold()
          .domain([-100, -75, -50, -25, 0, 25, 50, 75, 100])
          .range(colors);

        const getPathColor = f => {
          const value = f.properties.pct_change;
          return divergingScale(value);
        };

        const opacity = number("Opacity:", 0.95, opacityOptions);

        const widthScale = number("Width Scale:", 1, widthScaleOptions);
        const rounded = boolean("Rounded:", true);

        return (
          <DemoJSONLoader urls={mapData}>
            {data => {
              return (
                <BaseMap
                  mapboxStyle={baseMapStyle}
                  initialZoom={12}
                  initialLatitude={45.523027}
                  initialLongitude={-122.67037}
                >
                  <PathMap
                    data={data.slide_data.features}
                    getColor={getPathColor}
                    opacity={opacity}
                    getPath={getPath}
                    getWidth={getWidth}
                    widthScale={widthScale}
                    rounded={rounded}
                    highlightColor={highlightColor}
                    onLayerClick={info =>
                      action("Layer clicked:", { depth: 2 })(info, info.object)
                    }
                  >
                    <MapTooltip
                      primaryName="Percent Change"
                      primaryField="pct_change"
                    />
                  </PathMap>
                </BaseMap>
              );
            }}
          </DemoJSONLoader>
        );
      },
      { notes }
    );
};
