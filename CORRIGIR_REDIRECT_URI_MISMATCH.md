# 🔧 Corrigir Erro: redirect_uri_mismatch

## ❌ Erro Atual

```
Erro 400: redirect_uri_mismatch
```

## ✅ Solução

A URL de callback no código **DEVE SER EXATAMENTE IGUAL** à configurada no Google Cloud Console.

### URL que o código está usando:

```
https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

## 📋 Passo a Passo para Corrigir

### 1. Acesse Google Cloud Console

1. Vá para: https://console.cloud.google.com/apis/credentials
2. Selecione o projeto correto
3. Clique no **OAuth 2.0 Client ID**: `866929285541-eooa33671afun3lg68pp0gp7o5g108qd`

### 2. Verifique/Adicione a URL de Redirecionamento

Na seção **"URIs de redirecionamento autorizados"**, você DEVE ter EXATAMENTE esta URL:

```
https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

### 3. Verificações Importantes

✅ **Deve começar com `https://`** (não `http://`)  
✅ **Sem porta** (não `:8090` ou `:8080`)  
✅ **Caminho completo**: `/api/feed/youtube/oauth/callback`  
✅ **Sem espaços** antes ou depois  
✅ **Sem barra no final** (não `/callback/`)  

### 4. Se a URL não estiver lá:

1. Clique em **"+ Adicionar URI"**
2. Cole EXATAMENTE: `https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`
3. Clique em **Salvar**

### 5. Aguarde a Propagação

Após salvar, pode levar **1-5 minutos** para as mudanças entrarem em vigor.

## 🔍 Debug

Após fazer o deploy, verifique os logs do backend. Você deve ver:

```
🔧 [OAUTH2 CLIENT] Criando cliente:
  - Base URL: https://velohub-278491073220.us-east1.run.app
  - Callback URL: https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

**Essa URL deve estar EXATAMENTE igual no Google Cloud Console!**

## ⚠️ Erros Comuns

### ❌ Errado:
```
http://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```
(usando http:// em vez de https://)

### ❌ Errado:
```
https://velohub-278491073220.us-east1.run.app:8090/api/feed/youtube/oauth/callback
```
(tem porta :8090)

### ❌ Errado:
```
https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback/
```
(tem barra no final)

### ✅ Correto:
```
https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

## 🧪 Teste

Após configurar corretamente:

1. Aguarde 1-5 minutos
2. Acesse: https://velohub-278491073220.us-east1.run.app/feed
3. Clique em "Conectar YouTube"
4. Deve funcionar sem erro!

