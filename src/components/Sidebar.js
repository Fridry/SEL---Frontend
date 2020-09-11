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
const newBooking = "fas fa-address-book";
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
          <SidebarNavLink title={"Home"} icon={homeIcon} />

          <div className="sb-sidenav-menu-heading">Livros</div>

          <SidebarNavItem
            title="Inventário"
            icon={bookIcon}
            navLinkData={[
              {
                navLinkTitle: "Adicionar livro",
                navLinkUrl: "!#",
                navLinkIcon: newBookIcon,
              },
              {
                navLinkTitle: "Listar livros",
                navLinkUrl: "!#",
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
                navLinkUrl: "!#",
                navLinkIcon: newBorrow,
              },
              {
                navLinkTitle: "Listar empréstimos",
                navLinkUrl: "!#",
                navLinkIcon: list,
              },
            ]}
          />

          <SidebarNavItem
            title="Reservas"
            icon={booking}
            navLinkData={[
              {
                navLinkTitle: "Nova reserva",
                navLinkUrl: "!#",
                navLinkIcon: newBooking,
              },
              {
                navLinkTitle: "Listar reservas",
                navLinkUrl: "!#",
                navLinkIcon: list,
              },
            ]}
          />

          <div className="sb-sidenav-menu-heading">Usuários</div>
          <SidebarNavItem
            title="Usuários"
            icon={users}
            navLinkData={[
              {
                navLinkTitle: "Cadastrar usuário",
                navLinkUrl: "!#",
                navLinkIcon: newUser,
              },
              {
                navLinkTitle: "Listar usuários",
                navLinkUrl: "!#",
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
                navLinkUrl: "!#",
                navLinkIcon: newUser,
              },
              {
                navLinkTitle: "Listar",
                navLinkUrl: "!#",
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
