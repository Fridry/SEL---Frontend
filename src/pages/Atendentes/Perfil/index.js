import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getId } from "../../../utils/Autentication";

import api from "../../../services/api";
import Template from "../../../components/Template";

import biblioImg from "../../../assets/img/biblioimage.jpg";

const Perfil = () => {
  const [atendente, setAtendente] = useState({});

  const id = getId();

  useEffect(() => {
    api
      .get(`/atendentes/${id}`)
      .then((response) => {
        setAtendente(response.data[0]);
      })
      .catch((err) => console.error(err));
  }, [atendente, id]);

  const dataNascimento = (data) => {
    let date = new Date(data);

    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  return (
    <Template title="Perfil Atendente">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="card mb-3"
          style={{
            width: 600,
          }}
        >
          <img
            className="card-img-top"
            src={biblioImg}
            alt="Biblioteca"
            style={{ height: 250 }}
          />
          <div className="card-body">
            <h5 className="card-title">Perfil</h5>
            <p className="card-text">
              <strong>ID:</strong> {atendente.id}
            </p>
            <p className="card-text">
              <strong>Nome:</strong> {atendente.nome}
            </p>
            <p className="card-text">
              <strong>Data de Nascimento:</strong>{" "}
              {dataNascimento(atendente.data_nascimento)}
            </p>
            <p className="card-text">
              <strong>CPF:</strong> {atendente.cpf}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {atendente.email}
            </p>
            <p className="card-text">
              <strong>Telefone:</strong> {atendente.telefone}
            </p>

            <p className="card-text">
              <Link
                to={{
                  pathname: `/editar-atendente`,
                  state: { atendente },
                }}
                type="button"
                className="btn btn-warning btn-block mt-4"
              >
                <i className="fas fa-pen"></i> Editar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Perfil;
