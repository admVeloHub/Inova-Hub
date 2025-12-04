# ⚠️ IMPORTANTE: Configurar Redirect URI Local

## O que fazer agora:

Você já criou o OAuth Client, mas precisa adicionar o **redirect URI para desenvolvimento local**.

### Passo a Passo:

1. **Acesse o Google Cloud Console:**
   - https://console.cloud.google.com/apis/credentials

2. **Encontre seu OAuth Client:**
   - Clique no Client ID: `866929285541-eooa33671afun3lg68pp0gp7o5g108qd.apps.googleusercontent.com`

3. **Adicione o Redirect URI Local:**
   - Na seção **"URIs de redirecionamento autorizados"**
   - Clique em **"+ Adicionar URI"**
   - Adicione: `http://localhost:8090/api/feed/youtube/oauth/callback`
   - Clique em **Salvar**

4. **Verifique o Redirect URI de Produção:**
   - Certifique-se de que está completo: `https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`
   - (No print, parece estar incompleto: `/api/feed/youtube/oa`)

### URIs que devem estar configuradas:

✅ **Produção:**
```
https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

✅ **Desenvolvimento Local:**
```
http://localhost:8090/api/feed/youtube/oauth/callback
```

## 🔐 Configurar Client Secret

1. No Google Cloud Console, na página do OAuth Client
2. Na seção **"Chaves secretas do cliente"**
3. Clique no ícone de **copiar** ao lado do secret mascarado
4. Cole o valor completo no `config-local.js` ou variável de ambiente

### No config-local.js:

```javascript
GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'COLE_O_SECRET_AQUI',
```

### Ou em variável de ambiente (.env):

```env
GOOGLE_CLIENT_SECRET=COLE_O_SECRET_AQUI
```

## ✅ Verificação

Após configurar:

1. Reinicie o backend
2. Verifique os logs - deve aparecer:
   ```
   🔍 [OAUTH DEBUG] Configuração:
     - GOOGLE_CLIENT_ID: 866929285541-eooa...
     - GOOGLE_CLIENT_SECRET: ***CONFIGURADO***
     - Callback URL: http://localhost:8090/api/feed/youtube/oauth/callback
   ```

3. Teste a autenticação:
   - Acesse a página Feed
   - Clique em "Conectar YouTube"
   - Deve funcionar sem erro "invalid_client"

## 📝 Resumo das Credenciais

- **Client ID**: `866929285541-eooa33671afun3lg68pp0gp7o5g108qd.apps.googleusercontent.com` ✅
- **Client Secret**: [Copiar do Google Cloud Console] ⚠️
- **YouTube API Key**: `AIzaSyD3G5iZv_3bx_q5pNphhRyKIsVRBo0Jwtk` ✅
- **Redirect URI Local**: [Adicionar no Console] ⚠️

