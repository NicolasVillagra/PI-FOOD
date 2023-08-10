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
        diets:[],
    }
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({})
    const handleChange = (event) => {
      const { name, value, type } = event.target;
    
      if (type === 'select-multiple') {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setFormData({ ...formData, [name]: selectedOptions });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    
      setErrors(validate({ ...formData, [name]: value }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:3001/recipes', {
          name: formData.name,
          summary: formData.summary,
          healthScore: formData.healthScore, // Asegúrate de que la propiedad sea healthCore o saludCore, como lo tengas definido
          stepByStep: formData.stepByStep,
          diets: formData.diets,
        });
        
        setFormData(initialState);
        dispatch(updateFormData(formData));
        setErrors({});
      } catch (error) {
        console.log({ errorMsg: 'no se pudo hacer la peticion', error });
      }
    };

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
            <select onChange={handleChange} name='diets'value={formData.diets} multiple={true}>
                <option value=""></option>
                <option value="gluten free">Gluten Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto ovo vegetarian">Lacto-Vegetarian</option>
                <option value="ovo vegetarian">Ovo-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescetarian">Pescetarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="fodmap friendly">Low FODMAP</option>
                <option value="whole 30">Whole30</option>
                <option value="dairy free">Dairy free</option>
            </select>
            <p className={styles.error}>{errors.diets}</p>
            <button>Crear</button>
        </form>
    </div>
  )
}

export default PostRecipe