# Fluxos de Atendimento do Chat - Assistente Nélia

Este documento descreve os fluxos de conversação e regras de negócio para o atendimento via chat assistido pela assistente virtual **Nélia**.

## 1. Fluxo de Identificação (Boas-vindas)
- **Saudação:** "Olá, meu nome é Nélia, sou a assistente virtual do Chat Simples e irei te ajudar no seu atendimento."
- **Coleta de Dados:** Solicitar Nome, E-mail e CPF.
- **Validação de Cadastro:**
    - **CPF Encontrado (Diferente de `11111111111`):** "Tudo bem [Nome], seu cadastro foi encontrado!" -> Encaminhar para o **[2. Menu Inicial]**.
    - **CPF Não Encontrado (`11111111111`):** "Ops, não localizei seu cadastro com o CPF informado. Gostaria de tentar novamente ou falar com um atendente?"
        - [1] Tentar CPF novamente
        - [2] Falar com Atendente (Ir para **[3. Transbordo]**)

## 2. Menu Inicial [`/menu`]
Sempre que o cliente usar este comando ou após a identificação, exibir:
- [1] - Pedidos (Ver **[4. Pedidos]**)
- [2] - Tickets (Ver **[6. Tickets]**)
- [9] - Falar com um Atendente (Ir para **[3. Transbordo]**)

*Sugestão:* Adicionar opção `[0] - Sair` para encerrar a sessão.

## 3. Regras de Transbordo (Humano)
- **Verificação de Horário:** Segunda a Sexta, das 09h às 18h.
- **Dentro do Horário:** "Vou te transferir para um de nossos atendentes. Por favor, aguarde um momento."
- **Fora do Horário:** "No momento nossos atendentes não estão disponíveis. Vou abrir um ticket com seus dados e você pode relatar seu problema abaixo. Retornaremos o contato em breve."

## 4. Consulta de Pedidos [`/pedidos`]
- **Listagem:** Gerar dinamicamente de 1 a 3 pedidos fictícios (Ex: `#452812`).
- **Interação:**
    - Cliente seleciona o número ou digita o ID -> Ir para **[5. Detalhes do Pedido]**.
    - Cliente digita algo inválido -> "Não entendi. Por favor, escolha um pedido da lista ou digite `/menu` para voltar."
- **Sugestão:** Adicionar opção `[M] - Voltar ao Menu Inicial`.

## 5. Detalhes do Pedido
- **Exibição de Dados:**
    - **Produto:** Nome aleatório (Ex: Smartphone, Notebook, Fone de Ouvido).
    - **Prazo:** Calcular data entre hoje e +5 dias.
    - **Status Dinâmico:**
        - Se Prazo = Hoje: "Seu pedido está a caminho e deve chegar hoje!"
        - Se Prazo < 2 dias: "Seu pedido está no prazo e chegará em breve."
        - Se Prazo > 3 dias: "Seu pedido está processado e chegará em até [X] dias."

## 6. Consulta de Tickets [`/tickets`]
- **Listagem:** Gerar dinamicamente de 1 a 3 tickets (Ex: `#TK9921`).
- **Interação:**
    - Cliente seleciona o número -> Ir para **[7. Detalhes do Ticket]**.
    - Cliente digita algo inválido -> Erro e comando `/menu`.

## 7. Detalhes do Ticket
- **Contexto:** Exibir problema fictício (Ex: "Dúvida sobre devolução", "Atraso na entrega").
- **Status/Retorno:**
    - **Opção A (Respondido):** Exibir solução condizente.
    - **Opção B (Pendente):** "Nossa equipe ainda está analisando seu caso. Retornaremos entre 1 a 2 dias úteis."

## 8. Finalização
- **Pesquisa de Satisfação:** "Como você avalia meu atendimento? (1 a 5)"
- **Encerramento:** "Obrigada por entrar em contato! O número do seu protocolo é [PROTOCOLO_ALEATORIO]. Até logo!"

---
### Sugestões de Melhorias Técnicas/UX:
1.  **Breadcrumbs (Migalhas):** Sempre informar ao usuário onde ele está (Ex: "Menu > Pedidos").
2.  **Opção "Voltar":** Em todos os níveis (Pedido, Ticket), ter uma opção clara para voltar ao menu anterior sem precisar digitar `/menu`.
3.  **Mascaramento de Dados:** No fluxo inicial, formatar o CPF (XXX.XXX.XXX-XX) para melhor leitura.
4.  **Timeouts:** Se o usuário ficar 5 minutos sem responder, a Nélia pode enviar um lembrete: "Ainda está aí? Posso ajudar em algo mais?"
5.  **Confirmação de Dados:** Antes de abrir um ticket no transbordo fora de horário, confirmar se o e-mail/telefone de contato ainda são os mesmos do cadastro.
