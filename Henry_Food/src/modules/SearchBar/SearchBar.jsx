import React from 'react'
import { useState } from 'react'
import styles from '../SearchBar/SearchBar.module.css'

const SearchBar = ({ onSearch }) => {
    const [id, setId] = useState('')
    const handleChange = (event) => {
        setId(event.target.value);
      };
    
      const handleSearch = () => {
        onSearch(id);
      }

  return (
    <div className={styles.inputGroup}>
        <input  value={id}  onChange={handleChange}required="" type="search" name="text" autocomplete="off" />
        <button onClick={handleSearch} className={styles.buttonSearch}>
            <span className={styles.label}>Agregar</span>
         </button>
    </div>
  )
}

export default SearchBar