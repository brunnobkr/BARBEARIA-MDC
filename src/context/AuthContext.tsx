import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { BarbeiroAuth, ClienteAuth, AuthContextType } from '../types/auth'
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
  const [cliente, setCliente] = useState<ClienteAuth | null>(null)

  useEffect(() => {
    // Verificar se há barbeiro logado
    const barbeiroSalvo = localStorage.getItem('barbeiroLogado')
    if (barbeiroSalvo) {
      setBarbeiro(JSON.parse(barbeiroSalvo))
    }

    // Verificar se há cliente logado
    const clienteSalvo = localStorage.getItem('clienteLogado')
    if (clienteSalvo) {
      setCliente(JSON.parse(clienteSalvo))
    }
  }, [])

  const loginBarbeiro = (email: string, senha: string): boolean => {
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

  const loginCliente = (email: string, senha: string): boolean => {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
    const clienteEncontrado = clientes.find(
      (c: ClienteAuth) => c.email === email && c.senha === senha
    )

    if (clienteEncontrado) {
      setCliente(clienteEncontrado)
      localStorage.setItem('clienteLogado', JSON.stringify(clienteEncontrado))
      return true
    }

    return false
  }

  const cadastrarCliente = (nome: string, email: string, senha: string, telefone: string): boolean => {
    // Verificar se email já existe
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
    const emailExiste = clientes.some((c: ClienteAuth) => c.email === email)

    if (emailExiste) {
      return false // Email já cadastrado
    }

    // Criar novo cliente
    const novoCliente: ClienteAuth = {
      id: Date.now().toString(),
      nome,
      email,
      senha,
      telefone,
      dataCadastro: new Date().toISOString()
    }

    // Salvar cliente
    clientes.push(novoCliente)
    localStorage.setItem('clientes', JSON.stringify(clientes))

    // Fazer login automaticamente
    setCliente(novoCliente)
    localStorage.setItem('clienteLogado', JSON.stringify(novoCliente))

    return true
  }

  const logout = () => {
    logoutBarbeiro()
    logoutCliente()
  }

  const logoutBarbeiro = () => {
    setBarbeiro(null)
    localStorage.removeItem('barbeiroLogado')
  }

  const logoutCliente = () => {
    setCliente(null)
    localStorage.removeItem('clienteLogado')
  }

  return (
    <AuthContext.Provider
      value={{
        barbeiro,
        cliente,
        loginBarbeiro,
        loginCliente,
        cadastrarCliente,
        logout,
        logoutBarbeiro,
        logoutCliente,
        isBarbeiroAuthenticated: !!barbeiro,
        isClienteAuthenticated: !!cliente
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
