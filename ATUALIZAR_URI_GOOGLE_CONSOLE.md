# ⚠️ IMPORTANTE: Atualizar URI no Google Cloud Console

## 🔧 URL Corrigida

A URL de produção correta é:
```
https://velohub-main-staging-278491073220.us-east1.run.app
```

## 📋 Ação Necessária

Você precisa atualizar a URI de redirecionamento no Google Cloud Console:

### Nova URI de Redirecionamento:

```
https://velohub-main-staging-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

## 🔧 Como Atualizar

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Clique no OAuth Client ID: `866929285541-eooa33671afun3lg68pp0gp7o5g108qd`
3. Na seção "URIs de redirecionamento autorizados":
   - **Remova** a URL antiga: `https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`
   - **Adicione** a nova URL: `https://velohub-main-staging-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`
4. Clique em **Salvar**
5. Aguarde 2-5 minutos

## ✅ Verificação

Após atualizar:

1. Acesse: https://velohub-main-staging-278491073220.us-east1.run.app/feed
2. Clique em "Conectar YouTube"
3. Deve funcionar sem erro!

## 📝 URLs Atualizadas

- **URL Base**: `https://velohub-main-staging-278491073220.us-east1.run.app`
- **Callback OAuth**: `https://velohub-main-staging-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`
- **Endpoint Debug**: `https://velohub-main-staging-278491073220.us-east1.run.app/api/feed/youtube/oauth/debug`

