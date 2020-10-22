import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import Footer from "../../components/Footer";

const Login = () => {
  const history = useHistory();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [msgErro, setMsgErro] = useState("");

  const login = async (e) => {
    e.preventDefault();

    if (usuario !== "" && senha !== "") {
      try {
        const result = await api.post("/atendentes/login", {
          cpf: usuario,
          senha,
        });

        if (result.data) {
          localStorage.setItem("@Token", result.data.token);
          localStorage.setItem("@Id", result.data.id);
        }

        history.push("/");
      } catch (error) {
        const msg = error.response.data.error;
        if (error) setMsgErro(msg);
      }
    } else {
      setMsgErro("Usuário e Senha obrigatórios.");
    }

    setTimeout(() => setMsgErro(""), 5000);
  };

  return (
    <div id="layoutAuthentication" className="bg-dark">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-2">
                      Login
                    </h3>
                  </div>

                  <div className="card-body">
                    {msgErro ? (
                      <div
                        className="alert alert-danger text-center"
                        role="alert"
                      >
                        {msgErro}
                      </div>
                    ) : null}

                    <form>
                      <div className="form-group">
                        <label className="small mb-1" htmlFor="usuario">
                          Usuário
                        </label>
                        <input
                          className="form-control py-4"
                          id="usuario"
                          type="text"
                          placeholder="Entre com seu usuário"
                          value={usuario}
                          onChange={(e) => setUsuario(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="small mb-1" htmlFor="inputPassword">
                          Senha
                        </label>
                        <input
                          className="form-control py-4"
                          id="inputPassword"
                          type="password"
                          placeholder="Entre com sua senha"
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="rememberPasswordCheck"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="rememberPasswordCheck"
                          >
                            Lembrar senha
                          </label>
                        </div>
                      </div>
                      <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a className="small" href="password.html">
                          Esqueceu a senha?
                        </a>
                        <button className="btn btn-primary" onClick={login}>
                          Entrar
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center">
                    <div className="small">
                      <a href="register.html">
                        Não possui uma conta? Cadastre-se aqui!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
