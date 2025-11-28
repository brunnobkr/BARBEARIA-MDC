export interface BarbeiroAuth {
  id: string
  nome: string
  email: string
  senha: string
}

export interface AuthContextType {
  barbeiro: BarbeiroAuth | null
  login: (email: string, senha: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

