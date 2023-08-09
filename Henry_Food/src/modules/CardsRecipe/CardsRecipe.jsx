import React, { useEffect } from 'react'
import axios from 'axios'
import CardRecipe from '../Card/CardRecipe'
import { useState } from 'react'
import styles from './CardsRecipe.module.css'
import Pagination from '../Pagination/Pagination'
import { useSelector } from 'react-redux'

const CardsRecipe =  (props) => {
 const recipeDb = useSelector(state => state.Post)
 const [cards, setCards] = useState([]) //donde guardamos las cards
 const [dietsFilter, setDietsFilter] = useState("") // donde guardamos las dietas
 const [cardsPerPage, setCardsPerPage] = useState(9) //las cantidades de cards que se tienen que renderizar
 const [currentPage, setcurrentPage] = useState(1) // el index inicial
 const lastIndex = currentPage * cardsPerPage
  const firstIndex = lastIndex - cardsPerPage
 useEffect(() => {
    axios.get('http://localhost:3001/recipes') 
      .then(response => {
        const recipes = response.data
        const DbAndApi = [...recipes,...recipeDb]
        setCards(DbAndApi);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, [])
  const orderArrayAtoZ = ()=>{
    const arrayAtoZ = filteredCards.sort((a,b)=>a.name.localeCompare(b.name))
    setCards(arrayAtoZ)
   
    
  }
    const orderArrayZtoA = ()=>{
    const arrayZtoA = filteredCards.sort((a,b)=>b.name.localeCompare(a.name))
    setCards(arrayZtoA)

    
  }
  const handleChange = (event)=>{
    setDietsFilter(event.target.value.toLowerCase())
  }
  const filteredCards = dietsFilter // si existe algun valor en el estado diets
  ? cards.filter(recipe => recipe.diets.includes(dietsFilter))
  : cards;
  const totalRecipeFilter = filteredCards.length //muestra la cantidad de paginas



  //ARREGLAR FILTRO , LAS DIETAS ESTAN MAL BRO




  return (
    <div>
      <div className={styles.selector}>
        <div>
        <button className={styles.button} onClick={orderArrayAtoZ}>Ordenar de A-Z</button>
        <button className={styles.button} onClick={orderArrayZtoA}>Ordernar de Z-A</button>
        </div>
        <div>
          <button >DataBase</button>
          <button >API</button>
        </div>
      </div>
      <div>
        <label>filtrar por tipo de dieta</label>
      <select onChange={handleChange} name='diets'value={dietsFilter}>
                <option value="">Todas</option>
                <option value="gluten Free">gluten Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
                <option value="Primal">Primal</option>
                <option value="Low FODMAP">Low FODMAP</option>
                <option value="Whole30">Whole30</option>
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