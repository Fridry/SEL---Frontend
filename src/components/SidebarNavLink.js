import React from "react";

const SidebarNavLink = ({ title, icon }) => {
  return (
    <a className="nav-link" href="index.html">
      <div className="sb-nav-link-icon">
        <i class={icon}></i>
      </div>
      {title}
    </a>
  );
};

export default SidebarNavLink;
