import React, { useEffect } from 'react'
import axios from 'axios'
import CardRecipe from '../Card/CardRecipe'
import { useState } from 'react'
import styles from './CardsRecipe.module.css'
import Pagination from '../Pagination/Pagination'

const CardsRecipe =  (props) => {
 const [cards, setCards] = useState([]) //donde guardamos las cards
 const [cardsPerPage, setCardsPerPage] = useState(9) //las cantidades de cards que se tienen que renderizar
 const [currentPage, setcurrentPage] = useState(1) // el index inicial
 const totalRecipe = cards.length
 const lastIndex = currentPage * cardsPerPage
  const firstIndex = lastIndex - cardsPerPage
 useEffect(() => {
    axios.get('http://localhost:3001/recipes') 
      .then(response => {
        const recipes = response.data
        setCards(recipes); 
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, [])



  return (
    <div>
    <div className={styles.containerRecipe}>
        {cards.slice(firstIndex,lastIndex).map((item)=>{
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
      totalRecipe={totalRecipe}/>
    </div>
  )
}

export default CardsRecipe