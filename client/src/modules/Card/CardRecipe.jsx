import React from 'react'
import styles from './CardRecipe.module.css'
import { NavLink } from 'react-router-dom'

const renderDiets = (diets) => { // si las dietas son un array de objetos las renderizamos
  if (Array.isArray(diets)) {
    return diets.map((diet, index) => (
      <span key={index} className={styles.diet}> 
        {typeof diet === 'string' ? diet : diet.name}
      </span>
    )); // si el contenido del array es un string lo devolvemos , si es es un objeto entramos en el
  }
  return <span className={styles.diet}>{diets}</span>;
};


const CardRecipe = (params) => {
    const {name,image,diets,id} = params
  return (
    <div className={styles.cardContainer} key={id}>
        <div className={styles.card}>
            <img src={image} alt="" className={styles.image}/>
            <NavLink to={`/Detail/${id}`}>
            <h2 className={styles.name}>{name}</h2>
            </NavLink>
            <div>{renderDiets(diets)}</div>

        </div>
    </div>
  )
}

export default CardRecipe