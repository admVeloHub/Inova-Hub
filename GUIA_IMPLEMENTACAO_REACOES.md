# Guia Completo: Implementar Reações do WhatsApp nas Escalações

## 📋 Visão Geral

Este guia explica passo a passo como fazer com que as reações ✅ e ❌ no WhatsApp atualizem automaticamente o status das escalações no Inova-Hub.

## 🎯 O Que Precisamos Fazer

1. **Localizar o código do serviço WhatsApp** (onde está o Baileys)
2. **Adicionar o listener de reações** no código
3. **Configurar a variável de ambiente** `INOVA_HUB_API_URL`
4. **Testar a integração**

---

## 📍 PASSO 1: Localizar o Código do WhatsApp

### Onde está o serviço WhatsApp?

O serviço WhatsApp geralmente está em um dos seguintes lugares:

1. **Repositório separado** (ex: `whatsapp-api`, `baileys-service`, etc.)
2. **Servidor separado** (ex: Render, Railway, Heroku, etc.)
3. **Dentro do projeto** (pasta `whatsapp/`, `api-whatsapp/`, etc.)

### Como identificar o código?

Procure por arquivos que contenham:
- `@whiskeysockets/baileys`
- `makeWASocket`
- `useMultiFileAuthState`
- Código que envia mensagens via WhatsApp

**Exemplo de estrutura:**
```
whatsapp-api/
├── index.js          ← Código principal (aqui vamos adicionar o listener)
├── package.json
├── auth/             ← Pasta de autenticação do Baileys
└── .env              ← Variáveis de ambiente
```

---

## 🔧 PASSO 2: Adicionar o Listener de Reações

### 2.1. Abrir o arquivo principal do WhatsApp

Abra o arquivo onde está o código de conexão do Baileys (geralmente `index.js` ou `server.js`).

### 2.2. Localizar onde o socket é criado

Procure por código similar a este:

```javascript
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

// ... código de autenticação ...

const sock = makeWASocket({
  auth: state,
  logger: pino({ level: 'silent' }),
  // ... outras configurações ...
});
```

### 2.3. Adicionar o listener APÓS criar o socket

**IMPORTANTE:** Adicione o código logo após criar o socket, mas antes de qualquer outro listener de eventos.

**Código completo para adicionar:**

```javascript
// ===========================================
// LISTENER DE REAÇÕES DO WHATSAPP
// ===========================================
// Este código detecta reações ✅ e ❌ e atualiza o status das escalações

const INOVA_HUB_API_URL = process.env.INOVA_HUB_API_URL || 'http://localhost:8090';

sock.ev.on('messages.reaction', async (reactionUpdate) => {
  try {
    const { key, reaction } = reactionUpdate;
    
    // Validar dados básicos
    if (!key || !key.id) {
      console.log('[REAÇÕES] Reação sem ID de mensagem, ignorando');
      return;
    }
    
    if (!reaction || !reaction.text) {
      console.log('[REAÇÕES] Reação sem emoji, ignorando');
      return;
    }
    
    const emoji = reaction.text;
    const waMessageId = key.id;
    const reactor = key.participant || key.remoteJid;
    
    console.log(`[REAÇÕES] Reação recebida: ${emoji} na mensagem ${waMessageId} por ${reactor}`);
    
    // Só processar reações ✅ e ❌
    if (emoji !== '✅' && emoji !== '❌') {
      console.log(`[REAÇÕES] Reação ${emoji} ignorada (não é ✅ ou ❌)`);
      return;
    }
    
    // Chamar endpoint do Inova-Hub
    const apiUrl = `${INOVA_HUB_API_URL}/api/escalacoes/solicitacoes/auto-status`;
    
    console.log(`[REAÇÕES] Chamando API do Inova-Hub: ${apiUrl}`);
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          waMessageId: waMessageId,
          reactor: reactor,
          reaction: emoji
        }),
        // Timeout de 10 segundos
        signal: AbortSignal.timeout(10000)
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`[REAÇÕES] ✅ Status atualizado com sucesso:`, {
          solicitacaoId: data.data?._id,
          status: data.data?.status,
          waMessageId: waMessageId
        });
      } else {
        const errorText = await response.text();
        console.error(`[REAÇÕES] ❌ Erro ao atualizar status: ${response.status} - ${errorText}`);
      }
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        console.error(`[REAÇÕES] ❌ Timeout ao chamar API do Inova-Hub`);
      } else {
        console.error(`[REAÇÕES] ❌ Erro ao chamar API do Inova-Hub:`, fetchError.message);
      }
    }
  } catch (error) {
    console.error(`[REAÇÕES] ❌ Erro ao processar reação:`, error);
  }
});

console.log('[REAÇÕES] Listener de reações configurado e ativo');
```

### 2.4. Exemplo completo de onde adicionar

```javascript
const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');

const app = express();
app.use(express.json());

let sock = null;
let isConnected = false;

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');
  
  sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 60000,
  });

  // ===========================================
  // LISTENER DE CONEXÃO (código existente)
  // ===========================================
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    
    if (qr) {
      console.log('\nESCANEIE O QR CODE AGORA:\n');
      qrcode.generate(qr, { small: true });
    }
    
    if (connection === 'open') {
      isConnected = true;
      console.log('\nWHATSAPP CONECTADO! API PRONTA!');
    }
    
    if (connection === 'close') {
      isConnected = false;
      // ... código de reconexão ...
    }
  });

  sock.ev.on('creds.update', saveCreds);

  // ===========================================
  // ADICIONAR AQUI: LISTENER DE REAÇÕES
  // ===========================================
  const INOVA_HUB_API_URL = process.env.INOVA_HUB_API_URL || 'http://localhost:8090';

  sock.ev.on('messages.reaction', async (reactionUpdate) => {
    // ... código do listener acima ...
  });

  console.log('[REAÇÕES] Listener de reações configurado e ativo');
}

connect();
```

---

## ⚙️ PASSO 3: Configurar Variável de Ambiente

### 3.1. Localizar arquivo de variáveis de ambiente

Procure por um dos seguintes arquivos:
- `.env`
- `.env.local`
- `.env.production`
- Configuração no painel do serviço (Render, Railway, etc.)

### 3.2. Adicionar a variável

Adicione a seguinte linha ao arquivo `.env`:

```bash
# URL da API do Inova-Hub para atualização de status via reações
INOVA_HUB_API_URL=http://localhost:8090
```

### 3.3. Valores para diferentes ambientes

**Desenvolvimento Local:**
```bash
INOVA_HUB_API_URL=http://localhost:8090
```

**Produção (Google Cloud Run):**
```bash
INOVA_HUB_API_URL=https://velohub-278491073220.us-east1.run.app
```

**Outro servidor:**
```bash
INOVA_HUB_API_URL=https://seu-servidor.com
```

### 3.4. Se estiver usando Render, Railway, Heroku, etc.

1. Acesse o painel do serviço
2. Vá em **Environment Variables** ou **Config Vars**
3. Adicione:
   - **Key:** `INOVA_HUB_API_URL`
   - **Value:** `https://velohub-278491073220.us-east1.run.app` (ou a URL do seu servidor)

### 3.5. Reiniciar o serviço

Após adicionar a variável de ambiente, **reinicie o serviço WhatsApp** para que as mudanças tenham efeito.

---

## 🧪 PASSO 4: Testar a Integração

### 4.1. Verificar se o listener está ativo

1. Reinicie o serviço WhatsApp
2. Verifique os logs ao iniciar
3. Deve aparecer: `[REAÇÕES] Listener de reações configurado e ativo`

### 4.2. Enviar uma solicitação de teste

1. Acesse o Inova-Hub
2. Crie uma nova solicitação técnica (qualquer tipo)
3. A solicitação será enviada para o WhatsApp
4. **Anote o ID da mensagem** (aparece nos logs ou no console)

### 4.3. Reagir à mensagem no WhatsApp

1. Abra o WhatsApp (web ou app)
2. Encontre a mensagem da solicitação
3. **Reaja com ✅ ou ❌**

### 4.4. Verificar se funcionou

**Opção 1: Verificar nos logs do WhatsApp**
```
[REAÇÕES] Reação recebida: ✅ na mensagem 3EB0C767F26C747C5A30 por 5511999999999@s.whatsapp.net
[REAÇÕES] Chamando API do Inova-Hub: http://localhost:8090/api/escalacoes/solicitacoes/auto-status
[REAÇÕES] ✅ Status atualizado com sucesso: { solicitacaoId: '...', status: 'feito', ... }
```

**Opção 2: Verificar no Inova-Hub**
1. Acesse a página de Escalações
2. Procure pela solicitação que você reagiu
3. O status deve ter mudado para:
   - ✅ → **"feito"** (verde)
   - ❌ → **"não feito"** (vermelho)

**Opção 3: Verificar via API**
```bash
curl http://localhost:8090/api/escalacoes/solicitacoes?cpf=SEU_CPF
```

### 4.5. Troubleshooting

**Problema: Reação não está sendo detectada**
- ✅ Verifique se o listener foi adicionado corretamente
- ✅ Verifique se o serviço foi reiniciado
- ✅ Verifique os logs para erros

**Problema: Status não está sendo atualizado**
- ✅ Verifique se `INOVA_HUB_API_URL` está configurada corretamente
- ✅ Verifique se o Inova-Hub está rodando e acessível
- ✅ Verifique os logs do WhatsApp para erros de conexão
- ✅ Verifique se o `waMessageId` da reação corresponde ao da solicitação

**Problema: Erro 404 (Solicitação não encontrada)**
- ✅ Verifique se o `waMessageId` está correto
- ✅ Verifique se a solicitação foi criada com sucesso
- ✅ Verifique se o `waMessageId` está salvo na solicitação

---

## 📝 Checklist de Implementação

Use este checklist para garantir que tudo foi feito:

- [ ] Código do WhatsApp localizado
- [ ] Listener de reações adicionado ao código
- [ ] Variável `INOVA_HUB_API_URL` configurada
- [ ] Serviço WhatsApp reiniciado
- [ ] Logs mostram que o listener está ativo
- [ ] Teste com reação ✅ funcionou
- [ ] Teste com reação ❌ funcionou
- [ ] Status atualizado no Inova-Hub

---

## 🔍 Verificação Final

### Logs Esperados

Quando tudo estiver funcionando, você verá nos logs do WhatsApp:

```
[REAÇÕES] Listener de reações configurado e ativo
...
[REAÇÕES] Reação recebida: ✅ na mensagem 3EB0C767F26C747C5A30 por 5511999999999@s.whatsapp.net
[REAÇÕES] Chamando API do Inova-Hub: https://velohub-278491073220.us-east1.run.app/api/escalacoes/solicitacoes/auto-status
[REAÇÕES] ✅ Status atualizado com sucesso: { solicitacaoId: '507f1f77bcf86cd799439011', status: 'feito', waMessageId: '3EB0C767F26C747C5A30' }
```

### Status no Inova-Hub

No frontend, a solicitação deve mostrar:
- **✅ Feito** (verde) quando reagida com ✅
- **❌ Não feito** (vermelho) quando reagida com ❌

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas:

1. **Verifique os logs** do serviço WhatsApp
2. **Verifique os logs** do Inova-Hub (backend)
3. **Teste a API manualmente:**
   ```bash
   curl -X POST http://localhost:8090/api/escalacoes/solicitacoes/auto-status \
     -H "Content-Type: application/json" \
     -d '{
       "waMessageId": "SEU_MESSAGE_ID",
       "reaction": "✅"
     }'
   ```

4. **Verifique a conectividade:**
   - O serviço WhatsApp consegue acessar a URL do Inova-Hub?
   - Há firewall ou CORS bloqueando?

---

## 📚 Referências

- Documentação Baileys: https://github.com/WhiskeySockets/Baileys
- Endpoint auto-status: `/api/escalacoes/solicitacoes/auto-status`
- Arquivo de exemplo: `EXEMPLO_WHATSAPP_REACOES.js`

