import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Agendamento from './pages/Agendamento'
import Barbeiro from './pages/Barbeiro'
import Produtos from './pages/Produtos'
import Login from './pages/Login'
import LoginCliente from './pages/LoginCliente'
import Cadastro from './pages/Cadastro'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rotas sem navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/login-cliente" element={<LoginCliente />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Rotas com navbar */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/agendamento" element={<Agendamento />} />
                    <Route path="/barbeiro/:id" element={<Barbeiro />} />
                    <Route path="/produtos" element={<Produtos />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
