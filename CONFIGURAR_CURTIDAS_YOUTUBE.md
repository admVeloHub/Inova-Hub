# 👍 Configurar Curtidas Oficiais do YouTube

## 📋 Pré-requisitos

1. ✅ Google OAuth 2.0 Client ID e Secret configurados
2. ✅ YouTube Data API v3 ativada
3. ✅ Redirect URI configurado no Google Cloud Console

## 🔧 Passo a Passo

### 1. Verificar Configuração OAuth

Acesse o endpoint de debug:
```
https://velohub-main-staging-278491073220.us-east1.run.app/api/feed/youtube/oauth/debug
```

Deve retornar:
- ✅ Client ID configurado
- ✅ Client Secret configurado
- ✅ Callback URL correto

### 2. Verificar Redirect URI no Google Cloud Console

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Clique no seu OAuth 2.0 Client ID
3. Verifique se está configurado:
   ```
   https://velohub-main-staging-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
   ```
4. **IMPORTANTE**: Deve ser EXATAMENTE assim:
   - ✅ Começa com `https://`
   - ✅ Sem porta (`:8090` ou `:8080`)
   - ✅ Sem barra no final
   - ✅ Caminho completo: `/api/feed/youtube/oauth/callback`

### 3. Testar Autenticação

1. Acesse o Feed: https://velohub-main-staging-278491073220.us-east1.run.app/feed
2. Clique em **"Conectar YouTube"**
3. Autorize o acesso ao YouTube
4. Você será redirecionado de volta ao Feed
5. Deve aparecer badge **"Conectado"**

### 4. Testar Curtidas

1. Clique no botão de ❤️ em qualquer vídeo
2. O like deve ser registrado oficialmente no YouTube
3. Verifique no YouTube se o like apareceu

## 🔍 Debug

### Verificar Status de Autenticação

Endpoint:
```
GET /api/feed/youtube/oauth/status?userId=seu-email@exemplo.com
```

Resposta esperada:
```json
{
  "success": true,
  "authenticated": true
}
```

### Logs do Backend

Os logs mostram:
- ✅ `👍 [YOUTUBE LIKE] Requisição recebida`
- ✅ `🔧 [YOUTUBE LIKE] OAuth2 client criado com sucesso`
- ✅ `👍 [YOUTUBE LIKE] Chamando API do YouTube para dar like`
- ✅ `✅ [YOUTUBE LIKE] Like oficial registrado no YouTube`

### Erros Comuns

#### 1. "Autenticação necessária"
- **Causa**: Usuário não autorizou o acesso
- **Solução**: Clique em "Conectar YouTube" e autorize

#### 2. "Token expirado"
- **Causa**: Token de acesso expirou (válido por 1 hora)
- **Solução**: Reautorizar o acesso

#### 3. "Permissão negada"
- **Causa**: Escopo OAuth não configurado corretamente
- **Solução**: Verificar se o escopo `youtube.force-ssl` está ativo

#### 4. "redirect_uri_mismatch"
- **Causa**: Redirect URI não corresponde ao configurado
- **Solução**: Verificar Redirect URI no Google Cloud Console

## 📝 Notas Importantes

1. **Tokens são armazenados em memória**: Ao reiniciar o servidor, usuários precisam reautenticar
2. **Refresh Token**: O sistema renova automaticamente tokens expirados
3. **Escopo necessário**: `https://www.googleapis.com/auth/youtube.force-ssl`
4. **Limite de likes**: Respeite os limites da API do YouTube

## 🧪 Teste Completo

1. ✅ Conectar YouTube (OAuth)
2. ✅ Verificar status de autenticação
3. ✅ Dar like em um vídeo
4. ✅ Verificar se like apareceu no YouTube
5. ✅ Verificar logs do backend

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs do backend
2. Verifique o console do navegador (F12)
3. Teste o endpoint de debug
4. Verifique as configurações no Google Cloud Console

