import React, { Fragment, useState } from "react";

import "./assets/css/styles.css";
import Footer from "./Footer";

import Menu from "./Menu";
import Sidebar from "./Sidebar";

const Template = ({ children, title }) => {
  const [hide, setHide] = useState(false);

  const classSidebar = hide
    ? "sb-nav-fixed sb-sidenav-toggled"
    : "sb-nav-fixed";

  const toggleSidebar = () => setHide(!hide);

  return (
    <Fragment>
      <div className={classSidebar}>
        <Menu toggleSidebar={toggleSidebar} />

        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>

          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid">
                <h1 className="mt-2 text-center">{title}</h1>
                {children}
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Template;
