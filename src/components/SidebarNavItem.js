import React, { Fragment } from "react";
import SidebarNavLink from "./SidebarNavLink";

const SidebarNavItem = ({ title, icon, navLinkData }) => {
  return (
    <Fragment>
      <a
        className="nav-link collapsed"
        href="!#"
        data-toggle="collapse"
        data-target={`#collapse${title}`}
        aria-expanded="false"
        aria-controls={`collapse${title}`}
      >
        <div className="sb-nav-link-icon">
          <i className={icon}></i>
        </div>
        {title}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </a>
      <div
        className="collapse"
        id={`collapse${title}`}
        aria-labelledby="headingOne"
        data-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          {navLinkData.map(({ navLinkTitle, navLinkIcon }) => (
            <SidebarNavLink title={navLinkTitle} icon={navLinkIcon} />
          ))}
        </nav>
      </div>
    </Fragment>
  );
};

export default SidebarNavItem;
