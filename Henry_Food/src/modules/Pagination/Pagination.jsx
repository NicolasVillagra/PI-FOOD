import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({
  cardsPerPage,
  currentPage,
  setcurrentPage,
  totalRecipe,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalRecipe / cardsPerPage); i++) {
    pageNumber.push(i);
  }
  const onPreviusPage = () => {
    if(currentPage > 1){
      setcurrentPage(currentPage - 1);
    }

  };
  const onNextPage = () => {
    if (currentPage < pageNumber.length) { //condicional para que no rompa 
      setcurrentPage(currentPage + 1);
    }
  };
  const onSpecifPage = (n) => {
    setcurrentPage(n);
  };
  return (
    <div>
      <nav className={styles.paginationContainer}>
        <a
          onClick={onPreviusPage}
          className={`${styles.arrow} ${currentPage === 1 ? styles.isDisabled : ""}`}
          disabled={currentPage === 1}
        >
          Previous
        </a>
        <ul className={styles.numberContainer}>
          {pageNumber.map((pagNum) => (
            <li className={styles.number} key={pagNum}>
              <a
                onClick={() => onSpecifPage(pagNum)}
                style={{ color: currentPage === pagNum ? '#ff0000' : '#ffffff' }}
                className={`${styles.numberPage} ${currentPage === pagNum ? 'active' : ''}`}
              >
                {pagNum}
              </a>
            </li>
          ))}
        </ul>
        <a onClick={onNextPage}
    className={`${styles.arrow} ${currentPage === pageNumber.length ? styles.isDisabled : ""}`}
    disabled={currentPage === pageNumber.length}>
          Next page
        </a>
      </nav>
    </div>
  );
};

export default Pagination;
