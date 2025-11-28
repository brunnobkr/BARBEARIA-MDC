export interface Barbeiro {
  id: string
  nome: string
  descricao: string
  horariosDisponiveis: HorarioDisponivel[]
  servicos: Servico[]
}

export interface HorarioDisponivel {
  dia: string
  horarios: string[]
}

export interface Servico {
  id: string
  nome: string
  descricao: string
  duracao: number
  preco: number
}

export interface Agendamento {
  id: string
  barbeiroId: string
  servicoId: string
  data: string
  horario: string
  clienteNome: string
  clienteTelefone: string
  clienteEmail?: string
  observacoes?: string
}

export interface Produto {
  id: string
  nome: string
  descricao: string
  preco: number
  categoria: 'cabelo' | 'barba' | 'tratamento'
  estoque: number
}
