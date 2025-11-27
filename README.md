# Barbearia MDC - Sistema de Agendamento

Sistema web completo para agendamento de horários da Barbearia MDC.

## Funcionalidades

- 🏠 **Página Inicial**: Apresentação da barbearia e dos barbeiros
- 📅 **Sistema de Agendamento**: Processo completo em 4 etapas
  - Seleção de barbeiro
  - Seleção de serviço
  - Escolha de data e horário
  - Preenchimento de dados do cliente
- 👨‍💼 **Páginas dos Barbeiros**: Perfil individual com serviços e horários disponíveis
- 🛍️ **Loja de Produtos**: Catálogo de produtos para cabelo, barba e tratamentos

## Barbeiros

- **Barbeiro Gabriel**: Especialista em cortes modernos e degradês
- **Barbeiro Siqueira**: Mestre em cortes tradicionais e cuidados masculinos
- **Barbeiro Davizin**: Especialista em cortes criativos e colorações

## Serviços Disponíveis

- Corte Social
- Corte Degradê
- Barba
- Sobrancelha
- Pintura de Cabelo
- Luzes
- Descolorimento (Nevou)
- Limpeza de Pele

## Tecnologias

- React 18
- TypeScript
- React Router
- Vite
- CSS3

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```
http://localhost:3000
```

**Nota:** Se a porta 3000 estiver ocupada, o Vite tentará automaticamente a próxima porta disponível. A porta exata será exibida no terminal após executar `npm run dev`.

## Build para Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist`.

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── data/          # Dados estáticos (barbeiros, produtos)
  ├── types/         # Definições TypeScript
  └── App.tsx        # Componente principal
```

## Deploy no GitHub Pages

O site está configurado para deploy automático no GitHub Pages através do GitHub Actions.

**URL do site:** https://brunnobkr.github.io/BARBEARIA-MDC/

### Como ativar o GitHub Pages:

1. Vá em **Settings** do repositório no GitHub
2. Role até a seção **Pages** no menu lateral
3. Em **Source**, selecione **GitHub Actions**
4. O deploy será feito automaticamente a cada push na branch `main`

O workflow já está configurado e fará o build e deploy automaticamente.

## Notas

- Os agendamentos são salvos no `localStorage` do navegador
- Em produção, recomenda-se integrar com um backend para persistência de dados
- O sistema de compra de produtos atualmente apenas exibe um alerta (integrar com sistema de pagamento em produção)

