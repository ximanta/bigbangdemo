import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Page navigation">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="button button--secondary pagination__button"
            aria-label="Previous page"
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} className="pagination__item">
            <button
              onClick={() => onPageChange(page)}
              className={`button pagination__button ${currentPage === page ? 'button--primary' : 'button--secondary'}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
        <li className="pagination__item">
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="button button--secondary pagination__button"
            aria-label="Next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
