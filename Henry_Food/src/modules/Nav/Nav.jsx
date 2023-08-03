import React from 'react'
import styles from './Nav.module.css'
import SearchBar from '../SearchBar/SearchBar'

const Nav = () => {
  return (
    <nav className={styles.navContainer}>
        <h1>food</h1>
        <ul>
            <li>Busca tu dieta</li>
        </ul>
        <SearchBar/>

    </nav>
  )
}

export default Nav