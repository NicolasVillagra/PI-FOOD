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
  } //OBTENGO EL NUMERO DE PAGINA Y LA PASO DE DECIMAL A ENTERO
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
  const onSpecifPage = (n) => { // si quiero ir a una pagina especifica lo seteo en estado local
    setcurrentPage(n);
  };
  return (
    <div>
      <nav className={styles.paginationContainer}>
        <a
          onClick={onPreviusPage}
          //SI LA PAG ES 1 DESHABILITAS
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
                //SI EL NUM DE PAGINA ES IGUAL AL ESTADO CURRENT SI COLOREA
                style={{ color: currentPage === pagNum ? '#ff0000' : '#ffffff' }}
                className={`${styles.numberPage} ${currentPage === pagNum ? 'active' : ''}`}
              >
                {pagNum}
              </a>
            </li>
          ))}
        </ul>
        <a onClick={onNextPage}
        //SI EL CURRENT PAGE ES IGUAL A LA LONGITUD MAXIMA SE DESHABILITA
    className={`${styles.arrow} ${currentPage === pageNumber.length ? styles.isDisabled : ""}`}
    disabled={currentPage === pageNumber.length}>
          Next page
        </a>
      </nav>
    </div>
  );
};

export default Pagination;
