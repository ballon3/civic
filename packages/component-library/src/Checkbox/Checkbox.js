/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialCheckbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

/*
const checkboxClass = props => css`
  background: ${props.bkgndColor};
  cursor: pointer;
`;
*/

const checkboxClass = css`
  background: #fff;
  cursor: pointer;
`;

const Checkbox = ({
  checked,
  variant,
  onChange,
  disabled,
  value,
  label,
  labelPlacement
}) => (
  <FormControlLabel
    value={value}
    control={
      <MaterialCheckbox
        checked={checked}
        variant={variant}
        onChange={onChange}
        disabled={disabled}
        css={checkboxClass}
        inputProps={{ "aria-label": { label } }}
      />
    }
    label={label}
    labelPlacement={labelPlacement}
  />
);

Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
  value: PropTypes.string,
  // control: PropTypes.func,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  checked: PropTypes.bool,
  variant: PropTypes.string,
  // checkedIcon: PropTypes.node,
  disabled: PropTypes.bool,
  // icon: PropTypes.node,
  onChange: PropTypes.func
  // type: PropTypes.string
};

Checkbox.defaultProps = {
  value: "checkboxValue",
  label: "Label",
  labelPlacement: "end",
  checked: false,
  variant: "contained",
  disabled: false
  /*
  display: "block",
  margin: "12px",
  accentColor: "#DC4556",
  bkgndColor: "#FFFFFF",
  transition: "all .2s ease-in-out"
  */
};

export default Checkbox;
