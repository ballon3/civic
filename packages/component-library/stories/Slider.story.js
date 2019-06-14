import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";
import { Slider } from "../src";
import { storybookStyles } from "./storyStyles";
import StatefulWrapper from "./helpers/StatefulWrapper";

const basicSlider = () => {
  return (
    <StatefulWrapper initialState={{ value: 0 }}>
      {({ get, set }) => {
        return (
          <div style={{ marginTop: "25px", height: "100px" }}>
            <Slider
              min={number("min", 0)}
              max={number("max", 100)}
              onChange={value => {
                set({ value });
                action("onChange")(value);
              }}
              step={number("step", 10)}
              value={number("value", get("value"))}
            />
          </div>
        );
      }}
    </StatefulWrapper>
  );
};

// // NOTE: The `showTooltip` prop cannot be a dynamic storybook knob because rc-slider
// // uses a different component for a slider with a tooltip ☹️
// const tooltipSlider = () => {
//   return (
//     <StatefulWrapper initialState={{ value: 0 }}>
//       {({ get, set }) => {
//         return (
//           <Slider.SliderWithTooltip
//             dots={boolean("dots (step markers)", false)}
//             min={number("min", 0)}
//             max={number("max", 100)}
//             onChange={value => {
//               set({ value });
//               action("onChange")(value);
//             }}
//             step={number("step", 10)}
//             tooltipFormatter={data => `${data}!`}
//             value={number("value", get("value"))}
//           />
//         );
//       }}
//     </StatefulWrapper>
//   );
// };

export default () =>
  storiesOf("Component Lib|Basic Inputs/Slider", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add("Basic Slider", basicSlider);
// .add("Slider With Tooltip", tooltipSlider);
