import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { BarbeiroAuth, AuthContextType } from '../types/auth'
import { barbeirosAuth } from '../data/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [barbeiro, setBarbeiro] = useState<BarbeiroAuth | null>(null)

  useEffect(() => {
    // Verificar se há barbeiro logado no localStorage
    const barbeiroSalvo = localStorage.getItem('barbeiroLogado')
    if (barbeiroSalvo) {
      setBarbeiro(JSON.parse(barbeiroSalvo))
    }
  }, [])

  const login = (email: string, senha: string): boolean => {
    const barbeiroEncontrado = barbeirosAuth.find(
      b => b.email === email && b.senha === senha
    )

    if (barbeiroEncontrado) {
      setBarbeiro(barbeiroEncontrado)
      localStorage.setItem('barbeiroLogado', JSON.stringify(barbeiroEncontrado))
      return true
    }

    return false
  }

  const logout = () => {
    setBarbeiro(null)
    localStorage.removeItem('barbeiroLogado')
  }

  return (
    <AuthContext.Provider
      value={{
        barbeiro,
        login,
        logout,
        isAuthenticated: !!barbeiro
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

