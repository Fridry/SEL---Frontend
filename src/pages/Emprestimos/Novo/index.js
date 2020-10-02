import React, { useState } from "react";

import api from "../../../services/api";
import { getToken } from "../../../utils/Autentication";
import Template from "../../../components/Template";

const Novo = (state) => {
  const data = state.location.state;

  const [livro, setLivro] = useState({
    id: data ? data.id : "",
    titulo: data ? data.titulo : "",
    autor: data ? data.autor : "",
    editora: data ? data.editora : "",
  });

  const [usuario, setUsuario] = useState({
    id: "",
    nome: "",
    telefone: "",
    email: "",
  });

  const [input, setInput] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");

  const [msg, setMsg] = useState([]);
  const [errMsg, setErrMsg] = useState([]);
  const [indMsg, setIndMsg] = useState([]);

  const submitEmprestimo = async (e) => {
    e.preventDefault();

    const data = {
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_para_devolucao: dataDevolucao,
    };

    try {
      await api.post("/emprestimos", data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setLivro({
        id: 0,
        titulo: "",
        autor: "",
        editora: "",
      });

      setUsuario({
        id: "",
      });

      setInput("");
      setDataDevolucao("");

      setMsg(["success", "Empréstimo realizado com sucesso."]);
    } catch (error) {
      console.log({ error });
      setMsg(["danger", "Erro ao emprestar livro."]);
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

  const searchLivro = async () => {
    if (livro.id !== "") {
      const response = await api.get(`/livros/${livro.id}`);

      if (response.data.length) {
        const { id, titulo, autor, editora, disponivel } = response.data[0];

        if (disponivel === false) {
          setIndMsg(["info", `Livro indisponível.`]);

          setTimeout(() => setIndMsg([]), 5000);
          return;
        }
        setLivro({
          id,
          titulo,
          autor,
          editora,
        });

        return;
      } else {
        setIndMsg(["info", `Nenhum livro encontrado com o ID ${input}.`]);
      }

      setLivro({
        id: 0,
        titulo: "",
        autor: "",
        editora: "",
      });

      setTimeout(() => setIndMsg([]), 5000);
    }
  };

  return (
    <Template title="Novo empréstimo">
      <div className="card">
        <div className="card-body px-5">
          {msg[0] && (
            <div className={`alert alert-${msg[0]} text-center`} role="alert">
              {msg[1]}
            </div>
          )}

          <form>
            <div>
              <label htmlFor="livroId">Livro ID</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="livroId"
                  placeholder="Livro ID"
                  required
                  name="livroId"
                  value={livro.id}
                  onChange={(e) => setLivro({ ...livro, id: e.target.value })}
                  aria-describedby="search-user"
                  readOnly={data ? true : false}
                />

                {!data && (
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      id="search-user"
                      onClick={searchLivro}
                    >
                      Procurar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {indMsg[0] && (
              <div
                className={`alert alert-${indMsg[0]} text-center card mt-4`}
                role="alert"
              >
                {indMsg[1]}
              </div>
            )}

            {livro.titulo && (
              <div className="card mt-4">
                <div className="card-header text-center">Dados do livro</div>
                <div className="card-body">
                  <p>
                    <span className="font-weight-bold">Título: </span>
                    {livro.titulo}
                  </p>
                  <p>
                    <span className="font-weight-bold">Autor: </span>
                    {livro.autor}
                  </p>
                  <p>
                    <span className="font-weight-bold">Editora: </span>
                    {livro.editora}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-3">
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
                <div className="card-header text-center">Dados do usuário</div>
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

            <div className="form-group mt-3">
              <label htmlFor="data_para_devolucao">Data para devolução</label>
              <input
                type="date"
                className="form-control"
                id="data_para_devolucao"
                placeholder="Data para devolução"
                required
                name="data_para_devolucao"
                value={dataDevolucao}
                onChange={(e) => setDataDevolucao(e.target.value)}
              />
            </div>

            <div className="form-group text-center">
              <button
                className="btn btn-primary mt-5 btn-block"
                type="submit"
                onClick={submitEmprestimo}
              >
                Emprestar livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default Novo;
