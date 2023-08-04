import React, { useEffect } from 'react'
import axios from 'axios'
import CardRecipe from '../Card/CardRecipe'
import { useState } from 'react'
import styles from './CardsRecipe.module.css'

const CardsRecipe =  (props) => {
 const [cards, setCards] = useState([])
 useEffect(() => {
    axios.get('http://localhost:3001/recipes') 
      .then(response => {
        setCards(response.data); 
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, [])
  console.log(cards.title);


  return (
    <div className={styles.containerRecipe}>
        {cards.map((item)=>{
            return <CardRecipe
            image={item.image}
            id={item.id}
            name={item.name}
            diets={item.diets}
            key = {item.id}
            />
        })}
    </div>
  )
}

export default CardsRecipe