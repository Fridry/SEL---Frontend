import React from "react";

const Detalhes = ({ usuario }) => {
  const dataNascimento = (data) => {
    let date = new Date(data);

    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-info btn-sm m-1"
        data-toggle="modal"
        data-target={`#detalhes${usuario.id}`}
      >
        <i className="fas fa-info-circle"></i>
      </button>
      <div
        className="modal fade"
        id={`detalhes${usuario.id}`}
        tabIndex="-1"
        aria-labelledby={`detalhes${usuario.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`detalhes${usuario.id}Label`}>
                Dados do usuário
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
                  <div className="col-sm">
                    <div className="row">
                      <p>
                        <span className="h6">Nome:</span> {usuario.nome}
                      </p>
                    </div>

                    <div className="row">
                      <p>
                        <span className="h6">Gênero:</span> {usuario.genero}
                      </p>
                    </div>

                    <div className="row">
                      <p>
                        <span className="h6">Data de Nascimento:</span>{" "}
                        {dataNascimento(usuario.data_nascimento)}
                      </p>
                    </div>

                    <div className="row">
                      <p>
                        <span className="h6">CPF:</span> {usuario.cpf}
                      </p>
                    </div>
                    <div className="row">
                      <p>
                        <span className="h6">RG:</span> {usuario.rg}
                      </p>
                    </div>
                    <div className="row">
                      <p>
                        <span className="h6">Telfone:</span> {usuario.telefone}
                      </p>
                    </div>

                    <div className="row">
                      <p>
                        <span className="h6">Rua:</span> {usuario.rua}
                      </p>
                    </div>
                    <div className="row">
                      <p>
                        <span className="h6">Número:</span> {usuario.numero}
                      </p>
                    </div>

                    <div className="row">
                      <p>
                        <span className="h6">Bairro:</span> {usuario.bairro}
                      </p>
                    </div>
                    <div className="row">
                      <p>
                        <span className="h6">CEP:</span> {usuario.cep}
                      </p>
                    </div>

                    <div className="row">
                      <p>
                        <span className="h6">Cidade:</span> {usuario.cidade}
                      </p>
                    </div>
                  </div>
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
