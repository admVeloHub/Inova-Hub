# Como Obter GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET

## 📋 Passo a Passo

### 1. Acessar Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Selecione o projeto correto (ou crie um novo)

### 2. Criar Credenciais OAuth 2.0

1. Vá em **APIs e Serviços** → **Credenciais**
2. Clique em **+ Criar credenciais** → **ID do cliente OAuth**
3. Se solicitado, configure a tela de consentimento OAuth primeiro

### 3. Configurar Tela de Consentimento (se necessário)

1. Vá em **APIs e Serviços** → **Tela de consentimento OAuth**
2. Escolha **Externo** (para testes) ou **Interno** (para Workspace)
3. Preencha:
   - Nome do app: `VeloHub`
   - Email de suporte: seu email
   - Email do desenvolvedor: seu email
4. Clique em **Salvar e continuar**
5. Adicione escopos:
   - `https://www.googleapis.com/auth/youtube.force-ssl`
6. Adicione usuários de teste (se necessário)
7. Finalize

### 4. Criar OAuth Client ID

1. Volte para **Credenciais**
2. Clique em **+ Criar credenciais** → **ID do cliente OAuth**
3. Configure:
   - **Tipo de aplicativo**: `Aplicativo da Web`
   - **Nome**: `VeloHub YouTube OAuth`
   - **URIs de redirecionamento autorizados**:
     ```
     http://localhost:8090/api/feed/youtube/oauth/callback
     ```
     (Para produção, adicione também a URL de produção)
4. Clique em **Criar**

### 5. Copiar Credenciais

Após criar, você verá:
- **ID do cliente**: `278491073220-xxxxx.apps.googleusercontent.com`
- **Segredo do cliente**: `GOCSPX-xxxxx`

### 6. Habilitar YouTube Data API v3

1. Vá em **APIs e Serviços** → **Biblioteca**
2. Procure por **"YouTube Data API v3"**
3. Clique em **Ativar**

### 7. Configurar no Projeto

#### Opção A: Variáveis de Ambiente (Recomendado)

Crie um arquivo `.env` na pasta `backend/`:

```env
GOOGLE_CLIENT_ID=278491073220-xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
INOVA_HUB_API_URL=http://localhost:8090
```

#### Opção B: Editar config-local.js

Edite `backend/config-local.js`:

```javascript
GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'SEU_CLIENT_ID_AQUI',
GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'SEU_CLIENT_SECRET_AQUI',
```

## ✅ Verificação

Após configurar, reinicie o backend e verifique os logs:

```
🔍 [OAUTH DEBUG] Configuração:
  - GOOGLE_CLIENT_ID: 278491073220-xxxxx...
  - GOOGLE_CLIENT_SECRET: ***CONFIGURADO***
  - Callback URL: http://localhost:8090/api/feed/youtube/oauth/callback
```

Se aparecer "❌ NÃO CONFIGURADO", verifique se as variáveis estão corretas.

## 🔒 Segurança

⚠️ **NUNCA** commite o `GOOGLE_CLIENT_SECRET` no Git!

- Use variáveis de ambiente
- Adicione `.env` ao `.gitignore`
- Em produção, use secrets do serviço de hospedagem

## 🐛 Problemas Comuns

### Erro: "invalid_client"
- Verifique se o Client ID está correto
- Verifique se o redirect URI está configurado exatamente como no código
- Certifique-se de que o tipo de cliente é "Aplicativo da Web"

### Erro: "redirect_uri_mismatch"
- O redirect URI no código deve ser EXATAMENTE igual ao configurado no Google Cloud Console
- Verifique se não há espaços ou caracteres extras

### Erro: "access_denied"
- Verifique se a YouTube Data API v3 está ativada
- Verifique se os escopos estão configurados corretamente

