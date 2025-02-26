import { useState } from 'react'
import './App.css'
import Home from './Home'
import { Routes, Route } from 'react-router-dom'
import Create from './Create'
import Update from './Update'
import NoMatch from './NoMatch '
import Read from './Read'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App
