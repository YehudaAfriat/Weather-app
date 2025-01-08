/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import Home from './components/Home';

/* good weather app */
export default function App() {
  

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}
