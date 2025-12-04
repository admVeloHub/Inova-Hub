# ⚠️ IMPORTANTE: Atualizar URI para Novo Client ID

## 🔧 Novo Client ID Configurado

- **Client ID**: `278491073220-eb4ogvn3aifu0ut9mq3rvu5r9r9l3137.apps.googleusercontent.com`
- **Client Secret**: `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`

## 📋 Ação Necessária no Google Cloud Console

Você precisa configurar a URI de redirecionamento para este novo Client ID:

### 1. Acesse Google Cloud Console

1. Vá para: https://console.cloud.google.com/apis/credentials
2. Encontre o OAuth Client ID: `278491073220-eb4ogvn3aifu0ut9mq3rvu5r9r9l3137`
3. Clique para editar

### 2. Adicione a URI de Redirecionamento

Na seção **"URIs de redirecionamento autorizados"**, adicione:

```
https://velohub-main-staging-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

### 3. Verificações

✅ Deve começar com `https://` (não `http://`)  
✅ Sem porta (`:8090` ou `:8080`)  
✅ Caminho completo: `/api/feed/youtube/oauth/callback`  
✅ Sem espaços antes ou depois  
✅ Sem barra no final  

### 4. Salvar e Aguardar

1. Clique em **Salvar**
2. Aguarde **2-5 minutos** para as mudanças entrarem em vigor

## ✅ Teste

Após configurar:

1. Acesse: https://velohub-main-staging-278491073220.us-east1.run.app/feed
2. Clique em "Conectar YouTube"
3. Deve funcionar sem erro!

## 📝 Nota

Se você tiver múltiplos OAuth Clients, certifique-se de configurar a URI no Client ID correto:
- ✅ `278491073220-eb4ogvn3aifu0ut9mq3rvu5r9r9l3137.apps.googleusercontent.com`
- ❌ Não use o outro Client ID (`866929285541-...`)

