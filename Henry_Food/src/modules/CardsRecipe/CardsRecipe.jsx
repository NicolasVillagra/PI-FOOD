import React, { useEffect } from 'react'
import axios from 'axios'
import CardRecipe from '../Card/CardRecipe'
import { useState } from 'react'
import styles from './CardsRecipe.module.css'

const CardsRecipe =  (props) => {
 const [cards, setCards] = useState([])
 useEffect(() => {
    axios.get('http://localhost:3001/recipes') // Reemplaza la URL con la API que estás utilizando
      .then(response => {
        setCards(response.data); // Asigna los datos de las cards a la variable 'cards'
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, [])

  return (
    <div className={styles.containerRecipe}>
        {cards.map((item)=>{
            return <CardRecipe
            key={item.id}
            image={item.image}
            name={item.name}
            diets={item.diets}
            />
        })}
    </div>
  )
}

export default CardsRecipe