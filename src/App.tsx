import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Agendamento from './pages/Agendamento'
import Barbeiro from './pages/Barbeiro'
import Produtos from './pages/Produtos'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/barbeiro/:id" element={<Barbeiro />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

