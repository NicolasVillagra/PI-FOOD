import React from 'react'
import styles from './Home.module.css'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className={styles.tuBody}>
      <div className={styles.hero}>
        <button className={styles.buttonHome}><NavLink to='/Home'>A COCINAR</NavLink></button>
      </div>
    </div>
  )
}

export default Home