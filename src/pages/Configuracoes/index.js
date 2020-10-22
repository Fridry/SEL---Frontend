import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getId } from "../../utils/Autentication";
import api from "../../services/api";
import { getToken } from "../../utils/Autentication";
import Template from "../../components/Template";

const Editar = () => {
  const history = useHistory();

  const id = getId();

  const [senhaNova, setSenhaNova] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  const [msg, setMsg] = useState([]);

  const goBack = () => {
    history.push("/");
  };

  const updateSenha = async (e) => {
    e.preventDefault();

    try {
      if (senhaNova !== senhaConfirm) {
        setMsg(["danger", "As senhas informadas não coincidem."]);
        setTimeout(() => setMsg([]), 5000);

        return;
      }

      await api.put(
        `/atendentes/${id}`,
        { senha: senhaNova },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setSenhaNova("");
      setSenhaConfirm("");

      setMsg(["success", "Senha atualizada com sucesso."]);
    } catch (error) {
      console.log({ error });
      setMsg(["danger", "Erro ao atualizar senha."]);
    }

    setTimeout(() => setMsg([]), 5000);
  };

  return (
    <Template title="Trocar senha">
      <div className="card">
        <div className="card-body px-5">
          {msg[0] && (
            <div className={`alert alert-${msg[0]} text-center`} role="alert">
              {msg[1]}
            </div>
          )}

          <form>
            <div className="form-group">
              <label htmlFor="senhaNova">Nova senha</label>
              <input
                type="password"
                className="form-control"
                id="senhaNova"
                required
                name="senhaNova"
                value={senhaNova}
                onChange={(e) => setSenhaNova(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="senhaConfirm">Confirmar senha</label>
              <input
                type="password"
                className="form-control"
                id="senhaConfirm"
                required
                name="senhaConfirm"
                value={senhaConfirm}
                onChange={(e) => setSenhaConfirm(e.target.value)}
              />
            </div>

            <div className="form-group text-center">
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-primary float-left btn-block"
                    type="submit"
                    onClick={updateSenha}
                  >
                    Atualizar senha
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
