import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../services/api";
import { getToken } from "../../../utils/Autentication";
import Template from "../../../components/Template";

const Editar = ({ location }) => {
  const history = useHistory();

  const getDate = (date) => date.split("T")[0];

  let {
    id,
    nome,
    data_nascimento,
    cpf,
    email,
    telefone,
  } = location.state.atendente;

  const [atendente, setAtendente] = useState({
    nome,
    data_nascimento: getDate(data_nascimento),
    cpf,
    email,
    telefone,
  });
  const [msg, setMsg] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAtendente((prevState) => ({ ...prevState, [name]: value }));
  };

  const goBack = () => {
    history.push("/perfil");
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/atendentes/${id}`, atendente, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setAtendente({
        nome: "",
        data_nascimento: "",
        cpf: "",
        email: "",
        telefone: "",
      });

      setMsg(["success", "Atendente atualizado com sucesso."]);

      goBack();
    } catch (error) {
      console.log({ error });
      setMsg(["danger", "Erro ao atualizar atendente."]);
    }

    setTimeout(() => setMsg([]), 5000);
  };

  return (
    <Template title="Editar Atendente">
      <div className="card">
        <div className="card-body px-5">
          {msg[0] && (
            <div className={`alert alert-${msg[0]} text-center`} role="alert">
              {msg[1]}
            </div>
          )}

          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Nome"
                required
                name="nome"
                value={atendente.nome}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="data_nascimento">Data de nascimento</label>
              <input
                type="date"
                className="form-control"
                id="data_nascimento"
                placeholder="Data de nascimento"
                required
                name="data_nascimento"
                value={atendente.data_nascimento}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                placeholder="CPF"
                name="cpf"
                value={atendente.cpf}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                value={atendente.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="phone"
                className="form-control"
                id="telefone"
                placeholder="Telefone"
                name="telefone"
                value={atendente.telefone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group text-center">
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-primary float-left btn-block"
                    type="submit"
                    onClick={updateUser}
                  >
                    Atualizar usuário
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-secondary float-right btn-block"
                    type="submit"
                    onClick={goBack}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default Editar;
