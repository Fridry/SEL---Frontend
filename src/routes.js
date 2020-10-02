import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import NovoAtendente from "./pages/Atendentes/Novo";
import ListarAtendentes from "./pages/Atendentes/Listar";
import NovoEmprestimo from "./pages/Emprestimos/Novo";
import ListarEmprestimos from "./pages/Emprestimos/Listar";
import NovoLivro from "./pages/Livros/Novo";
import ListarLivros from "./pages/Livros/Listar";
import EditarLivros from "./pages/Livros/Editar";
import NovoReserva from "./pages/Reservas/Novo";
import ListarReservas from "./pages/Reservas/Listar";
import NovoUsuario from "./pages/Usuarios/Novo";
import ListarUsuarios from "./pages/Usuarios/Listar";
import EditarUsuario from "./pages/Usuarios/Editar";
import NotFound from "./pages/404";
import Login from "./pages/Login";

import PrivateRoute from "./utils/PrivateRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/novo-atendente">
          <NovoAtendente />
        </Route>

        <Route exact path="/listar-atendentes">
          <ListarAtendentes />
        </Route>

        <Route exact path="/novo-emprestimo" component={NovoEmprestimo} />

        <Route exact path="/listar-emprestimos">
          <ListarEmprestimos />
        </Route>

        <Route exact path="/novo-livro">
          <NovoLivro />
        </Route>

        <Route exact path="/listar-livros">
          <ListarLivros />
        </Route>

        <Route exact path="/editar-livro/:id" component={EditarLivros} />

        <Route exact path="/nova-reserva" component={NovoReserva} />

        <Route exact path="/listar-reservas">
          <ListarReservas />
        </Route>

        <Route exact path="/novo-usuario">
          <NovoUsuario />
        </Route>

        <Route exact path="/listar-usuarios">
          <ListarUsuarios />
        </Route>

        <Route exact path="/editar-usuario/:id" component={EditarUsuario} />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
