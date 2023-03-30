/**
 * src/components/DefaultLink.jsx
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.09.2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from "react-router-dom";


const DefaultLink = ({
  className,
  classNameActive,
  classNameHasActiveChild,
  active,
  hasActiveChild,
  to,
  externalLink,
  hasSubMenu,
  toggleSubMenu,
  activateMe,
  children,
}) => (
  <Link
    className={classnames(
      className,
      active && classNameActive,
      hasActiveChild && classNameHasActiveChild,
    )}
    href={to}
    to={to}
    onClick={hasSubMenu ? toggleSubMenu : activateMe}
    target={externalLink ? '_blank' : undefined}
  >
    {children}
  </Link>
);

DefaultLink.defaultProps = {
  externalLink: false,
  toggleSubMenu: null,
};

DefaultLink.propTypes = {
  className: PropTypes.string.isRequired,
  classNameActive: PropTypes.string.isRequired,
  classNameHasActiveChild: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  hasActiveChild: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  externalLink: PropTypes.bool,
  hasSubMenu: PropTypes.bool.isRequired,
  toggleSubMenu: PropTypes.func,
  activateMe: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
};

export default DefaultLink;
