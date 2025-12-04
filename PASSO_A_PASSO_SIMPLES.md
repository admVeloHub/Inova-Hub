# 🚀 Passo a Passo Simples: Implementar Reações do WhatsApp

## 📌 Resumo Rápido

Você precisa fazer **3 coisas**:
1. ✅ Adicionar código no WhatsApp para escutar reações
2. ✅ Configurar variável de ambiente `INOVA_HUB_API_URL`
3. ✅ Reiniciar o serviço WhatsApp

---

## 📝 PASSO 1: Adicionar Código no WhatsApp

### 1.1. Encontrar o arquivo

Procure o arquivo principal do seu serviço WhatsApp (geralmente `index.js` ou `server.js`).

### 1.2. Localizar onde o socket é criado

Procure por algo assim:
```javascript
const sock = makeWASocket({ ... });
```

### 1.3. Adicionar o código

**IMPORTANTE:** Adicione o código **DEPOIS** de criar o socket, mas **ANTES** de qualquer outro código.

**Copie e cole este código:**

```javascript
// ===========================================
// LISTENER DE REAÇÕES DO WHATSAPP
// ===========================================
const INOVA_HUB_API_URL = process.env.INOVA_HUB_API_URL || 'http://localhost:8090';

sock.ev.on('messages.reaction', async (reactionUpdate) => {
  try {
    const { key, reaction } = reactionUpdate;
    
    if (!key || !key.id || !reaction || !reaction.text) {
      return;
    }
    
    const emoji = reaction.text;
    const waMessageId = key.id;
    const reactor = key.participant || key.remoteJid;
    
    // Só processar ✅ e ❌
    if (emoji !== '✅' && emoji !== '❌') {
      return;
    }
    
    console.log(`[REAÇÕES] Reação ${emoji} na mensagem ${waMessageId}`);
    
    const response = await fetch(`${INOVA_HUB_API_URL}/api/escalacoes/solicitacoes/auto-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        waMessageId: waMessageId,
        reactor: reactor,
        reaction: emoji
      }),
      signal: AbortSignal.timeout(10000)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`[REAÇÕES] ✅ Status atualizado: ${data.data?.status}`);
    } else {
      console.error(`[REAÇÕES] ❌ Erro: ${response.status}`);
    }
  } catch (error) {
    console.error(`[REAÇÕES] ❌ Erro:`, error.message);
  }
});

console.log('[REAÇÕES] Listener configurado');
```

### 1.4. Onde colocar exatamente?

```javascript
// Seu código atual:
const sock = makeWASocket({ ... });

// ⬇️ ADICIONE O CÓDIGO AQUI ⬇️
// (cole o código do listener aqui)

// Resto do seu código...
sock.ev.on('connection.update', ...);
```

---

## ⚙️ PASSO 2: Configurar Variável de Ambiente

### Opção A: Arquivo .env (Local)

1. Abra o arquivo `.env` do seu serviço WhatsApp
2. Adicione esta linha:
   ```bash
   INOVA_HUB_API_URL=http://localhost:8090
   ```
3. Salve o arquivo

### Opção B: Servidor (Render, Railway, Heroku, etc.)

1. Acesse o painel do seu serviço
2. Vá em **Environment Variables** ou **Config Vars**
3. Clique em **Add Variable**
4. Preencha:
   - **Key:** `INOVA_HUB_API_URL`
   - **Value:** `https://velohub-278491073220.us-east1.run.app`
5. Salve

### Valores para diferentes ambientes:

| Ambiente | Valor |
|----------|-------|
| **Local** | `http://localhost:8090` |
| **Produção** | `https://velohub-278491073220.us-east1.run.app` |

---

## 🔄 PASSO 3: Reiniciar o Serviço

### Se estiver rodando localmente:
```bash
# Pare o serviço (Ctrl+C)
# Depois inicie novamente:
npm start
# ou
node index.js
```

### Se estiver em servidor (Render, Railway, etc.):
- O servidor reinicia automaticamente quando você salva as variáveis de ambiente
- Ou clique em **Restart** no painel

---

## ✅ PASSO 4: Testar

### 4.1. Verificar se está funcionando

Ao iniciar o serviço, você deve ver nos logs:
```
[REAÇÕES] Listener configurado
```

### 4.2. Testar com uma reação

1. **Envie uma solicitação** pelo Inova-Hub
2. **Abra o WhatsApp** e encontre a mensagem
3. **Reaja com ✅ ou ❌**
4. **Verifique os logs** do WhatsApp:
   ```
   [REAÇÕES] Reação ✅ na mensagem 3EB0C767F26C747C5A30
   [REAÇÕES] ✅ Status atualizado: feito
   ```
5. **Verifique no Inova-Hub** se o status mudou

---

## 🐛 Problemas Comuns

### ❌ "Listener configurado" não aparece nos logs
- ✅ Verifique se o código foi adicionado corretamente
- ✅ Verifique se o serviço foi reiniciado

### ❌ "Erro ao chamar API do Inova-Hub"
- ✅ Verifique se `INOVA_HUB_API_URL` está configurada
- ✅ Verifique se o Inova-Hub está rodando
- ✅ Teste a URL manualmente no navegador

### ❌ Status não atualiza no Inova-Hub
- ✅ Verifique se o `waMessageId` está correto
- ✅ Verifique os logs do Inova-Hub para erros
- ✅ Verifique se a solicitação existe no banco de dados

---

## 📋 Checklist Final

- [ ] Código do listener adicionado ao WhatsApp
- [ ] Variável `INOVA_HUB_API_URL` configurada
- [ ] Serviço WhatsApp reiniciado
- [ ] Logs mostram "Listener configurado"
- [ ] Teste com ✅ funcionou
- [ ] Teste com ❌ funcionou
- [ ] Status atualiza no Inova-Hub

---

## 🆘 Precisa de Ajuda?

Se ainda tiver problemas:

1. **Verifique os logs** do WhatsApp
2. **Verifique os logs** do Inova-Hub
3. **Teste a API manualmente:**
   ```bash
   curl -X POST http://localhost:8090/api/escalacoes/solicitacoes/auto-status \
     -H "Content-Type: application/json" \
     -d '{"waMessageId": "TESTE", "reaction": "✅"}'
   ```

---

## 📚 Arquivos de Referência

- **Guia Completo:** `GUIA_IMPLEMENTACAO_REACOES.md`
- **Exemplo de Código:** `EXEMPLO_CODIGO_COMPLETO.js`
- **Código do Listener:** `EXEMPLO_WHATSAPP_REACOES.js`

