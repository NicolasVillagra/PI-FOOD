import React from 'react'
import styles from '../Landing/Landing.module.css'
import CardRecipe from '../Card/CardRecipe'
import CardsRecipe from '../CardsRecipe/CardsRecipe'


const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <div>
        <h1>NUESTRAS MEJORES RECETAS</h1>
      </div>
      <div>
      <CardsRecipe/>
      </div>
    </div>
  )
}

export default Landing