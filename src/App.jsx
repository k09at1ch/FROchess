
import './App.css'
import Home from './components/home/home.jsx'
import Play from './components/play/play.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
