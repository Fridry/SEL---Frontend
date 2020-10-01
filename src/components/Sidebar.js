import React from "react";

import SidebarNavItem from "./SidebarNavItem";
import SidebarNavLink from "./SidebarNavLink";

const homeIcon = "fas fa-home";
const bookIcon = "fas fa-book";
const newBookIcon = "fas fa-book-medical";
const list = "fas fa-list";
const borrow = "fas fa-handshake";
const newBorrow = "fas fa-hand-holding-medical";
const booking = "fas fa-bookmark";
const users = "fas fa-users";
const newUser = "fas fa-user-plus";
const employee = "fas fa-user-tie";
const info = "fas fa-info";

const Sidebar = () => {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Seja bem-vindo</div>
          <SidebarNavLink title={"Home"} icon={homeIcon} url="/" />

          <div className="sb-sidenav-menu-heading">Livros</div>

          <SidebarNavItem
            title="Inventário"
            icon={bookIcon}
            navLinkData={[
              {
                navLinkTitle: "Adicionar livro",
                navLinkUrl: "/novo-livro",
                navLinkIcon: newBookIcon,
              },
              {
                navLinkTitle: "Listar livros",
                navLinkUrl: "/listar-livros",
                navLinkIcon: list,
              },
            ]}
          />

          <SidebarNavItem
            title="Empréstimos"
            icon={borrow}
            navLinkData={[
              {
                navLinkTitle: "Novo empréstimo",
                navLinkUrl: "/novo-emprestimo",
                navLinkIcon: newBorrow,
              },
              {
                navLinkTitle: "Listar empréstimos",
                navLinkUrl: "/listar-emprestimos",
                navLinkIcon: list,
              },
            ]}
          />

          <SidebarNavLink
            title="Reservas"
            icon={booking}
            url="/listar-reservas"
          />

          <div className="sb-sidenav-menu-heading">Usuários</div>
          <SidebarNavItem
            title="Usuários"
            icon={users}
            navLinkData={[
              {
                navLinkTitle: "Cadastrar usuário",
                navLinkUrl: "/novo-usuario",
                navLinkIcon: newUser,
              },
              {
                navLinkTitle: "Listar usuários",
                navLinkUrl: "/listar-usuarios",
                navLinkIcon: list,
              },
            ]}
          />

          <div className="sb-sidenav-menu-heading">Atendentes</div>
          <SidebarNavItem
            title="Atendentes"
            icon={employee}
            navLinkData={[
              {
                navLinkTitle: "Perfil",
                navLinkUrl: "!#",
                navLinkIcon: info,
              },
              {
                navLinkTitle: "Cadastrar",
                navLinkUrl: "/novo-atendente",
                navLinkIcon: newUser,
              },
              {
                navLinkTitle: "Listar",
                navLinkUrl: "/listar-atendentes",
                navLinkIcon: list,
              },
            ]}
          />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
