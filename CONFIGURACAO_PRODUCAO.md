# ✅ Configuração OAuth para Produção

## 🔧 Configuração Aplicada

### Credenciais OAuth
Configure via variáveis de ambiente no serviço de hospedagem (Google Cloud Run):
- **GOOGLE_CLIENT_ID**: Seu Client ID OAuth
- **GOOGLE_CLIENT_SECRET**: Seu Client Secret OAuth
- **YOUTUBE_API_KEY**: Sua API Key do YouTube

### URLs Configuradas
- **API URL (Produção)**: `https://velohub-278491073220.us-east1.run.app`
- **Callback URL**: `https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`
- **Frontend URL**: `https://velohub-278491073220.us-east1.run.app`

## ✅ Verificações no Google Cloud Console

Certifique-se de que no Google Cloud Console está configurado:

1. **URIs de redirecionamento autorizados:**
   ```
   https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
   ```

2. **Tipo de cliente**: Aplicativo da Web

3. **YouTube Data API v3**: Ativada

## 🧪 Teste em Produção

1. Acesse: https://velohub-278491073220.us-east1.run.app/feed
2. Clique em "Conectar YouTube" (botão no topo)
3. Deve redirecionar para o Google sem erro
4. Autorize o acesso
5. Deve retornar ao feed com sucesso
6. Agora você pode curtir vídeos oficialmente no YouTube!

## 📝 Logs Esperados

Ao iniciar o backend, você deve ver:

```
🔧 [OAUTH2 CLIENT] Criando cliente:
  - Client ID: 866929285541-eooa...
  - Client Secret: ***CONFIGURADO***
  - Base URL: https://velohub-278491073220.us-east1.run.app
  - Callback URL: https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

## ⚠️ Importante

- As credenciais estão configuradas no `config-local.js` para produção
- O backend foi reiniciado com as novas configurações
- O callback URL está configurado para produção

