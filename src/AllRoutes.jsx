import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Canvas from './Components/Canvas'
import Export from './Components/Export'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/canvas' element={<Canvas />} />
        <Route path='/export' element={<Export />} />
    </Routes>
  )
}

export default AllRoutes