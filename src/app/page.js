'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Mic, 
  CheckCheck, 
  MoreVertical, 
  Phone, 
  Video, 
  Search,
  Bot,
  ChevronLeft,
  X
} from 'lucide-react';

// States defined in FLOWS.md
const CHAT_STATES = {
  START: 'START',
  ASK_NAME: 'ASK_NAME',
  ASK_EMAIL: 'ASK_EMAIL',
  ASK_CPF: 'ASK_CPF',
  MENU: 'MENU',
  ORDERS: 'ORDERS',
  ORDER_DETAIL: 'ORDER_DETAIL',
  TICKETS: 'TICKETS',
  TICKET_DETAIL: 'TICKET_DETAIL',
  TRANSBORDO: 'TRANSBORDO',
  FINALIZACAO: 'FINALIZACAO',
  CPF_NOT_FOUND: 'CPF_NOT_FOUND'
};

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentState, setCurrentState] = useState(CHAT_STATES.START);
  const [userData, setUserData] = useState({ name: '', email: '', cpf: '' });
  const [selectedItem, setSelectedItem] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial Greeting
  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        addBotMessage("Olá, meu nome é Nélia, sou a assistente virtual do Chat Simples e irei te ajudar no seu atendimento.\n\nPara começar, qual o seu nome?");
        setCurrentState(CHAT_STATES.ASK_NAME);
        setIsTyping(false);
      }, 1000);
    }
  }, []);

  const addBotMessage = (text, options = null) => {
    const botMsg = {
      id: Date.now() + Math.random(),
      sender: 'bot',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      processResponse(text.trim());
      setIsTyping(false);
    }, 1000);
  };

  const processResponse = (input) => {
    const cleanInput = input.toLowerCase();

    // Global Command /menu
    if (cleanInput === '/menu' || cleanInput === '0') {
      showMenu();
      return;
    }

    switch (currentState) {
      case CHAT_STATES.ASK_NAME:
        setUserData(prev => ({ ...prev, name: input }));
        addBotMessage(`Prazer, ${input}! Agora, poderia me informar seu e-mail?`);
        setCurrentState(CHAT_STATES.ASK_EMAIL);
        break;

      case CHAT_STATES.ASK_EMAIL:
        setUserData(prev => ({ ...prev, email: input }));
        addBotMessage("Obrigada! Por fim, qual o seu CPF?");
        setCurrentState(CHAT_STATES.ASK_CPF);
        break;

      case CHAT_STATES.ASK_CPF:
        const cleanCpf = input.replace(/\D/g, '');
        setUserData(prev => ({ ...prev, cpf: cleanCpf }));
        
        if (cleanCpf === '11111111111') {
          addBotMessage("Ops, não localizei seu cadastro com o CPF informado. Gostaria de tentar novamente ou falar com um atendente?", [
            { label: "1️⃣ Tentar CPF novamente", value: "1" },
            { label: "2️⃣ Falar com Atendente", value: "2" }
          ]);
          setCurrentState(CHAT_STATES.CPF_NOT_FOUND);
        } else {
          addBotMessage(`Tudo bem ${userData.name}, seu cadastro foi encontrado!`);
          showMenu();
        }
        break;

      case CHAT_STATES.CPF_NOT_FOUND:
        if (input === '1') {
          addBotMessage("Sem problemas. Digite seu CPF novamente:");
          setCurrentState(CHAT_STATES.ASK_CPF);
        } else if (input === '2') {
          handleTransbordo();
        } else {
          addBotMessage("Não entendi. Escolha [1] para tentar o CPF novamente ou [2] para falar com um atendente.");
        }
        break;

      case CHAT_STATES.MENU:
        if (input === '1' || cleanInput === '/pedidos') {
          showOrders();
        } else if (input === '2' || cleanInput === '/tickets') {
          showTickets();
        } else if (input === '9') {
          handleTransbordo();
        } else {
          addBotMessage("Opção inválida. Escolha uma das opções do menu ou digite /menu.");
        }
        break;

      case CHAT_STATES.ORDERS:
        const orderId = input.replace('#', '');
        if (['1', '2', '3'].includes(orderId) || orderId.length === 6) {
          showOrderDetail(orderId);
        } else if (cleanInput === 'm' || cleanInput === 'voltar') {
          showMenu();
        } else {
          addBotMessage("Não entendi. Por favor, escolha um pedido da lista ou digite /menu para voltar.");
        }
        break;

      case CHAT_STATES.TICKETS:
        const cleanTicketInput = input.replace('#', '').toUpperCase();
        if (['1', '2', '3'].includes(cleanTicketInput) || cleanTicketInput.startsWith('TK') || cleanTicketInput.length >= 4) {
          showTicketDetail(cleanTicketInput);
        } else if (cleanInput === 'm' || cleanInput === 'voltar') {
          showMenu();
        } else {
          addBotMessage("Não entendi. Por favor, escolha um ticket da lista ou digite /menu para voltar.");
        }
        break;

      case CHAT_STATES.ORDER_DETAIL:
        if (cleanInput === '1' || cleanInput === 'pedidos') {
          showOrders();
        } else if (cleanInput === 'm' || cleanInput === 'voltar') {
          showMenu();
        } else {
          addBotMessage("Deseja realizar outra consulta? Digite /menu ou escolha uma opção acima.");
        }
        break;

      case CHAT_STATES.TICKET_DETAIL:
        if (cleanInput === '2' || cleanInput === 'tickets') {
          showTickets();
        } else if (cleanInput === 'm' || cleanInput === 'voltar') {
          showMenu();
        } else {
          addBotMessage("Deseja realizar outra consulta? Digite /menu ou escolha uma opção acima.");
        }
        break;

      case CHAT_STATES.TRANSBORDO:
        addBotMessage("Sua mensagem foi enviada ao suporte. Gostaria de encerrar o atendimento?", [
          { label: "Encerrar Atendimento", value: "fim" }
        ]);
        setCurrentState(CHAT_STATES.FINALIZACAO);
        break;

      case CHAT_STATES.FINALIZACAO:
        const rating = parseInt(input);
        if (rating >= 1 && rating <= 5) {
          addBotMessage(`Obrigada pela avaliação! O número do seu protocolo é ${Math.floor(100000 + Math.random() * 900000)}. Até logo!`);
          setCurrentState(CHAT_STATES.START); // Reset or could disable input
        } else {
          addBotMessage("Como você avalia meu atendimento? (Responda de 1 a 5)");
        }
        break;

      default:
        addBotMessage("Desculpe, me perdi um pouco. Vamos voltar ao menu principal?");
        showMenu();
        break;
    }
  };

  const showMenu = () => {
    addBotMessage("📋 **Menu Inicial**\n\nEscolha uma das opções abaixo:", [
      { label: "1️⃣ Pedidos", value: "1" },
      { label: "2️⃣ Tickets", value: "2" },
      { label: "9️⃣ Falar com um Atendente", value: "9" },
      { label: "0️⃣ Sair", value: "0" }
    ]);
    setCurrentState(CHAT_STATES.MENU);
  };

  const showOrders = () => {
    addBotMessage("📦 **Seus Pedidos**\n\nAqui estão seus pedidos recentes:", [
      { label: "📦 Pedido #452812", value: "452812" },
      { label: "📦 Pedido #881293", value: "881293" },
      { label: "📦 Pedido #129384", value: "129384" },
      { label: "⬅️ Voltar ao Menu", value: "m" }
    ]);
    setCurrentState(CHAT_STATES.ORDERS);
  };

  const showOrderDetail = (id) => {
    const products = ["Smartphone Galaxy", "Notebook Gamer", "Fone Bluetooth"];
    const product = products[Math.floor(Math.random() * products.length)];
    const days = Math.floor(Math.random() * 6);
    
    let statusMsg = "";
    if (days === 0) statusMsg = "Seu pedido está a caminho e deve chegar hoje!";
    else if (days < 2) statusMsg = "Seu pedido está no prazo e chegará em breve.";
    else statusMsg = `Seu pedido está processado e chegará em até ${days} dias.`;

    addBotMessage(`📄 **Detalhes do Pedido #${id}**\n\n**Produto:** ${product}\n**Prazo:** Até ${days} dias\n\n${statusMsg}`, [
      { label: "⬅️ Voltar aos Pedidos", value: "1" },
      { label: "🏠 Menu Inicial", value: "m" }
    ]);
    setCurrentState(CHAT_STATES.ORDER_DETAIL);
  };

  const showTickets = () => {
    addBotMessage("🎫 **Seus Tickets**\n\nSelecione um ticket para ver detalhes:", [
      { label: "🎫 Ticket #TK9921", value: "TK9921" },
      { label: "🎫 Ticket #TK4412", value: "TK4412" },
      { label: "⬅️ Voltar ao Menu", value: "m" }
    ]);
    setCurrentState(CHAT_STATES.TICKETS);
  };

  const showTicketDetail = (id) => {
    const subjects = ["Dúvida sobre devolução", "Atraso na entrega", "Problema no pagamento"];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const isResponded = Math.random() > 0.5;

    let responseText = isResponded 
      ? "✅ Já temos uma resposta: Sua solicitação foi aprovada e o estorno será realizado em até 48h."
      : "⏳ Nossa equipe ainda está analisando seu caso. Retornaremos entre 1 a 2 dias úteis.";

    addBotMessage(`📄 **Ticket #${id}**\n\n**Assunto:** ${subject}\n\n${responseText}`, [
      { label: "⬅️ Voltar aos Tickets", value: "2" },
      { label: "🏠 Menu Inicial", value: "m" }
    ]);
    setCurrentState(CHAT_STATES.TICKET_DETAIL);
  };

  const handleTransbordo = () => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const hour = now.getHours();
    
    const isBusinessHours = day >= 1 && day <= 5 && hour >= 9 && hour < 18;

    if (isBusinessHours) {
      addBotMessage("👤 Vou te transferir para um de nossos atendentes. Por favor, aguarde um momento.");
      setCurrentState(CHAT_STATES.TRANSBORDO);
    } else {
      addBotMessage("🌙 No momento nossos atendentes não estão disponíveis. Vou abrir um ticket com seus dados e você pode relatar seu problema abaixo. Retornaremos o contato em breve.");
      setCurrentState(CHAT_STATES.TRANSBORDO);
    }
  };

  const handleMenuClick = (val) => {
    handleSendMessage(val);
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full p-0 sm:p-4">
      <div className="w-full max-w-4xl h-screen sm:h-[90vh] flex flex-col sm:rounded-xl shadow-2xl overflow-hidden bg-[#efeae2]">
        
        {/* Header */}
        <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-lg shadow-inner overflow-hidden">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#008069] rounded-full"></span>
            </div>
            <div>
              <h1 className="font-semibold text-base leading-tight">Nélia - Assistente Virtual</h1>
              <p className="text-xs text-emerald-100">
                {isTyping ? 'digitando...' : 'online'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-emerald-100">
            <button className="hover:text-white transition hidden sm:block">
              <Video className="w-5 h-5" />
            </button>
            <button className="hover:text-white transition hidden sm:block">
              <Phone className="w-5 h-5" />
            </button>
            <span className="w-px h-5 bg-emerald-600 hidden sm:block"></span>
            <button className="hover:text-white transition">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-white transition">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 whatsapp-bg space-y-3">
          <div className="flex justify-center my-2">
            <div className="bg-[#fcf4cb] text-[#54656f] text-xs px-3 py-1.5 rounded-lg shadow-sm text-center max-w-md">
              🔒 As mensagens são protegidas com criptografia de ponta-a-ponta.
            </div>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div 
                className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-4 py-2.5 shadow-sm relative text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none' 
                    : 'bg-white text-gray-900 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                {msg.options && (
                  <div className="mt-3 flex flex-col space-y-2">
                    {msg.options.map((opt, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleMenuClick(opt.value)}
                        className="text-left bg-emerald-50 hover:bg-emerald-100 text-[#008069] font-medium px-3 py-2 rounded-md border border-emerald-200 transition text-xs sm:text-sm flex items-center justify-between"
                      >
                        <span>{opt.label}</span>
                        <CheckCheck className="w-3.5 h-3.5 opacity-30" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-end space-x-1 mt-1 text-[10px] text-gray-500">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && (
                    <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-2">
              <div className="bg-white text-gray-500 rounded-lg rounded-tl-none px-4 py-3 shadow-sm flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="bg-[#f0f2f5] px-4 py-3 flex items-center space-x-3 border-t border-gray-200">
          <div className="flex items-center space-x-3 text-gray-500">
            <button className="hover:text-gray-700 transition"><Smile className="w-6 h-6" /></button>
            <button className="hover:text-gray-700 transition hidden sm:block"><Paperclip className="w-6 h-6" /></button>
          </div>

          <div className="flex-1">
            <input 
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none text-sm shadow-sm placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center space-x-2 text-gray-500">
            {inputValue.trim() ? (
              <button 
                onClick={() => handleSendMessage()}
                className="bg-[#00a884] hover:bg-[#008069] text-white p-2.5 rounded-full transition shadow flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button className="hover:text-gray-700 p-2.5 transition"><Mic className="w-6 h-6" /></button>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
