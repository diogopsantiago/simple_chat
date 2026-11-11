# Chat Assistant (WhatsApp Style) - Next.js

Este é um projeto simples de interface de chat estilo WhatsApp desenvolvido com **Next.js** e estilizado com **Tailwind CSS**. O objetivo é servir como uma base intuitiva de atendimento/assistente virtual, ideal para ser implantada rapidamente na Vercel.

---

## 🚀 Funcionalidades

- **Interface Estilo WhatsApp:** Design limpo e responsivo com balões de mensagem, horário e layout familiar.
- **Mensagem de Boas-Vindas Automática:** Assim que o usuário entra no chat, a assistente se apresenta e exibe um menu de opções.
- **Menu Interativo (4 Opções):**
  1. ℹ️ Informações sobre o serviço
  2. 🛠️ Suporte técnico
  3. 💰 Planos e Preços
  4. 👤 Falar com atendente
- **Respostas Pré-definidas:** Ao selecionar uma opção do menu, o chat responde com uma mensagem padrão correspondente.
- **Modo Eco (Echo Bot):** Após responder à opção do menu, qualquer mensagem adicional digitada pelo usuário será respondida no formato:
  > `Minha resposta é: {mensagem original}`
- **Comando /Menu:** Durante o Modo Eco, ao digitar `/menu`, o assistente apresenta novamente o menu de opções interativo, aceita uma nova resposta do menu como no início e, em seguida, retorna automaticamente ao Modo Eco.

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** (App Router ou Pages Router)
- **[React](https://react.dev/)**
- **[Tailwind CSS](https://tailwindcss.com/)** (para estilização rápida do chat estilo WhatsApp)
- **[Lucide React](https://lucide.dev/)** / **Icons** (opcional, para ícones de envio e status)

---

## 📁 Estrutura Esperada do Projeto

```text
├── public/
├── src/
│   └── app/
│       ├── globals.css      # Estilos globais do Tailwind CSS
│       ├── layout.js        # Layout da aplicação
│       └── page.js          # Rota principal (Index) com a lógica e tela do Chat
├── package.json
├── tailwind.config.js
└── README.md
```

---

## ⚙️ Como Lógica do Chat Funciona

1. **Estado Inicial:** O estado das mensagens inicia com a mensagem da assistente contendo a apresentação e os botões/texto com as 4 opções.
2. **Seleção de Opção:** Se o estado `menuSelecionado` for falso, a primeira interação valida a opção escolhida (1, 2, 3 ou 4) e envia a resposta equivalente.
3. **Fluxo Contínuo e Comando /Menu:** Após a seleção inicial, o assistente entra no modo eco. A qualquer momento, o usuário pode digitar `/menu` para reexibir o menu de opções, fazer uma nova seleção e retornar ao modo eco.

---

## 💻 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18.x ou superior)
- **npm**, **yarn** ou **pnpm**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Open `http://localhost:3000` no seu navegador para ver o chat funcionando.

---

## 🌐 Deploy na Vercel

Por ter sido construído com Next.js, a publicação na Vercel é extremamente direta:

1. Faça **Push** do código para o seu repositório no GitHub/GitLab/Bitbucket.
2. Acesse o painel da [Vercel](https://vercel.com/) e clique em **"Add New" > "Project"**.
3. Importe o repositório do seu projeto.
4. Mantenha as configurações padrão detectadas para Next.js.
5. Clique em **Deploy**.

---

## 📝 Próximos Passos (Melhorias Futuras)

- [ ] Integração com uma API real de Inteligência Artificial (ex: OpenAI / Gemini).
- [ ] Persistência de dados no banco de dados ou `localStorage`.
- [ ] Adição de áudio e envio de anexos.