import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

// Login específico para barbeiros

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginBarbeiro } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    
    // Validação básica
    if (!email.trim()) {
      setErro('Por favor, informe o email')
      return
    }

    if (!senha.trim()) {
      setErro('Por favor, informe a senha')
      return
    }

    setLoading(true)

    // Simular delay para melhor UX
    setTimeout(() => {
      const sucesso = loginBarbeiro(email.trim(), senha.trim())

      if (sucesso) {
        navigate('/dashboard')
      } else {
        setErro('Email ou senha incorretos. Verifique suas credenciais.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🪒 Barbearia MDC</h1>
          <p>Área do Barbeiro</p>
          <p className="login-subtitle">Acesso restrito aos barbeiros</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {erro && (
            <div className="login-error">
              {erro}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-login"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-info">
          <p className="info-text">
            Acesso restrito aos barbeiros da Barbearia MDC
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

