import React from 'react'
import styles from './Pagination.module.css'

const Pagination = ({cardsPerPage,currentPage,setcurrentPage,totalRecipe}) => {
    const pageNumber =[]
     for (let i = 1 ; i<= Math.ceil(totalRecipe / cardsPerPage); i++){
        pageNumber.push(i)

    }
    const onPreviusPage =()=>{
        setcurrentPage(currentPage-1)
    }
    const onNextPage =()=>{
        setcurrentPage(currentPage+1)
    }
    const onSpecifPage = (n)=>{
        setcurrentPage(n)
    }
  return (
    <div>
 <nav className={styles.paginationContainer}>
  <a onClick={onPreviusPage} className={`${styles.arrow} ${currentPage === 1 ? 'styles.isDisabled':''}`}>Previous</a>
  <ul className={styles.numberContainer}>
    {pageNumber.map(pagNum =>(
            <li className={styles.number} key={pagNum}>
                <a onClick={()=> onSpecifPage(pagNum)} className={styles.numberPage}>{pagNum}</a>
                </li>
    ))}
  </ul>
  <a onClick={onNextPage} className={styles.arrow}>Next page</a>
</nav>
    </div>
  )
}

export default Pagination