import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './Detail.module.css'


const Detail = () => {
const [recipe, setRecipe] = useState({})
const params =useParams()
const {id} = params
useEffect(() => {
    axios(`http://localhost:3001/recipes/${id}`)
      .then((response) => {
        if (response.data) {
          setRecipe(response.data);
          console.log(response.data.recipe);
        } else {
          window.alert("No hay receta con ese id");
        }
      })
      .catch((err) => window.alert(err));

    return () => {
      console.log("Me desmonto, adios!");
    };
  }, [id])
  console.log(recipe);
  return (
    <div className={styles.recipeContainer}>
        <div className={styles.dataContainer}>
            {recipe.name &&<h1>{recipe.name}</h1>}
            {recipe.image&&<img className={styles.image} src={recipe.image} alt="" />}
            <div className={styles.stepContainer}>
              <div className={styles.textHeader}>
              <h2>Preparacion</h2>
              </div>
                {recipe.summary&&<h3>{recipe.summary}</h3>}
                <div className={styles.textHeader}>
                <h2>Paso a Paso</h2>
                </div>
                {recipe.stepByStep&&<h3>{recipe.stepByStep}</h3>}
            </div>
            <div className={styles.dietsContainer}>
              <div className={styles.textHeader}>
                <h2>Dieta</h2>
                </div>
                {recipe.diets&&<h4>{recipe.diets}</h4>}
                <div className={styles.textHeader}>
                <h2>HealthScore:</h2>
                {recipe.healthScore&&<h4>{recipe.healthScore}</h4>}
          
                </div>
                <div className={styles.textHeader}>
                <h2>Id:</h2>
                {recipe.id&&<h4>{recipe.id}</h4>}
                </div>

            </div>
        </div>
        </div>
  )
}

export default Detail