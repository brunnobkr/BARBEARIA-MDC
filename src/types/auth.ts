export interface BarbeiroAuth {
  id: string
  nome: string
  email: string
  senha: string
}

export interface ClienteAuth {
  id: string
  nome: string
  email: string
  senha: string
  telefone: string
  dataCadastro: string
}

export interface AuthContextType {
  barbeiro: BarbeiroAuth | null
  cliente: ClienteAuth | null
  loginBarbeiro: (email: string, senha: string) => boolean
  loginCliente: (email: string, senha: string) => boolean
  cadastrarCliente: (nome: string, email: string, senha: string, telefone: string) => boolean
  logout: () => void
  logoutBarbeiro: () => void
  logoutCliente: () => void
  isBarbeiroAuthenticated: boolean
  isClienteAuthenticated: boolean
}
