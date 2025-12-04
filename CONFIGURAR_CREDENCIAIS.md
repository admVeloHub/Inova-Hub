# 🔐 Como Configurar Credenciais OAuth

## ⚠️ IMPORTANTE

As credenciais OAuth **NÃO devem ser commitadas no Git**. Configure via variáveis de ambiente.

## 📋 Configuração

### Opção 1: Variáveis de Ambiente (Recomendado)

Crie um arquivo `.env` na pasta `backend/`:

```env
GOOGLE_CLIENT_ID=866929285541-eooa33671afun3lg68pp0gp7o5g108qd.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
YOUTUBE_API_KEY=AIzaSyD3G5iZv_3bx_q5pNphhRyKIsVRBo0Jwtk
INOVA_HUB_API_URL=http://localhost:8090
```

### Opção 2: Editar config-local.js (Apenas Local)

Edite `backend/config-local.js` e adicione os valores diretamente (apenas para desenvolvimento local):

```javascript
GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'seu-client-id-aqui',
GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'seu-secret-aqui',
```

## ✅ Credenciais Atuais

- **Client ID**: `866929285541-eooa33671afun3lg68pp0gp7o5g108qd.apps.googleusercontent.com`
- **Client Secret**: `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`
- **YouTube API Key**: `AIzaSyD3G5iZv_3bx_q5pNphhRyKIsVRBo0Jwtk`

## 🔒 Segurança

⚠️ **NUNCA** commite o arquivo `.env` ou credenciais no Git!

- Use `.gitignore` para ignorar `.env`
- Em produção, use secrets do serviço de hospedagem
- Rotacione as credenciais se expostas acidentalmente

