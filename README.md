# Chat Simples - Assistente Virtual Nélia

Este é um protótipo de chat de atendimento ao cliente com interface moderna inspirada no WhatsApp, desenvolvido com **Next.js 14**, **Tailwind CSS** e **Lucide React**.

O projeto conta agora com a assistente virtual **Nélia**, que gerencia fluxos complexos de atendimento de forma automatizada através de uma máquina de estados robusta.

## 🚀 Funcionalidades

-   **Interface Estilo WhatsApp:** Design limpo, responsivo e familiar com balões de mensagem, horários e layout otimizado para mobile e desktop.
-   **Máquina de Estados:** Gerenciamento inteligente da conversação através de estados (Identificação, Menu, Pedidos, Tickets).
-   **Assistente Nélia:**
    -   **Fluxo de Onboarding:** Coleta e validação de Nome, E-mail e CPF.
    -   **Consulta de Pedidos:** Listagem dinâmica e detalhes de status de entrega (no prazo, atrasado, etc.).
    -   **Gestão de Tickets:** Verificação de chamados de suporte com simulação de retornos.
    -   **Transbordo Inteligente:** Lógica baseada em horário comercial (Seg-Sex, 09h às 18h) para transferência humana ou abertura de ticket offline.
    -   **Pesquisa de Satisfação:** Coleta de feedback (1 a 5) e geração de protocolo único ao final do atendimento.
-   **Comandos Globais:** Uso de `/menu` ou `0` para retornar ao início a qualquer momento.

## 📄 Documentação de Fluxos

As regras de negócio, textos da Nélia e caminhos de conversação estão detalhadamente documentados no arquivo:
👉 **[FLOWS.md](./FLOWS.md)**

## 🛠️ Tecnologias Utilizadas

-   **Next.js 14** (App Router)
-   **Tailwind CSS** (Estilização)
-   **Lucide React** (Ícones)
-   **React Hooks** (`useState`, `useEffect`, `useRef`)

## 🔧 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18.x ou superior)
- **npm**

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 💡 Simulação de Dados

Para testar os diferentes caminhos da Nélia:
-   **CPF Não Encontrado:** Digite `11111111111` no fluxo inicial para ver o tratamento de erro.
-   **Horário de Atendimento:** A lógica de transbordo utiliza o horário local do seu computador.
-   **Pedidos/Tickets:** São gerados dinamicamente para simular uma integração com backend.
