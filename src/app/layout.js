import './globals.css';

export const metadata = {
  title: 'Chat Assistant - WhatsApp Style',
  description: 'Assistente virtual estilo WhatsApp desenvolvido com Next.js e Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-whatsapp-chat-bg min-h-screen flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
