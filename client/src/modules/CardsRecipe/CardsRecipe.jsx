import React, { useEffect } from 'react'
import CardRecipe from '../Card/CardRecipe'
import styles from './CardsRecipe.module.css'
import Pagination from '../Pagination/Pagination'
import { useRecipesData } from '../utils/hooks'
import { filterToAz, filterToZa } from '../../redux/actions'
import { useDispatch } from 'react-redux'

const CardsRecipe =  () => {
  const {
    firstIndex,
    dietsFilter,
    cardsPerPage,
    currentPage,
    filteredCards,
    totalRecipeFilter,
    fetchData,
    handleChange,
    filterToDb,
    filterToApi,
    setcurrentPage,
    lastIndex
  } = useRecipesData();

  const dispatch = useDispatch()

  const handleAtoZ = ()=>{
    dispatch(filterToAz())
  }
  const handleZtoA = ()=>{
    dispatch(filterToZa())
  }
  


useEffect(() => {
  fetchData();
}, []);

 



  return (
    <div>
      <div className={styles.selector}>
        <div className={styles.buttonContainer}>
        <button data-testid="mi-componente" className={styles.button} onClick={handleAtoZ}>Ordenar de A-Z</button>
        <button className={styles.button} onClick={handleZtoA}>Ordenar de Z-A</button>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={filterToDb} >DataBase</button>
          <button className={styles.button} onClick={filterToApi} >API</button>
        </div>
      </div>
      <div>
        <label htmlFor='dietsSelect'>filtrar por tipo de dieta</label>
      <select id='dietsSelect' onChange={handleChange} name='diets'value={dietsFilter}>
                <option value="">Todas</option>
                <option value="gluten Free">Gluten Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="lacto ovo vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="Primal">Primal</option>
                <option value="Fodmap Friendly">Low FODMAP</option>
                <option value="Whole 30">Whole30</option>
                <option value="dairy free">Dairy free</option>
            </select>
      </div>
    <div className={styles.containerRecipe}>
        {filteredCards.slice(firstIndex,lastIndex).map((item)=>{
            return <CardRecipe
            image={item.image}
            id={item.id}
            name={item.name}
            diets={item.diets}
            key = {item.id}
            />
        })}
    </div>
    <Pagination cardsPerPage={cardsPerPage}
     currentPage={currentPage}
     setcurrentPage={setcurrentPage}
      totalRecipe={totalRecipeFilter}/>
    </div>
  )
}

export default CardsRecipe