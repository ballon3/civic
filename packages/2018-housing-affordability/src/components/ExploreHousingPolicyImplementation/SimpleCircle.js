import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";

import CivicVictoryTheme from "@hackoregon/component-library/src/VictoryTheme/VictoryThemeIndex";

function SimpleCircle({ selected, index }) {
  const width = selected ? "18px" : "10px";
  const padding = selected ? "9px" : "5px";

  return (
    <svg
      className={css`
        padding-right: ${padding};
      `}
      viewBox="0 0 10 10"
      width={width}
    >
      <circle
        cx="5"
        cy="5"
        r="5"
        fill={CivicVictoryTheme.civic.group.colorScale[index]}
      />
    </svg>
  );
}

SimpleCircle.propTypes = {
  selected: PropTypes.bool,
  index: PropTypes.number
};

export default SimpleCircle;
