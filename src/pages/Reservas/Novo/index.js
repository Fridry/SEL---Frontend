import React, { useState } from "react";

import api from "../../../services/api";
import { getToken } from "../../../utils/Autentication";
import Template from "../../../components/Template";

const Novo = (state) => {
  const { id, titulo, autor } = state.location.state;
  const [livro, setLivro] = useState({
    id,
    titulo,
    autor,
  });

  const [usuario, setUsuario] = useState({
    id: "",
    nome: "",
    telefone: "",
    email: "",
  });

  const [input, setInput] = useState("");

  const [msg, setMsg] = useState([]);
  const [errMsg, setErrMsg] = useState([]);

  const submitReserva = async (e) => {
    e.preventDefault();

    const data = {
      usuario_id: usuario.id,
      livro_id: livro.id,
    };

    try {
      await api.post("/reservas", data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setLivro({
        id: 0,
        titulo: "",
        autor: "",
      });

      setUsuario({
        id: "",
      });

      setInput("");

      setMsg(["success", "Reserva adicionada com sucesso."]);
    } catch (error) {
      console.log({ error });
      setMsg(["danger", "Erro ao reservar livro."]);
    }

    setTimeout(() => setMsg([]), 5000);
  };

  const searchUsuario = async () => {
    if (input !== "") {
      const response = await api.get(`/usuarios/${input}`);

      if (response.data.length) {
        const { id, nome, telefone, email } = response.data[0];

        setUsuario({
          id,
          nome,
          telefone,
          email,
        });

        return;
      } else {
        setErrMsg(["info", `Nenhum usuário encontrado com o ID ${input}.`]);
      }

      setInput("");

      setTimeout(() => setErrMsg([]), 5000);
    }
  };

  return (
    <Template title="Nova reserva">
      <div className="card">
        <div className="card-body px-5">
          {msg[0] && (
            <div className={`alert alert-${msg[0]} text-center`} role="alert">
              {msg[1]}
            </div>
          )}

          <form>
            <div className="form-row">
              <div className="form-group col-md-2">
                <label htmlFor="id">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="ID"
                  required
                  name="id"
                  value={livro.id}
                  readOnly
                />
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  placeholder="Título"
                  required
                  name="titulo"
                  value={livro.titulo}
                  readOnly
                />
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="autor">Autor</label>
                <input
                  type="text"
                  className="form-control"
                  id="autor"
                  placeholder="Autor"
                  required
                  name="autor"
                  value={livro.autor}
                  readOnly
                />
              </div>
            </div>

            <div>
              <label htmlFor="usuarioId">Usuário ID</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="usuarioId"
                  placeholder="Usuário ID"
                  required
                  name="usuarioId"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  aria-describedby="search-user"
                />

                <div className="input-group-append">
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    id="search-user"
                    onClick={searchUsuario}
                  >
                    Procurar
                  </button>
                </div>
              </div>
            </div>

            {errMsg[0] && (
              <div
                className={`alert alert-${errMsg[0]} text-center card mt-4`}
                role="alert"
              >
                {errMsg[1]}
              </div>
            )}

            {usuario.id && (
              <div className="card mt-4">
                <div className="card-body">
                  <p>
                    <span className="font-weight-bold">Nome: </span>
                    {usuario.nome}
                  </p>
                  <p>
                    <span className="font-weight-bold">Telefone: </span>
                    {usuario.telefone}
                  </p>
                  <p>
                    <span className="font-weight-bold">Email: </span>
                    {usuario.email}
                  </p>
                </div>
              </div>
            )}

            <div className="form-group text-center">
              <button
                className="btn btn-primary mt-5 btn-block"
                type="submit"
                onClick={submitReserva}
              >
                Reservar livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default Novo;
