# Diagnóstico: Solicitações não chegam no WhatsApp

## Problema
As solicitações não estão chegando no WhatsApp e nem aparecem nos logs do Render.

## Verificações Necessárias

### 1. Verificar Configuração do WhatsApp

No arquivo `backend/config-local.js` ou variáveis de ambiente, verificar:

```javascript
WHATSAPP_API_URL= // URL da API WhatsApp (ex: https://whatsapp-api-y40p.onrender.com)
WHATSAPP_DEFAULT_JID= // JID do grupo (ex: 120363400851545835@g.us)
```

### 2. Verificar Logs do Backend

Ao criar uma solicitação, verificar os logs do backend. Deve aparecer:

```
[WHATSAPP DEBUG] Verificando configuração: {
  WHATSAPP_API_URL: '✅ Configurado' ou '❌ Não configurado',
  WHATSAPP_DEFAULT_JID: '✅ Configurado' ou '❌ Não configurado',
  mensagemTexto: '✅ Existe' ou '❌ Não existe'
}
```

### 3. Possíveis Causas

#### Causa 1: Variáveis não configuradas
**Solução:** Adicionar no `backend/config-local.js`:
```javascript
WHATSAPP_API_URL: process.env.WHATSAPP_API_URL || 'https://whatsapp-api-y40p.onrender.com',
WHATSAPP_DEFAULT_JID: process.env.WHATSAPP_DEFAULT_JID || '120363400851545835@g.us',
```

#### Causa 2: WhatsApp API não está rodando
**Solução:** Verificar se o serviço WhatsApp está online e conectado

#### Causa 3: mensagemTexto não está sendo enviado
**Solução:** Verificar se o frontend está enviando `mensagemTexto` no payload

### 4. Teste Manual

Testar diretamente a API do WhatsApp:

```bash
curl -X POST https://whatsapp-api-y40p.onrender.com/send \
  -H "Content-Type: application/json" \
  -d '{
    "jid": "120363400851545835@g.us",
    "mensagem": "Teste de mensagem"
  }'
```

### 5. Verificar Logs do Render

No painel do Render, verificar:
- Se o serviço WhatsApp está rodando
- Se há erros nos logs
- Se o WhatsApp está conectado (deve aparecer "WHATSAPP CONECTADO!")

## Próximos Passos

1. Verificar logs do backend ao criar solicitação
2. Verificar se variáveis estão configuradas
3. Testar API do WhatsApp diretamente
4. Verificar logs do Render do WhatsApp

