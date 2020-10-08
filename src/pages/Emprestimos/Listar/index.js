import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../../services/api";
import Template from "../../../components/Template";
import Pagination from "../../../components/Pagination";

const Listar = () => {
  const [emprestimo, setEmprestimo] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [total, setTotal] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [limit, setLimit] = useState(10);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    api
      .get(`/emprestimos?page=${page}&limit=${limit}&orderCol=created_at`)
      .then((response) => {
        setTotal(response.headers["x-total-count"]);

        setEmprestimo(response.data);

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
    let queryUsuario = "";

    if (titulo !== "") queryTitulo = `&titulo=${titulo}`;
    if (usuario !== "") queryUsuario = `&usuario=${usuario}`;

    if (e.key === "Enter") {
      const response = await api.get(
        `/emprestimos?${queryTitulo}${queryUsuario}`
      );

      setEmprestimo(response.data);

      setUsuario("");
      setTitulo("");
    }

    setLoader(false);
  };

  const dataDoEmprestimo = (data) => {
    let date = new Date(data);

    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  const clear = () => {
    setPage(1);
    setLimit(10);
    setTotal(0);
    setTotalPages([]);
  };

  const checkAtraso = (dataDev, devolvido) => {
    if (!devolvido) {
      let strData = dataDoEmprestimo(dataDev);
      let partesData = strData.split("/");
      let data = new Date(partesData[2], partesData[1] - 1, partesData[0]);

      const style = { backgroundColor: "red", color: "white" };

      return new Date() > data ? style : {};
    } else {
      return {};
    }
  };

  return (
    <Template title="Empréstimos">
      {loader ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <form className="form-inline my-2 my-lg-0 ml-auto">
              <input
                className="form-control mr-sm-2"
                type="search"
                id="titulo"
                placeholder="Pesquisar título..."
                aria-label="Search"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                onKeyPress={search}
              />
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Pesquisar usuário..."
                aria-label="Search"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
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
                className="btn btn-secondary ml-2"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                + Filtros
              </button>

              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={clear}
              >
                Limpar
              </button>
            </form>
          </nav>

          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="dataParaDevolucao">
                      Data para devolução
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataParaDevolucao"
                      placeholder="Data para devolução"
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="dataDeRetirada">Data de retirada</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataDeRetirada"
                      placeholder="Data de retirada"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Data de devolução</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataDeEntrega"
                      placeholder="Data de entrega"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Status</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="entregue"
                        value="entregue"
                      />
                      <label className="form-check-label" htmlFor="entregue">
                        Entregue
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="naoEntregue"
                        value="não entregue"
                      />
                      <label className="form-check-label" htmlFor="naoEntregue">
                        Não entregue
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <table className="table table-bordered table-sm table-hover">
            <thead className="thead-dark">
              <tr className="text-center">
                <th scope="row">ID</th>
                <th scope="col">Usuário</th>
                <th scope="col">Título</th>
                <th scope="col">Autor</th>
                <th scope="col">Data da retirada</th>
                <th scope="col">Entrega</th>
                <th scope="col">Data da devolução</th>
                <th scope="col">Data para devolução</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {emprestimo.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <p>Nenhuma reserva encontrada</p>
                  </td>
                </tr>
              ) : (
                emprestimo.map((emp) => (
                  <tr key={emp.id} className="text-center">
                    <td>{emp.id}</td>
                    <td>{emp.nome}</td>
                    <td>{emp.titulo}</td>
                    <td>{emp.autor}</td>

                    <td>{dataDoEmprestimo(emp.data_de_retirada)}</td>

                    <td>{emp.devolvido ? "Sim" : "Não"}</td>
                    <td>
                      {emp.data_da_devolucao
                        ? dataDoEmprestimo(emp.data_da_devolucao)
                        : ""}
                    </td>
                    <td
                      style={checkAtraso(
                        emp.data_para_devolucao,
                        emp.devolvido
                      )}
                    >
                      {dataDoEmprestimo(emp.data_para_devolucao.split(" ", 5))}
                    </td>

                    <td className="text-center">
                      {emp.devolvido ? (
                        <button
                          className="btn btn-success btn-sm m-1"
                          title="Devolvido"
                          disabled
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      ) : (
                        <>
                          <Link
                            to={{
                              pathname: `/devolucao`,
                              state: { renovacao: true, emp },
                            }}
                            type="button"
                            className="btn btn-primary btn-sm m-1"
                            title="Renovar livro"
                          >
                            <i className="fas fa-sync-alt"></i>
                          </Link>

                          <Link
                            to={{
                              pathname: `/devolucao`,
                              state: { emp },
                            }}
                            type="button"
                            className="btn btn-success btn-sm m-1"
                            title="Devolver livro"
                          >
                            <i className="fas fa-reply"></i>
                          </Link>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={8} className="text-center">
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
