import React from 'react'
import styles from './Nav.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className={styles.navContainer}>
        <NavLink to='/Home'><h1>Food</h1></NavLink>
        <ul className={styles.navItem}>
            <NavLink to='/Search'>Buscar tu receta</NavLink>
            <NavLink to='/Create'>Crea tu receta</NavLink>
        </ul>
        <SearchBar/>

    </nav>
  )
}

export default Nav