import React, { useState, useEffect } from "react";

import api from "../../../services/api";
import { isAutenticated } from "../../../utils/Autentication";

import Template from "../../../components/Template";
import Detalhes from "../Detalhes";

const Listar = () => {
  const [livros, setLivros] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [total, setTotal] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [limit, setLimit] = useState(10);
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    setLoader(true);

    api
      .get(`/livros?page=${page}&limit=${limit}`)
      .then((response) => {
        setTotal(response.headers["x-total-count"]);

        setLivros(response.data);

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
    let queryTitulo = "";
    let queryAutor = "";

    if (titulo !== "") queryTitulo = `&titulo=${titulo}`;
    if (autor !== "") queryAutor = `&autor=${autor}`;

    if (e.key === "Enter") {
      const response = await api.get(`/livros?${queryTitulo}${queryAutor}`);

      setLivros(response.data);

      setAutor("");
      setTitulo("");
    }

    setLoader(false);
  };

  const deleteLivro = async (id) => {
    try {
      if (isAutenticated()) {
        await api.delete(`/livros/${id}`);

        setMsg(["success", "Livro excluido com sucesso."]);

        setLivros(livros.filter((livro) => livro.id !== id));
      }
    } catch (error) {
      setMsg(["danger", "Erro ao excluir livro."]);
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
    <Template title="Listar livros">
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
                placeholder="Pesquisar título..."
                aria-label="Search"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                onKeyPress={search}
              />
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Pesquisar autor..."
                aria-label="Search"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                onKeyUp={search}
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
                <th scope="col">Título</th>
                <th scope="col">Autor</th>
                <th scope="col">Editora</th>
                <th scope="col">Disponibilidade</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <p>Nenhum livro encontrado</p>
                  </td>
                </tr>
              ) : (
                livros.map((livro) => (
                  <tr key={livro.id}>
                    <th scope="row">{livro.id}</th>
                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.editora}</td>
                    <td>{livro.disponivel ? "Disponível" : "Indisponível"}</td>
                    <td className="text-center">
                      <Detalhes livro={livro} />

                      <button
                        type="button"
                        className="btn btn-warning btn-sm m-1"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm m-1"
                        onClick={() => deleteLivro(livro.id)}
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

          <div>
            <nav aria-label="Navegação de página exemplo">
              <ul className="pagination justify-content-center">
                {page !== 1 && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      aria-label="Anterior"
                      onClick={() => setPage(1)}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Anterior</span>
                    </button>
                  </li>
                )}
                {pages.map((page, index) => (
                  <li className="page-item" key={index}>
                    <button className="page-link" onClick={() => setPage(page)}>
                      {page}
                    </button>
                  </li>
                ))}
                {page !== totalPages && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setPage(totalPages)}
                      aria-label="Próximo"
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Próximo</span>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </>
      )}
    </Template>
  );
};

export default Listar;
