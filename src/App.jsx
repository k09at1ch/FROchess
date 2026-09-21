import './App.css'
import Home from './components/home/home.jsx'
import Play from './components/play/play.jsx'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </HashRouter>
  )
}

export default App