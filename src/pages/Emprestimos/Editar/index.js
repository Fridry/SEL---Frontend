import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../services/api";
import { getToken } from "../../../utils/Autentication";
import Template from "../../../components/Template";

const Novo = ({ location }) => {
  const history = useHistory();
  const data = location.state.emp;
  const renovacao = location.state.renovacao ? location.state.renovacao : false;

  const [livro, setLivro] = useState({
    id: data ? data.livroId : "",
    titulo: data ? data.titulo : "",
    autor: data ? data.autor : "",
  });

  const [usuario, setUsuario] = useState({
    id: data ? data.usuarioId : "",
    nome: data ? data.nome : "",
  });

  const [dataDevolucao, setDataDevolucao] = useState("");

  const [msg, setMsg] = useState([]);

  const submitDevolucao = async (e) => {
    e.preventDefault();

    if (renovacao && dataDevolucao === "") {
      setMsg(["warning", "Data de devolução obrigtória."]);

      setTimeout(() => setMsg([]), 5000);

      return;
    }

    const dataEmp = renovacao
      ? {
          usuario_id: usuario.id,
          livro_id: livro.id,
          data_para_devolucao: dataDevolucao,
          renovacao: true,
        }
      : {
          usuario_id: usuario.id,
          livro_id: livro.id,
          devolvido: true,
        };

    try {
      await api.put(`/emprestimos/${data.id}`, dataEmp, {
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
        nome: "",
      });

      setDataDevolucao("");

      setMsg(["success", "Devolução realizada com sucesso."]);

      history.push("/listar-emprestimos");
    } catch (error) {
      console.log({ error });
      setMsg(["danger", "Erro ao devolver livro."]);
    }

    setTimeout(() => setMsg([]), 5000);
  };

  return (
    <Template
      title={renovacao ? "Renovar empréstimo de livro" : "Devolver livro"}
    >
      <div className="card">
        <div className="card-body px-5">
          {msg[0] && (
            <div className={`alert alert-${msg[0]} text-center`} role="alert">
              {msg[1]}
            </div>
          )}

          <form>
            <div className="card">
              <div className="card-header text-center">Livro</div>
              <div className="card-body">
                <p>
                  <span className="font-weight-bold">ID: </span>
                  {livro.id}
                </p>
                <p>
                  <span className="font-weight-bold">Título: </span>
                  {livro.titulo}
                </p>
                <p>
                  <span className="font-weight-bold">Autor: </span>
                  {livro.autor}
                </p>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header text-center">Usuário</div>
              <div className="card-body">
                <p>
                  <span className="font-weight-bold">ID: </span>
                  {usuario.id}
                </p>
                <p>
                  <span className="font-weight-bold">Nome: </span>
                  {usuario.nome}
                </p>
              </div>
            </div>

            {renovacao ? (
              <div className="form-group mt-3">
                <label htmlFor="data_para_devolucao">Data para devolução</label>
                <input
                  type="date"
                  className="form-control"
                  id="data_para_devolucao"
                  required={renovacao ? renovacao : false}
                  name="data_para_devolucao"
                  value={dataDevolucao}
                  onChange={(e) => setDataDevolucao(e.target.value)}
                />
              </div>
            ) : null}

            <div className="form-group text-center">
              <button
                className="btn btn-primary mt-5 btn-block"
                type="submit"
                onClick={submitDevolucao}
              >
                Devolver livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default Novo;
