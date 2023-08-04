import React from 'react'
import styles from './CardRecipe.module.css'
import { NavLink } from 'react-router-dom'

const CardRecipe = (params) => {
    const {name,image,diets,id} = params
    console.log(id);
  return (
    <div className={styles.cardContainer} key={id}>
        <div className={styles.card}>
            <img src={image} alt="" className={styles.image}/>
            <NavLink to={`/Detail/${id}`}>
            <h2 className={styles.name}>{name}</h2>
            </NavLink>
            <span className={styles.diet}>{diets}</span>

        </div>
    </div>
  )
}

export default CardRecipe