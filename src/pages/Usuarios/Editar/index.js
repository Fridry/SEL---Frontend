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
    genero,
    data_nascimento,
    cpf,
    rg,
    email,
    telefone,
    rua,
    numero,
    bairro,
    cep,
    cidade,
  } = location.state.usuario;

  const [usuario, setUsuario] = useState({
    nome,
    genero,
    data_nascimento: getDate(data_nascimento),
    cpf,
    rg,
    email,
    telefone,
    rua,
    numero,
    bairro,
    cep,
    cidade,
  });
  const [msg, setMsg] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUsuario((prevState) => ({ ...prevState, [name]: value }));
  };

  const goBack = () => {
    history.push("/listar-usuarios");
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/usuarios/${id}`, usuario, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setUsuario({
        nome: "",
        genero: "",
        data_nascimento: "",
        cpf: "",
        rg: "",
        email: "",
        telefone: "",
        rua: "",
        numero: 0,
        bairro: "",
        cep: "",
        cidade: "",
      });

      setMsg(["success", "Usuário atualizado com sucesso."]);

      goBack();
    } catch (error) {
      console.log({ error });
      setMsg(["danger", "Erro ao atualizar usuário."]);
    }

    setTimeout(() => setMsg([]), 5000);
  };

  return (
    <Template title="Editar Usuário">
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
                value={usuario.nome}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="genero">Gênero</label>
              <select
                className="form-control"
                id="genero"
                name="genero"
                value={usuario.genero}
                onChange={handleInputChange}
              >
                <option defaultValue="" unselectable="true">
                  Selecione um Gênero
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
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
                value={usuario.data_nascimento}
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
                value={usuario.cpf}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rg">RG</label>
              <input
                type="text"
                className="form-control"
                id="rg"
                placeholder="RG"
                name="rg"
                value={usuario.rg}
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
                value={usuario.email}
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
                value={usuario.telefone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rua">Rua</label>
              <input
                type="text"
                className="form-control"
                id="rua"
                placeholder="Rua"
                required
                name="rua"
                value={usuario.rua}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="numero">Número</label>
              <input
                type="number"
                className="form-control"
                id="numero"
                placeholder="Número"
                required
                name="numero"
                value={usuario.numero}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                className="form-control"
                id="bairro"
                placeholder="Bairro"
                required
                name="bairro"
                value={usuario.bairro}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                className="form-control"
                id="cep"
                placeholder="CEP"
                required
                name="cep"
                value={usuario.cep}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                className="form-control"
                id="cidade"
                placeholder="Cidade"
                required
                name="cidade"
                value={usuario.cidade}
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
