# ✅ Configuração OAuth Completa

## Credenciais Configuradas

- **Client ID**: `866929285541-eooa33671afun3lg68pp0gp7o5g108qd.apps.googleusercontent.com` ✅
- **Client Secret**: `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` ✅
- **YouTube API Key**: `AIzaSyD3G5iZv_3bx_q5pNphhRyKIsVRBo0Jwtk` ✅
- **Redirect URI Local**: `http://localhost:8090/api/feed/youtube/oauth/callback` ✅

## 🧪 Como Testar

### 1. Reiniciar o Backend

```bash
cd backend
npm start
```

Ou se estiver usando nodemon:

```bash
npm run dev
```

### 2. Verificar Logs

Ao iniciar, você deve ver nos logs:

```
🔍 [OAUTH DEBUG] Configuração:
  - GOOGLE_CLIENT_ID: 866929285541-eooa...
  - GOOGLE_CLIENT_SECRET: ***CONFIGURADO***
  - Callback URL: http://localhost:8090/api/feed/youtube/oauth/callback
```

### 3. Testar no Frontend

1. Acesse a página **Feed** no frontend
2. Clique no botão **"Conectar YouTube"** (no topo da página)
3. Deve redirecionar para o Google sem erro
4. Autorize o acesso
5. Deve retornar ao feed com sucesso
6. Agora você pode curtir vídeos oficialmente no YouTube!

## ✅ Checklist de Verificação

- [x] Client ID configurado
- [x] Client Secret configurado
- [x] Redirect URI local adicionado no Google Cloud Console
- [x] YouTube API Key atualizada
- [ ] Backend reiniciado
- [ ] Teste de autenticação realizado
- [ ] Likes funcionando oficialmente

## 🐛 Se Ainda Der Erro

### Erro: "invalid_client"
- Verifique se o Client ID está correto
- Verifique se o Client Secret está correto (sem espaços extras)
- Certifique-se de que o redirect URI está EXATAMENTE como configurado

### Erro: "redirect_uri_mismatch"
- Verifique se adicionou o redirect URI no Google Cloud Console
- Certifique-se de que está usando `http://localhost:8090` (não `https`)
- Aguarde alguns minutos após adicionar (pode levar tempo para propagar)

### Erro: "access_denied"
- Verifique se a YouTube Data API v3 está ativada
- Verifique se os escopos estão configurados corretamente

## 🎉 Pronto!

Agora os likes serão contabilizados oficialmente no YouTube!

