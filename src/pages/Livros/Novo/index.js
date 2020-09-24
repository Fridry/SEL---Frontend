import React, { useState } from "react";

import api from "../../../services/api";
import { getToken } from "../../../utils/Autentication";
import Template from "../../../components/Template";

const Novo = () => {
  const [livro, setLivro] = useState({
    titulo: "",
    autor: "",
    sinopse: "",
    editora: "",
    serie: "",
    volume: "",
    copia: 1,
    isbn: "",
    numero_paginas: 0,
    capa: null,
  });

  const [msg, setMsg] = useState([]);
  const [imgPreview, setImgPreview] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLivro((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let capa = e.target.files[0];
      setImgPreview(URL.createObjectURL(capa));

      setLivro((prevState) => ({ ...prevState, capa }));
    }
  };

  const submitBook = async (e) => {
    e.preventDefault();

    const data = new FormData();

    const {
      titulo,
      autor,
      sinopse,
      editora,
      serie,
      volume,
      copia,
      isbn,
      numero_paginas,
      capa,
    } = livro;

    try {
      data.append("titulo", titulo);
      data.append("autor", autor);
      data.append("sinopse", sinopse);
      data.append("editora", editora);
      data.append("serie", serie);
      data.append("volume", volume);
      data.append("copia", copia);
      data.append("isbn", isbn);
      data.append("numero_paginas", numero_paginas);
      data.append("capa", capa);

      await api.post("/livros", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setLivro({
        titulo: "",
        autor: "",
        sinopse: "",
        editora: "",
        serie: "",
        volume: "",
        copia: 1,
        isbn: "",
        numero_paginas: 0,
        capa: null,
      });

      setMsg(["success", "Livro adicionado com sucesso."]);
    } catch (error) {
      console.log({ error });
      setMsg(["danger", "Erro ao adicionado o livro."]);
    }

    setTimeout(() => setMsg([]), 5000);
  };

  return (
    <Template title="Novo Livro">
      <div className="card">
        <div className="card-body px-5">
          {msg[0] && (
            <div className={`alert alert-${msg[0]} text-center`} role="alert">
              {msg[1]}
            </div>
          )}

          <form encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Título"
                required
                name="titulo"
                value={livro.titulo}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="autor">Autor</label>
              <input
                type="text"
                className="form-control"
                id="autor"
                placeholder="Autor"
                required
                name="autor"
                value={livro.autor}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sinopse">Sinopse</label>
              <textarea
                className="form-control"
                id="sinopse"
                rows="3"
                required
                name="sinopse"
                value={livro.sinopse}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="editora">Editora</label>
              <input
                type="text"
                className="form-control"
                id="editora"
                placeholder="Editora"
                required
                name="editora"
                value={livro.editora}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="serie">Série</label>
              <input
                type="text"
                className="form-control"
                id="série"
                placeholder="Série"
                name="serie"
                value={livro.serie}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="volume">Volume</label>
              <input
                type="text"
                className="form-control"
                id="volume"
                placeholder="Volume"
                name="volume"
                value={livro.volume}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cópia">Cópia</label>
              <input
                type="number"
                className="form-control"
                id="cópia"
                placeholder="Cópia"
                name="copia"
                value={livro.copia}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                placeholder="ISBN"
                required
                name="isbn"
                value={livro.isbn}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="numero_paginas">Número de páginas</label>
              <input
                type="number"
                className="form-control"
                id="numero_paginas"
                placeholder="Número de páginas"
                required
                name="numero_paginas"
                value={livro.numero_paginas}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="capa">Capa</label>
              <input
                type="file"
                className="form-control-file"
                id="capa"
                required
                name="capa"
                onChange={handleImageChange}
              />

              {imgPreview && (
                <img
                  src={imgPreview}
                  className="rounded mx-auto d-block mt-3"
                  alt={livro.titulo}
                  style={{ height: 180 }}
                />
              )}
            </div>

            <div className="form-group text-center">
              <button
                className="btn btn-primary mt-5 btn-block"
                type="submit"
                onClick={submitBook}
              >
                Salvar livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default Novo;
