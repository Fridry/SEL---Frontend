import React from "react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";

import imgError from "../../assets/img/error-404-monochrome.svg";

const NotFound = () => {
  return (
    <div id="layoutError">
      <div id="layoutError_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center mt-4">
                  <img className="mb-4 img-error" src={imgError} alt="Error" />
                  <p className="lead">Página não encontrada</p>
                  <Link to="/">
                    <i className="fas fa-arrow-left mr-1"></i>
                    Retornar para a página inicial
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutError_footer">
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
