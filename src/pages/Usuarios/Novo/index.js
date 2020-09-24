import React, { useState } from "react";

import api from "../../../services/api";
import Template from "../../../components/Template";

const Novo = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    genero: "",
    data_nascimento: "",
    cpf: "",
    rg: "",
    email: "",
    telefone: "",
    senha: "",
    rua: "",
    numero: 0,
    bairro: "",
    cep: "",
    cidade: "",
  });

  const [senhaConf, setSenhaConf] = useState("");
  const [msg, setMsg] = useState([]);
  const [msgErr, setMsgErr] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUsuario((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitUser = async (e) => {
    e.preventDefault();

    if (usuario.senha !== senhaConf) {
      setMsgErr(["danger", "As senhas informadas não coincidem."]);
      setTimeout(() => setMsgErr([]), 5000);

      return;
    }

    try {
      await api.post("/usuarios", usuario);

      setUsuario({
        nome: "",
        genero: "",
        data_nascimento: "",
        cpf: "",
        rg: "",
        email: "",
        telefone: "",
        senha: "",
        rua: "",
        numero: 0,
        bairro: "",
        cep: "",
        cidade: "",
      });

      setMsg(["success", "Usuário adicionado com sucesso."]);
    } catch (error) {
      console.log({ error });
      setMsg(["danger", "Erro ao cadastrar usuário."]);
    }

    setTimeout(() => setMsg([]), 5000);
  };

  return (
    <Template title="Novo Usuário">
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

            {msgErr[0] && (
              <div
                className={`alert alert-${msgErr[0]} text-center`}
                role="alert"
              >
                {msgErr[1]}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                className="form-control"
                id="senha"
                placeholder="Senha"
                name="senha"
                value={usuario.senha}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="senhaConf">Confirmar senha</label>
              <input
                type="password"
                className="form-control"
                id="senhaConf"
                placeholder="Confirmar senha"
                name="senha"
                value={senhaConf}
                onChange={(e) => setSenhaConf(e.target.value)}
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
              <button
                className="btn btn-primary mt-5 btn-block"
                type="submit"
                onClick={submitUser}
              >
                Salvar usuário
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default Novo;
