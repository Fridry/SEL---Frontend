import React, { useState, useEffect } from "react";

import api from "../../../services/api";
import { isAutenticated, getToken } from "../../../utils/Autentication";

import Template from "../../../components/Template";
import Pagination from "../../../components/Pagination";

const Listar = () => {
  const [atendentes, setAtendentes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [total, setTotal] = useState(0);
  const [nome, setNome] = useState("");
  const [limit, setLimit] = useState(10);
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    setLoader(true);

    api
      .get(`/atendentes?page=${page}&limit=${limit}`)
      .then((response) => {
        setTotal(response.headers["x-total-count"]);

        setAtendentes(response.data);

        setTotalPages(Math.ceil(total / limit));

        const arrayPages = [];
        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }

        setPages(arrayPages);

        setLoader(false);
      })
      .catch((err) => console.error(err));
  }, [limit, page, total, totalPages]);

  const search = async (e) => {
    setLoader(true);
    let queryNome = "";

    if (nome !== "") queryNome = `&nome=${nome}`;

    if (e.key === "Enter") {
      const response = await api.get(`/atendentes?${queryNome}`);

      setAtendentes(response.data);

      setNome("");
    }

    setLoader(false);
  };

  const deleteUsuario = async (id) => {
    const confirmarExclusão = window.confirm(
      "Tem certeza que deseja excluir o livro?"
    );

    if (confirmarExclusão) {
      try {
        if (isAutenticated()) {
          await api.delete(`/atendentes/${id}`, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getToken()}`,
            },
          });

          setMsg(["success", "Usuário excluido com sucesso."]);

          setAtendentes(atendentes.filter((usuario) => usuario.id !== id));
        }
      } catch (error) {
        setMsg(["danger", "Erro ao excluir atendente."]);
      }
    }

    setTimeout(() => setMsg([]), 5000);
  };

  const clear = () => {
    setPage(1);
    setLimit(10);
    setTotal(0);
    setTotalPages([]);
  };

  return (
    <Template title="Listar atendentes">
      {loader ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {msg[0] && (
            <div className={`alert alert-${msg[0]} text-center`} role="alert">
              {msg[1]}
            </div>
          )}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <form className="form-inline my-2 my-lg-0 ml-auto">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Pesquisar atendente..."
                aria-label="Search"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onKeyPress={search}
              />

              <select
                className="form-control"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={clear}
              >
                Limpar
              </button>
            </form>
          </nav>

          <table className="table table-bordered table-sm table-hover">
            <thead className="thead-dark">
              <tr className="text-center">
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">CPF</th>
                <th scope="col">Email</th>
                <th scope="col">Telefone</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {atendentes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <p>Nenhum atendente encontrado</p>
                  </td>
                </tr>
              ) : (
                atendentes.map((usuario) => (
                  <tr key={usuario.id}>
                    <th scope="row">{usuario.id}</th>
                    <td>{usuario.nome}</td>
                    <td>{usuario.cpf}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.telefone}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm m-1"
                        onClick={() => deleteUsuario(usuario.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="text-center">
                  <p>Total de livros cadastrados: {total}</p>
                </td>
              </tr>
            </tfoot>
          </table>

          <Pagination
            page={page}
            pages={pages}
            totalPages={totalPages}
            setPage={setPage}
          />
        </>
      )}
    </Template>
  );
};

export default Listar;
