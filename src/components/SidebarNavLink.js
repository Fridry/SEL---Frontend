import React from "react";
import { Link } from "react-router-dom";

const SidebarNavLink = ({ title, icon, url }) => {
  return (
    <Link className="nav-link" to={url}>
      <div className="sb-nav-link-icon">
        <i className={icon}></i>
      </div>
      {title}
    </Link>
  );
};

export default SidebarNavLink;
