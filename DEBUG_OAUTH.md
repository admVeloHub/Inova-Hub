# 🔍 Debug do Erro "invalid_client"

## Problema

Erro 401: invalid_client - "The OAuth client was not found"

## Possíveis Causas

### 1. Client ID Incorreto
- Verifique se o Client ID está EXATAMENTE como no Google Cloud Console
- Não deve ter espaços extras
- Deve terminar com `.apps.googleusercontent.com`

**Formato do Client ID:**
```
[numero]-[string].apps.googleusercontent.com
```

### 2. Client Secret Incorreto
- Verifique se o Client Secret está completo
- Não deve ter espaços extras
- Deve começar com `GOCSPX-`

**Formato do Client Secret:**
```
GOCSPX-[string]
```

### 3. Redirect URI Não Configurado Corretamente

O redirect URI no Google Cloud Console deve ser EXATAMENTE:

```
http://localhost:8090/api/feed/youtube/oauth/callback
```

**Verificações:**
- ✅ Deve começar com `http://` (não `https://` para local)
- ✅ Porta `8090` (não `8080`)
- ✅ Caminho completo: `/api/feed/youtube/oauth/callback`
- ✅ Sem espaços extras
- ✅ Sem barra no final

### 4. Projeto Errado no Google Cloud Console

Certifique-se de que está usando o Client ID do projeto correto.

## 🔧 Como Verificar

### 1. Verificar Logs do Backend

Ao iniciar o backend, você deve ver:

```
🔍 [OAUTH DEBUG] Configuração completa:
  - GOOGLE_CLIENT_ID: [seu-client-id].apps.googleusercontent.com
  - GOOGLE_CLIENT_SECRET: ***CONFIGURADO***
  - Base URL: http://localhost:8090
  - Callback URL: http://localhost:8090/api/feed/youtube/oauth/callback
```

### 2. Verificar no Google Cloud Console

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Clique no seu Client ID OAuth
3. Verifique:
   - **Tipo**: Deve ser "Aplicativo da Web"
   - **URIs de redirecionamento**: Deve conter exatamente:
     ```
     http://localhost:8090/api/feed/youtube/oauth/callback
     ```

### 3. Testar URL de Autenticação

Ao clicar em "Conectar YouTube", a URL gerada deve conter:
- `client_id=[seu-client-id]`
- `redirect_uri=http%3A%2F%2Flocalhost%3A8090%2Fapi%2Ffeed%2Fyoutube%2Foauth%2Fcallback`

## ✅ Checklist

- [ ] Client ID está correto e completo
- [ ] Client Secret está correto e completo
- [ ] Redirect URI está configurado no Google Cloud Console
- [ ] Redirect URI está EXATAMENTE como no código (sem diferenças)
- [ ] Tipo de cliente é "Aplicativo da Web"
- [ ] YouTube Data API v3 está ativada
- [ ] Backend foi reiniciado após mudanças

## 🚀 Solução Rápida

1. **Copie o redirect URI exato dos logs:**
   ```
   http://localhost:8090/api/feed/youtube/oauth/callback
   ```

2. **No Google Cloud Console:**
   - Vá em Credenciais
   - Clique no Client ID
   - Na seção "URIs de redirecionamento autorizados"
   - Adicione EXATAMENTE: `http://localhost:8090/api/feed/youtube/oauth/callback`
   - Salve

3. **Aguarde 1-2 minutos** (pode levar tempo para propagar)

4. **Reinicie o backend**

5. **Teste novamente**

## 📝 Nota Importante

Se ainda não funcionar após seguir todos os passos:

1. Verifique se não há múltiplos projetos no Google Cloud Console
2. Certifique-se de que está usando o Client ID do projeto correto
3. Tente criar um novo OAuth Client ID do zero
4. Verifique se não há caracteres invisíveis ou espaços nas credenciais

