# 🪒 Barbearia MDC - Sistema de Agendamento

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://brunnobkr.github.io/BARBEARIA-MDC/)

Sistema web completo e moderno para agendamento de horários da Barbearia MDC, desenvolvido com React, TypeScript e Vite.

## ✨ Funcionalidades

- 🏠 **Página Inicial**: Apresentação da barbearia e dos barbeiros
- 📅 **Sistema de Agendamento**: Processo completo em 4 etapas
  - Seleção de barbeiro
  - Seleção de serviço
  - Escolha de data e horário
  - Preenchimento de dados do cliente
- 👨‍💼 **Páginas dos Barbeiros**: Perfil individual com serviços e horários disponíveis
- 🛍️ **Loja de Produtos**: Catálogo de produtos para cabelo, barba e tratamentos
- 📱 **Design Responsivo**: Otimizado para dispositivos móveis

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **React Router** - Roteamento para aplicações React
- **Vite** - Build tool moderna e rápida
- **CSS3** - Estilização moderna e responsiva

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/brunnobkr/BARBEARIA-MDC.git
cd BARBEARIA-MDC
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

**Nota:** Se a porta 3000 estiver ocupada, o Vite tentará automaticamente a próxima porta disponível.

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

Para visualizar o build localmente:
```bash
npm run preview
```

## 🌐 Deploy

O site está configurado para deploy automático no GitHub Pages através do GitHub Actions.

**URL do site:** https://brunnobkr.github.io/BARBEARIA-MDC/

### Como ativar o GitHub Pages:

1. Vá em **Settings** do repositório no GitHub
2. Role até a seção **Pages** no menu lateral
3. Em **Source**, selecione **GitHub Actions**
4. O deploy será feito automaticamente a cada push na branch `main`

## 📁 Estrutura do Projeto

```
BARBEARIA-MDC/
├── .github/
│   ├── workflows/          # GitHub Actions workflows
│   ├── CODE_OF_CONDUCT.md  # Código de conduta
│   └── CONTRIBUTING.md     # Guia de contribuição
├── public/
│   └── 404.html            # Página 404 para SPA
├── src/
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── data/               # Dados estáticos
│   ├── types/              # Definições TypeScript
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 👨‍💼 Barbeiros

- **Barbeiro Gabriel**: Especialista em cortes modernos e degradês
- **Barbeiro Siqueira**: Mestre em cortes tradicionais e cuidados masculinos
- **Barbeiro Davizin**: Especialista em cortes criativos e colorações

## 🎯 Serviços Disponíveis

- Corte Social
- Corte Degradê
- Barba
- Sobrancelha
- Pintura de Cabelo
- Luzes
- Descolorimento (Nevou)
- Limpeza de Pele

## 📝 Notas

- Os agendamentos são salvos no `localStorage` do navegador
- Em produção, recomenda-se integrar com um backend para persistência de dados
- O sistema de compra de produtos atualmente apenas exibe um alerta (integrar com sistema de pagamento em produção)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [Guia de Contribuição](.github/CONTRIBUTING.md) antes de submeter um Pull Request.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, abra uma [Issue](https://github.com/brunnobkr/BARBEARIA-MDC/issues) no GitHub.

## 🙏 Agradecimentos

Agradecemos a todos os contribuidores que ajudam a melhorar este projeto!

---

Desenvolvido com ❤️ por [brunnobkr](https://github.com/brunnobkr)
