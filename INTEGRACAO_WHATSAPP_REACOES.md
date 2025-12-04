# Integração WhatsApp - Reações para Escalações

## Problema
Os checks (reações ✅ e ❌) no WhatsApp não estão refletindo no status das escalações.

## Solução
O endpoint `/api/escalacoes/solicitacoes/auto-status` já existe e está funcionando. O problema é que o serviço WhatsApp não está chamando esse endpoint quando há uma reação.

## Como Implementar no Serviço WhatsApp

### 1. Adicionar Listener de Reações no Baileys

No código do WhatsApp (index.js ou similar), adicione um listener para reações:

```javascript
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');

// ... código de conexão existente ...

// Adicionar listener de reações
sock.ev.on('messages.reaction', async (reactionUpdate) => {
  try {
    const { key, reaction } = reactionUpdate;
    
    // key.remoteJid = JID do grupo/contato
    // key.id = ID da mensagem que foi reagida
    // reaction.text = emoji da reação (✅ ou ❌)
    // key.participant = quem reagiu (número do participante)
    
    if (!reaction || !reaction.text) {
      return; // Ignorar se não houver reação
    }
    
    const emoji = reaction.text;
    const waMessageId = key.id;
    const reactor = key.participant || key.remoteJid;
    
    // Só processar reações ✅ e ❌
    if (emoji !== '✅' && emoji !== '❌') {
      return;
    }
    
    console.log(`[REAÇÃO] Recebida reação ${emoji} na mensagem ${waMessageId} por ${reactor}`);
    
    // Chamar endpoint do Inova-Hub
    const inovaHubUrl = process.env.INOVA_HUB_API_URL || 'http://localhost:8090';
    const apiUrl = `${inovaHubUrl}/api/escalacoes/solicitacoes/auto-status`;
    
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
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Status atualizado com sucesso:`, data);
      } else {
        const errorText = await response.text();
        console.error(`❌ Erro ao atualizar status: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error(`❌ Erro ao chamar API do Inova-Hub:`, error.message);
    }
  } catch (error) {
    console.error(`❌ Erro ao processar reação:`, error);
  }
});
```

### 2. Configurar Variável de Ambiente

No serviço WhatsApp, adicione a variável de ambiente:

```bash
INOVA_HUB_API_URL=http://localhost:8090
# Ou em produção:
INOVA_HUB_API_URL=https://velohub-278491073220.us-east1.run.app
```

### 3. Formato da Requisição

O endpoint espera um POST com o seguinte formato:

```json
{
  "waMessageId": "3EB0C767F26C747C5A30",
  "reactor": "5511999999999@s.whatsapp.net",
  "reaction": "✅"
}
```

**Campos:**
- `waMessageId` (obrigatório): ID da mensagem do WhatsApp que foi reagida
- `reactor` (opcional): Número/JID de quem reagiu
- `reaction` (opcional): Emoji da reação (✅ ou ❌)
- `status` (opcional): Status direto (se não fornecer, será inferido da reação)

### 4. Mapeamento de Status

- ✅ → Status: `"feito"`
- ❌ → Status: `"não feito"`

### 5. Teste

Para testar:
1. Envie uma solicitação via WhatsApp
2. Reaja à mensagem com ✅ ou ❌
3. Verifique se o status foi atualizado no painel de escalações

## Endpoint do Inova-Hub

**URL:** `POST /api/escalacoes/solicitacoes/auto-status`

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "status": "feito",
    "respondedAt": "2025-01-31T10:00:00.000Z",
    "respondedBy": "5511999999999",
    ...
  }
}
```

**Resposta de Erro:**
```json
{
  "success": false,
  "error": "waMessageId é obrigatório"
}
```

## Notas Importantes

1. O endpoint busca a solicitação por `waMessageId` (campo direto) ou em `payload.messageIds` (array)
2. Se a solicitação não for encontrada, retorna 404
3. O status é atualizado automaticamente com `respondedAt` e `respondedBy`
4. Logs são registrados automaticamente via `userActivityLogger`

