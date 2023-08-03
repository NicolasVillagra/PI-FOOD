import { useState } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './modules/Home/Home'
import Nav from './modules/Nav/Nav'
import Landing from './modules/Landing/Landing'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className='App'>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Landing/>}/>
      </Routes>
    </div>
  )
}

export default App
