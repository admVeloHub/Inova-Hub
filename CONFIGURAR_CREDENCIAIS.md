# 🔐 Como Configurar Credenciais OAuth

## ⚠️ IMPORTANTE

As credenciais OAuth **NÃO devem ser commitadas no Git**. Configure via variáveis de ambiente.

## 📋 Configuração

### Opção 1: Variáveis de Ambiente (Recomendado)

Crie um arquivo `.env` na pasta `backend/`:

```env
GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-seu-secret-aqui
YOUTUBE_API_KEY=sua-api-key-aqui
INOVA_HUB_API_URL=http://localhost:8090
```

### Opção 2: Editar config-local.js (Apenas Local)

Edite `backend/config-local.js` e adicione os valores diretamente (apenas para desenvolvimento local):

```javascript
GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'seu-client-id-aqui',
GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'seu-secret-aqui',
```

## ✅ Onde Obter as Credenciais

1. **Google Cloud Console**: https://console.cloud.google.com/apis/credentials
   - Client ID e Client Secret do OAuth 2.0
2. **YouTube Data API**: https://console.cloud.google.com/apis/library/youtube.googleapis.com
   - API Key para acessar dados do YouTube

## 🔒 Segurança

⚠️ **NUNCA** commite o arquivo `.env` ou credenciais no Git!

- Use `.gitignore` para ignorar `.env`
- Em produção, use secrets do serviço de hospedagem
- Rotacione as credenciais se expostas acidentalmente

