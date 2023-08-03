import React from 'react'
import styles from './CardRecipe.module.css'

const CardRecipe = (params) => {
    const {name,image,diets} = params
  return (
    <div className={styles.cardContainer}>
        <div className={styles.card}>
            <img src={image} alt="" className={styles.image}/>
            <h2 className={styles.name}>{name}</h2>
            <span className={styles.diet}>{diets}</span>

        </div>
    </div>
  )
}

export default CardRecipe