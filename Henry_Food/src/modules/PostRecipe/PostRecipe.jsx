import React from 'react'
import styles from './PostRecipe.module.css'
import { useState } from 'react'
import { validate } from './validation'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { updateFormData } from '../../redux/actions'


const PostRecipe = () => {
  const globalData = useSelector(state => state.Post)
  const dispatch = useDispatch()
    const initialState ={
        name:'',
        summary:'',
        healthScore:0,
        stepByStep:'',
        image:'',
        diets:''
    }
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({})
      const handleChange = (event) =>{
    setErrors(validate({...formData,[event.target.name]:event.target.value}))
    setFormData({...formData,[event.target.name]:event.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
        await axios.post('http://localhost:3001/recipes', formData)
        setFormData(initialState)
        dispatch(updateFormData(formData))
        setErrors(errors)  
    } catch (error) {
       console.log({error:"no se pudo hacer la peticion", error}); 
    }
  }

  return (
    <div>
        <h1>Crea tu propia receta</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer} action="">
            <h2>Receta</h2>
            <label htmlFor="">Nombre de la receta</label>
            <input onChange={handleChange} type="text" name='name' value={formData.name} />
            <p className={styles.error}>{errors.name}</p>

            <label htmlFor="">Resume del plato</label>
            <input onChange={handleChange} className={styles.summary} type="text" name='summary' value={formData.summary} />
            <p className={styles.error}>{errors.summary}</p>

            <label htmlFor="">Nivel De Comida Saludable</label>
            <input onChange={handleChange} type="number" name='healthScore' value={formData.healthScore} />
            <p className={styles.error}>{errors.healthScore}</p>

            <label htmlFor="">Paso a Paso</label>
            <input className={styles.summary} onChange={handleChange} type="text" name='stepByStep' value={formData.stepByStep} />
            <p className={styles.error}>{errors.stepByStep}</p>

            <label htmlFor="">imagen</label>
            <input onChange={handleChange} type="text" name='image' value={formData.image} />
            <p className={styles.error}>{errors.image}</p>

            <label htmlFor="">Seleccion tu dieta</label>
            <select onChange={handleChange} name='diets'value={formData.diets}>
                <option value=""></option>
                <option value="gluten Free">gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
                <option value="Primal">Primal</option>
                <option value="Low FODMAP">Low FODMAP</option>
                <option value="Whole30">Whole30</option>
            </select>
            <p className={styles.error}>{errors.diets}</p>
            <button>Crear</button>
        </form>
    </div>
  )
}

export default PostRecipe