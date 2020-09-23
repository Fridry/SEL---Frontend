import React from "react";

const Pagination = ({ page, pages, totalPages, setPage }) => {
  return (
    <div>
      <nav aria-label="Navegação de página exemplo">
        <ul className="pagination justify-content-center">
          {page !== 1 && (
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Anterior"
                onClick={() => setPage(1)}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Anterior</span>
              </button>
            </li>
          )}
          {pages.map((page, index) => (
            <li className="page-item" key={index}>
              <button className="page-link" onClick={() => setPage(page)}>
                {page}
              </button>
            </li>
          ))}
          {page !== totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setPage(totalPages)}
                aria-label="Próximo"
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Próximo</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
