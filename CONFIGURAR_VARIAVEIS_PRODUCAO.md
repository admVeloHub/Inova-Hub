# 🔐 Configurar Variáveis de Ambiente em Produção

## ⚠️ IMPORTANTE

As credenciais OAuth **DEVEM ser configuradas via variáveis de ambiente** no Google Cloud Run, não no código.

## 📋 Variáveis Necessárias

Configure estas variáveis de ambiente no Google Cloud Run:

### 1. Acesse Google Cloud Console

1. Vá para: https://console.cloud.google.com/
2. Selecione o projeto
3. Vá em **Cloud Run** → Selecione o serviço `velohub`
4. Clique em **Editar e implantar nova revisão**

### 2. Configure as Variáveis de Ambiente

Na seção **Variáveis e segredos**, adicione:

```
GOOGLE_CLIENT_ID=866929285541-eooa33671afun3lg68pp0gp7o5g108qd.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
YOUTUBE_API_KEY=AIzaSyD3G5iZv_3bx_q5pNphhRyKIsVRBo0Jwtk
INOVA_HUB_API_URL=https://velohub-278491073220.us-east1.run.app
NODE_ENV=production
```

### 3. Implantar Nova Revisão

Após adicionar as variáveis:
1. Clique em **Implantar**
2. Aguarde o deploy completar
3. Teste a autenticação OAuth

## ✅ Verificação

Após o deploy, os logs devem mostrar:

```
🔧 [OAUTH2 CLIENT] Criando cliente:
  - Client ID: 866929285541-eooa...
  - Client Secret: ***CONFIGURADO***
  - Base URL: https://velohub-278491073220.us-east1.run.app
  - Callback URL: https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

## 🔗 Links Úteis

- Google Cloud Run: https://console.cloud.google.com/run
- Google Cloud Console: https://console.cloud.google.com/

