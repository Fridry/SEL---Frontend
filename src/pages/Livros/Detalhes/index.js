import React from "react";

const Detalhes = ({ livro }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-info btn-sm m-1"
        data-toggle="modal"
        data-target={`#detalhes${livro.id}`}
        title="Detalhes do livro"
      >
        <i className="fas fa-info-circle"></i>
      </button>
      <div
        className="modal fade"
        style={{ display: "none" }}
        id={`detalhes${livro.id}`}
        tabIndex="-1"
        aria-labelledby={`detalhes${livro.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`detalhes${livro.id}Label`}>
                {livro.titulo}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col-sm mr-4">
                    <img
                      src={`http://localhost:3333/uploads/${livro.capa}`}
                      className="rounded mx-auto d-block"
                      alt={`Capa do livro ${livro.titulo}`}
                      style={{ width: "220px", height: "320px" }}
                    ></img>
                  </div>
                  <div className="col-sm">
                    <div className="row">
                      <p>
                        <span className="h6">Título:</span> {livro.titulo}
                      </p>
                    </div>

                    <div className="row">
                      <p>
                        <span className="h6">Autor:</span> {livro.autor}
                      </p>
                    </div>

                    {livro.serie && (
                      <div className="row">
                        <p>
                          <span className="h6">Série:</span> {livro.serie}
                        </p>
                      </div>
                    )}
                    {livro.volume && (
                      <div className="row">
                        <p>
                          <span className="h6">Volume:</span> {livro.volume}
                        </p>
                      </div>
                    )}
                    <div className="row">
                      <p>
                        <span className="h6">ISBN:</span> {livro.isbn}
                      </p>
                    </div>
                    <div className="row">
                      <p>
                        <span className="h6">Número de páginas:</span>{" "}
                        {livro.numero_paginas}
                      </p>
                    </div>
                    <div className="row">
                      <p>
                        <span className="h6">Disponíbilidade:</span>{" "}
                        {livro.disponivel ? "Disponível" : "Indisponível"}
                      </p>
                    </div>

                    {!livro.disponivel && (
                      <div className="row">
                        <p>
                          <span className="h6">Status:</span>{" "}
                          {livro.motivo_indisponibilidade}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row m-3">
                  <p className="text-justify">
                    <span className="h6">Sinopse:</span> {livro.sinopse}
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detalhes;
