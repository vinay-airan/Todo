import React from 'react'
import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup'
import { Toaster } from "react-hot-toast";


function App() {
  const [title, setTitle] = useState("");
  const [toggle,setToggle] = useState(0);

  return (
    <>
      <Toaster reverseOrder={false} />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </>
  )
}

export default App