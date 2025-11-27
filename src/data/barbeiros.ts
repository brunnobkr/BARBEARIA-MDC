import { Barbeiro } from '../types'

export const barbeiros: Barbeiro[] = [
  {
    id: 'gabriel',
    nome: 'Barbeiro Gabriel',
    descricao: 'Especialista em cortes modernos e degradês. Mais de 5 anos de experiência.',
    horariosDisponiveis: [
      {
        dia: 'Segunda-feira',
        horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Terça-feira',
        horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Quarta-feira',
        horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Quinta-feira',
        horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Sexta-feira',
        horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Sábado',
        horarios: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
      }
    ],
    servicos: [
      {
        id: 'corte-social',
        nome: 'Corte Social',
        descricao: 'Corte clássico e elegante',
        duracao: 30,
        preco: 25.00
      },
      {
        id: 'corte-degrade',
        nome: 'Corte Degradê',
        descricao: 'Degradê moderno e estiloso',
        duracao: 40,
        preco: 30.00
      },
      {
        id: 'barba',
        nome: 'Barba',
        descricao: 'Aparar e modelar barba',
        duracao: 20,
        preco: 15.00
      },
      {
        id: 'sobrancelha',
        nome: 'Sobrancelha',
        descricao: 'Design e modelagem de sobrancelhas',
        duracao: 15,
        preco: 10.00
      },
      {
        id: 'pintura-cabelo',
        nome: 'Pintura de Cabelo',
        descricao: 'Coloração completa do cabelo',
        duracao: 90,
        preco: 80.00
      },
      {
        id: 'luzes',
        nome: 'Luzes',
        descricao: 'Aplicação de luzes no cabelo',
        duracao: 120,
        preco: 100.00
      },
      {
        id: 'nevou',
        nome: 'Descolorimento (Nevou)',
        descricao: 'Descolorimento completo do cabelo',
        duracao: 120,
        preco: 120.00
      },
      {
        id: 'limpeza-pele',
        nome: 'Limpeza de Pele',
        descricao: 'Limpeza facial profunda',
        duracao: 45,
        preco: 50.00
      }
    ]
  },
  {
    id: 'siqueira',
    nome: 'Barbeiro Siqueira',
    descricao: 'Mestre em cortes tradicionais e modernos. Especialista em barba e cuidados masculinos.',
    horariosDisponiveis: [
      {
        dia: 'Segunda-feira',
        horarios: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00']
      },
      {
        dia: 'Terça-feira',
        horarios: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00']
      },
      {
        dia: 'Quarta-feira',
        horarios: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00']
      },
      {
        dia: 'Quinta-feira',
        horarios: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00']
      },
      {
        dia: 'Sexta-feira',
        horarios: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Sábado',
        horarios: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
      }
    ],
    servicos: [
      {
        id: 'corte-social',
        nome: 'Corte Social',
        descricao: 'Corte clássico e elegante',
        duracao: 30,
        preco: 25.00
      },
      {
        id: 'corte-degrade',
        nome: 'Corte Degradê',
        descricao: 'Degradê moderno e estiloso',
        duracao: 40,
        preco: 30.00
      },
      {
        id: 'barba',
        nome: 'Barba',
        descricao: 'Aparar e modelar barba',
        duracao: 20,
        preco: 15.00
      },
      {
        id: 'sobrancelha',
        nome: 'Sobrancelha',
        descricao: 'Design e modelagem de sobrancelhas',
        duracao: 15,
        preco: 10.00
      },
      {
        id: 'pintura-cabelo',
        nome: 'Pintura de Cabelo',
        descricao: 'Coloração completa do cabelo',
        duracao: 90,
        preco: 80.00
      },
      {
        id: 'limpeza-pele',
        nome: 'Limpeza de Pele',
        descricao: 'Limpeza facial profunda',
        duracao: 45,
        preco: 50.00
      }
    ]
  },
  {
    id: 'davizin',
    nome: 'Barbeiro Davizin',
    descricao: 'Especialista em cortes criativos e colorações. Transformando visual com estilo único.',
    horariosDisponiveis: [
      {
        dia: 'Segunda-feira',
        horarios: ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Terça-feira',
        horarios: ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Quarta-feira',
        horarios: ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Quinta-feira',
        horarios: ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Sexta-feira',
        horarios: ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      },
      {
        dia: 'Sábado',
        horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
      }
    ],
    servicos: [
      {
        id: 'corte-social',
        nome: 'Corte Social',
        descricao: 'Corte clássico e elegante',
        duracao: 30,
        preco: 25.00
      },
      {
        id: 'corte-degrade',
        nome: 'Corte Degradê',
        descricao: 'Degradê moderno e estiloso',
        duracao: 40,
        preco: 30.00
      },
      {
        id: 'barba',
        nome: 'Barba',
        descricao: 'Aparar e modelar barba',
        duracao: 20,
        preco: 15.00
      },
      {
        id: 'sobrancelha',
        nome: 'Sobrancelha',
        descricao: 'Design e modelagem de sobrancelhas',
        duracao: 15,
        preco: 10.00
      },
      {
        id: 'pintura-cabelo',
        nome: 'Pintura de Cabelo',
        descricao: 'Coloração completa do cabelo',
        duracao: 90,
        preco: 80.00
      },
      {
        id: 'luzes',
        nome: 'Luzes',
        descricao: 'Aplicação de luzes no cabelo',
        duracao: 120,
        preco: 100.00
      },
      {
        id: 'nevou',
        nome: 'Descolorimento (Nevou)',
        descricao: 'Descolorimento completo do cabelo',
        duracao: 120,
        preco: 120.00
      },
      {
        id: 'limpeza-pele',
        nome: 'Limpeza de Pele',
        descricao: 'Limpeza facial profunda',
        duracao: 45,
        preco: 50.00
      }
    ]
  }
]

