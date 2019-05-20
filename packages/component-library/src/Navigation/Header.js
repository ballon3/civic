/* TODO: Fix linting errors */
/* eslint-disable */

import React, { Component } from "react";
import { Link } from "react-router";
import { css } from "emotion";
import PropTypes from "prop-types";
import Nav from "./Nav";
import Logo from "../Logo/LogoAnimated";
import Icon from "../Icon/Icon";
import { ICONS } from "../styleConstants";

const primaryColor = "rgb(34, 15, 37)";

const containerClass = css`
  width: 100%;
  min-width: 320px;
`;

const overlayContainerClass = css`
  ${containerClass};
  position: fixed;
  z-index: 100;
`;

const headerClass = css`
  background-color: ${primaryColor};
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 320px;
  margin: 0 auto;
  padding: 0;
`;

const overlayHeaderClass = css`
  ${headerClass};
  background-color: transparent;
`;

const navClass = css`
  margin: 0 30px 0 0;
  display: block;

  @media (max-width: 640px) {
    &.active {
      display: block;
    }

    &.inactive {
      display: none;
    }
  }
`;

const logoClass = css`
  margin: 12px 24px;
  flex: 2;
`;

const logoLinkClass = css`
  border: none;
  opacity: 1;
  transition: none;
`;

const burgerClass = css`
  a& {
    display: none;
    padding: 2rem;
    border: none;
    padding-right: 0;
    margin-right: 2rem;

    @media (max-width: 640px) {
      display: block;
    }
  }
`;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuActive: false
    };
  }

  togglesNestedMenu = () => {
    if (!this.state.menuActive) {
      // attach/remove event handler
      document.body.addEventListener(
        "click",
        this.handleOutsideClick,
        this.myHandler
      );
    } else {
      document.body.removeEventListener(
        "click",
        this.handleOutsideClick,
        this.myHandler
      );
    }

    this.setState({ menuActive: !this.state.menuActive });
  };

  myHandler = () => {
    alert("click");
  };

  render() {
    const { children, menu, title, overlay, mainProjectColor } = this.props;
    return (
      <div className={overlay ? overlayContainerClass : containerClass}>
        <nav
          className={overlay ? overlayHeaderClass : headerClass}
          style={{ backgroundColor: mainProjectColor || primaryColor }}
        >
          <div className={logoClass}>
            <Link className={logoLinkClass} to="/">
              <Logo alt={title} />
            </Link>
          </div>
          <div
            className={`${navClass} ${
              this.state.menuActive ? "active" : "inactive"
            }`}
          >
            <Nav
              menu={menu}
              toggleSubNav={this.togglesNestedMenu}
              togglesNestedMenu={this.togglesNestedMenu}
            />

            {children}
          </div>
          <a className={burgerClass}>
            <Icon
              key="nav-burger"
              className={`${ICONS.hamburger}`}
              handleClick={this.togglesNestedMenu}
            />
          </a>
        </nav>
      </div>
    );
  }
}

Header.displayName = "Header";
Header.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  children: PropTypes.node,
  overlay: PropTypes.bool,
  mainProjectColor: PropTypes.string
};

export default Header;
