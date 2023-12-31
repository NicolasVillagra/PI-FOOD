import React from 'react'
import { useState,useEffect } from 'react'
import styles from '../SearchBar/SearchBar.module.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateFormData } from '../../redux/actions'


const SearchBar = () => {
   const dispatch = useDispatch()
    const [name, setName] = useState('')
    const handleChange = (event) => {
        setName(event.target.value); // paso la data de los inputs
      };
    
      const handleSearch = () => {
        axios.get(`http://localhost:3001/recipes?name=${name}`) 
          .then(response => {
            const recipes = response.data
            dispatch(updateFormData(recipes)) // actualizo el estado global
          })
          .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
            
          });
      }

  return (
    <div className={styles.inputGroup}>
        <input  value={name}  onChange={handleChange}required="" type="search" name="text" autocomplete="off" />
        <button onClick={handleSearch} className={styles.buttonSearch}>
            <span className={styles.label}>Buscar</span>
         </button>
    </div>
  )
}

export default SearchBar