import React, { useState, useEffect } from "react";
import axios from "axios";

import Template from "../../../components/Template";

const Listar = () => {
  const [livros, setLivros] = useState([{}]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/livros?page=${page}`)
      .then((response) => {
        console.log(response);

        setLivros(response.data);
      })
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <Template title="Listar livros">
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
          {livros.map((livro, index) => (
            <tr key={index}>
              <th scope="row">{livro.id}</th>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.editora}</td>
              <td>{livro.disponivel ? "Disponível" : "Indisponível"}</td>
              <td className="text-center">
                <button type="button" className="btn btn-info btn-sm m-1">
                  <i className="fas fa-info-circle"></i>
                </button>
                <button type="button" className="btn btn-warning btn-sm m-1">
                  <i className="fas fa-pen"></i>
                </button>
                <button type="button" className="btn btn-danger btn-sm m-1">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <nav aria-label="Navegação de página exemplo">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="!#" aria-label="Anterior">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Anterior</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="!#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="!#" aria-label="Próximo">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Próximo</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Template>
  );
};

export default Listar;
