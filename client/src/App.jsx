import { useState } from 'react'
import './App.css'
import { Route , useLocation } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './modules/Home/Home'
import Nav from './modules/Nav/Nav'
import Landing from './modules/Landing/Landing'
import Detail from './modules/Detail/Detail'
import PostRecipe from './modules/PostRecipe/PostRecipe'

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/'; // para que no se muestran las nav

  return (
    <div className='App'>
      {!isHome && <Nav />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Landing/>}/>
        <Route path='/Detail/:id' element={<Detail/>}/>
        <Route path='/Create' element={<PostRecipe/>}/>
      </Routes>
    </div>
  )
}

export default App
