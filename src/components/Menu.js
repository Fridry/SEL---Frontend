import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ toggleSidebar }) => {
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand text-center" to="/">
        <i className="fas fa-book-open"></i> Biblioteca
      </Link>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0"
        id="sidebarToggle"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="userDropdown"
            href="!#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="userDropdown"
          >
            <a className="dropdown-item" href="!#">
              <i className="far fa-id-badge"></i> Perfil
            </a>
            <a className="dropdown-item" href="!#">
              <i className="fas fa-question"></i> Ajuda
            </a>
            <a className="dropdown-item" href="!#">
              <i className="fas fa-user-cog"></i> Configurações
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="login.html">
              <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
