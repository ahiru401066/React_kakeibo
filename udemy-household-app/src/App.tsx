import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';

function App() {

  return (
    <>
        <h1>hello React!</h1>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/report" element={<Report />}/>
            <Route path="/*" element={<NoMatch />}/>
          </Routes>
        </Router>
    </>
  )
}

export default App
