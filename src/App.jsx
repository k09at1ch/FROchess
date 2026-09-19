import './App.css'
import Home from './components/home/home.jsx'
import Play from './components/play/play.jsx'
import { HashRouter as Router, Routes, Route } from 'react-router-dom' 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </Router>
  )
}

export default App
