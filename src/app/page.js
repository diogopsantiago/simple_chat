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
  Bot
} from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Olá! Seja bem-vindo(a) ao nosso atendimento virtual. Como posso ajudar você hoje?\n\nEscolha uma das opções abaixo digitando o número correspondente ou clicando nos botões:",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showMenu: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [menuState, setMenuState] = useState('waiting_selection'); // 'waiting_selection' | 'responded'
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping, messages]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: userMessageTime
    };

    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      let botResponseText = '';
      const cleanText = text.trim();
      let nextMenuState = menuState;
      let showMenuFlag = false;

      if (cleanText.toLowerCase() === '/menu') {
        botResponseText = "📋 Aqui está o menu principal novamente. Escolha uma das opções abaixo:";
        nextMenuState = 'waiting_selection';
        showMenuFlag = true;
      } else if (menuState === 'waiting_selection') {
        if (cleanText === '1' || cleanText.toLowerCase().includes('informação') || cleanText.toLowerCase().includes('serviço')) {
          botResponseText = "ℹ️ **Informações sobre o serviço**:\n\nNosso assistente virtual automatiza o atendimento 24 horas por dia, 7 dias por semana, trazendo agilidade e eficiência para o seu negócio. Você pode integrar facilmente com sistemas externos e personalizar fluxos.";
          nextMenuState = 'responded';
        } else if (cleanText === '2' || cleanText.toLowerCase().includes('suporte') || cleanText.toLowerCase().includes('técnico')) {
          botResponseText = "🛠️ **Suporte técnico**:\n\nPara falar com o suporte técnico, por favor descreva o seu problema detalhadamente ou envie um print da tela com o erro. Nossa equipe técnica analisará o caso imediatamente.";
          nextMenuState = 'responded';
        } else if (cleanText === '3' || cleanText.toLowerCase().includes('plano') || cleanText.toLowerCase().includes('preço')) {
          botResponseText = "💰 **Planos e Preços**:\n\nTemos planos a partir de R$ 99/mês para empresas de todos os portes:\n- **Básico**: R$ 99/mês\n- **Profissional**: R$ 199/mês\n- **Enterprise**: Sob consulta\n\nDigite '4' se quiser falar com um consultor comercial.";
          nextMenuState = 'responded';
        } else if (cleanText === '4' || cleanText.toLowerCase().includes('atendente') || cleanText.toLowerCase().includes('falar com')) {
          botResponseText = "👤 **Falar com atendente**:\n\nUm de nossos atendentes humanos foi notificado e entrará em contato em instantes. Por favor, aguarde.";
          nextMenuState = 'responded';
        } else {
          // If user typed something else before choosing menu option
          botResponseText = `Opção não reconhecida no menu inicial.\n\nPor favor, escolha uma das opções válidas (1, 2, 3 ou 4) ou clique em um dos botões abaixo:`;
          showMenuFlag = true;
        }
      } else {
        // Echo Bot Mode
        botResponseText = `Minha resposta é: ${cleanText}`;
        nextMenuState = 'responded';
      }

      setMenuState(nextMenuState);

      const botMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText,
        time: botMessageTime,
        showMenu: showMenuFlag || (nextMenuState === 'waiting_selection' && botResponseText.includes('Opção não reconhecida'))
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleMenuClick = (optionNumber) => {
    handleSendMessage(optionNumber);
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full p-0 sm:p-4">
      <div className="w-full max-w-4xl h-screen sm:h-[90vh] flex flex-col sm:rounded-xl shadow-2xl overflow-hidden bg-[#efeae2]">
        
        {/* WhatsApp Header */}
        <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-lg shadow-inner">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#008069] rounded-full"></span>
            </div>
            <div>
              <h1 className="font-semibold text-base leading-tight">Assistente Virtual</h1>
              <p className="text-xs text-emerald-100">
                {isTyping ? 'digitando...' : 'online'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-emerald-100">
            <button className="hover:text-white transition" title="Vídeo Chamada">
              <Video className="w-5 h-5" />
            </button>
            <button className="hover:text-white transition" title="Chamada de Voz">
              <Phone className="w-5 h-5" />
            </button>
            <span className="w-px h-5 bg-emerald-600"></span>
            <button className="hover:text-white transition" title="Pesquisar">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-white transition" title="Menu">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 whatsapp-bg space-y-3">
          {/* Encryption notice */}
          <div className="flex justify-center my-2">
            <div className="bg-[#fcf4cb] text-[#54656f] text-xs px-3 py-1.5 rounded-lg shadow-sm text-center max-w-md">
              🔒 As mensagens são protegidas com criptografia de ponta-a-ponta. Ninguém fora deste chat pode lê-las.
            </div>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div 
                className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-4 py-2.5 shadow-sm relative text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none' 
                    : 'bg-white text-gray-900 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                {/* Interactive Menu Buttons if message has menu */}
                {(msg.showMenu || (msg.id === 1 && menuState === 'waiting_selection')) && (
                  <div className="mt-3 flex flex-col space-y-2">
                    <button 
                      onClick={() => handleMenuClick('1')}
                      className="text-left bg-emerald-50 hover:bg-emerald-100 text-[#008069] font-medium px-3 py-2 rounded-md border border-emerald-200 transition text-xs sm:text-sm flex items-center justify-between"
                    >
                      <span>1️⃣ ℹ️ Informações sobre o serviço</span>
                      <span className="text-xs bg-emerald-200 px-1.5 py-0.5 rounded text-emerald-800">Selecionar</span>
                    </button>
                    <button 
                      onClick={() => handleMenuClick('2')}
                      className="text-left bg-emerald-50 hover:bg-emerald-100 text-[#008069] font-medium px-3 py-2 rounded-md border border-emerald-200 transition text-xs sm:text-sm flex items-center justify-between"
                    >
                      <span>2️⃣ 🛠️ Suporte técnico</span>
                      <span className="text-xs bg-emerald-200 px-1.5 py-0.5 rounded text-emerald-800">Selecionar</span>
                    </button>
                    <button 
                      onClick={() => handleMenuClick('3')}
                      className="text-left bg-emerald-50 hover:bg-emerald-100 text-[#008069] font-medium px-3 py-2 rounded-md border border-emerald-200 transition text-xs sm:text-sm flex items-center justify-between"
                    >
                      <span>3️⃣ 💰 Planos e Preços</span>
                      <span className="text-xs bg-emerald-200 px-1.5 py-0.5 rounded text-emerald-800">Selecionar</span>
                    </button>
                    <button 
                      onClick={() => handleMenuClick('4')}
                      className="text-left bg-emerald-50 hover:bg-emerald-100 text-[#008069] font-medium px-3 py-2 rounded-md border border-emerald-200 transition text-xs sm:text-sm flex items-center justify-between"
                    >
                      <span>4️⃣ 👤 Falar com atendente</span>
                      <span className="text-xs bg-emerald-200 px-1.5 py-0.5 rounded text-emerald-800">Selecionar</span>
                    </button>
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

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start mb-2">
              <div className="bg-white text-gray-500 rounded-lg rounded-tl-none px-4 py-3 shadow-sm flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="bg-[#f0f2f5] px-4 py-3 flex items-center space-x-3 border-t border-gray-200">
          <div className="flex items-center space-x-3 text-gray-500">
            <button className="hover:text-gray-700 transition" title="Emojis">
              <Smile className="w-6 h-6" />
            </button>
            <button className="hover:text-gray-700 transition hidden sm:block" title="Anexar">
              <Paperclip className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1">
            <input 
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite uma mensagem ou número da opção..."
              className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg focus:outline-none text-sm shadow-sm placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center space-x-2 text-gray-500">
            {inputValue.trim() ? (
              <button 
                onClick={() => handleSendMessage()}
                className="bg-[#00a884] hover:bg-[#008069] text-white p-2.5 rounded-full transition shadow flex items-center justify-center"
                title="Enviar mensagem"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button 
                className="hover:text-gray-700 p-2.5 transition"
                title="Áudio"
              >
                <Mic className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
