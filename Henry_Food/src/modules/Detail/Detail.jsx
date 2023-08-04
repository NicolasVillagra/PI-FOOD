import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './Detail.module.css'


const Detail = () => {
const [recipe, setRecipe] = useState([])
const params =useParams()
const {id} = params
useEffect(() => {
    axios(`http://localhost:3001/recipes/${id}`)
      .then((response) => {
        if (response.data) {
          setRecipe(response.data.recipe);
          console.log(response.data.recipe);
        } else {
          window.alert("No hay receta con ese id");
        }
      })
      .catch((err) => window.alert(err));

    return () => {
      console.log("Me desmonto, adios!");
    };
  }, [])
  console.log(recipe);
  return (
    <div style={{backgroundImage: `url(${recipe.image})`}} className={styles.recipeContainer}>
        <div className={styles.dataContainer}>
            {recipe.name &&<h1>{recipe.name}</h1>}
            <div className={styles.stepContainer}>
                {recipe.summary&&<h3>{recipe.summary}</h3>}
                {recipe.stepByStep&&<h3>{recipe.stepByStep}</h3>}
            </div>
            <div className={styles.dietsContainer}>
                {recipe.diets&&<h4>{recipe.diets}</h4>}
                {recipe.healthScore&&<h4>{recipe.healthScore}</h4>}
            </div>
        </div>
        </div>
  )
}

export default Detail