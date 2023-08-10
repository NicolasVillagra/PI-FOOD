import React, { useEffect } from 'react'
import axios from 'axios'
import CardRecipe from '../Card/CardRecipe'
import { useState } from 'react'
import styles from './CardsRecipe.module.css'
import Pagination from '../Pagination/Pagination'
import { useSelector } from 'react-redux'

const CardsRecipe =  (props) => {
 const recipeDb = useSelector(state => state.Post)
 const [cards, setCards] = useState([]) // donde guardamos las cards para su filtrado
 const [originalState, setOriginalState] = useState([]) // guardamos el estado origianl
 const [orderedCards, setOrderedCards] = useState([]); // Guardamos la lista ordenada
 const [dietsFilter, setDietsFilter] = useState("") // donde guardamos las dietas
 const [cardsPerPage, setCardsPerPage] = useState(9) //las cantidades de cards que se tienen que renderizar
 const [currentPage, setcurrentPage] = useState(1) // el index inicial
 const lastIndex = currentPage * cardsPerPage
  const firstIndex = lastIndex - cardsPerPage
 useEffect(() => {
    axios.get('http://localhost:3001/recipes') 
      .then(response => {
        const recipes = response.data
        setCards(recipes);
        setOriginalState(recipes)
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, [])
  const orderArrayAtoZ = ()=>{
    const arrayAtoZ = [...filteredCards].sort((a,b)=>a.name.localeCompare(b.name))
    setOrderedCards(arrayAtoZ)
   
    
  }
    const orderArrayZtoA = ()=>{
    const arrayZtoA = [...filteredCards].sort((a,b)=>b.name.localeCompare(a.name))
    setOrderedCards(arrayZtoA)

    
  }
  const handleChange = (event)=>{
    setDietsFilter(event.target.value.toLowerCase())
  }
  const filteredCards = dietsFilter
  ? cards.filter(recipe =>
      recipe.diets.some(diet => {
        if (typeof diet === 'string') {
          return diet.toLowerCase().includes(dietsFilter);
        } else if (typeof diet === 'object' && diet.name) {
          return diet.name.toLowerCase().includes(dietsFilter);
        }
        return false; // Otros tipos no son considerados en el filtro
      })
    )
  : cards;

  const totalRecipeFilter = filteredCards.length //muestra la cantidad de paginas
  const filterToDb =()=>{
    const filter = originalState.filter((e)=>typeof e.id === 'string')
    setCards(filter)
  }
  const filterToApi = ()=>{
    const filter = originalState.filter(e => typeof e.id !== 'string')
    setCards(filter)
  }
   useEffect(() => {
        setCards(orderedCards);
    }, [orderedCards]);

console.log(cards)

  return (
    <div>
      <div className={styles.selector}>
        <div>
        <button className={styles.button} onClick={orderArrayAtoZ}>Ordenar de A-Z</button>
        <button className={styles.button} onClick={orderArrayZtoA}>Ordernar de Z-A</button>
        </div>
        <div>
          <button onClick={filterToDb} >DataBase</button>
          <button onClick={filterToApi} >API</button>
        </div>
      </div>
      <div>
        <label>filtrar por tipo de dieta</label>
      <select onChange={handleChange} name='diets'value={dietsFilter}>
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