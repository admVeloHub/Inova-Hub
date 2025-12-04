# Como Obter Token e User ID do Instagram

## 📱 Método 1: Instagram Basic Display API (Recomendado)

### Passo 1: Criar App no Facebook Developers

1. Acesse: https://developers.facebook.com/
2. Faça login com sua conta do Facebook
3. Clique em **"Meus Apps"** → **"Criar App"**
4. Selecione **"Consumidor"** como tipo de app
5. Preencha:
   - **Nome do App**: VeloHub Feed
   - **Email de contato**: seu email
   - Clique em **"Criar App"**

### Passo 2: Adicionar Produto Instagram Basic Display

1. No painel do app, vá em **"Adicionar Produto"**
2. Procure por **"Instagram Basic Display"**
3. Clique em **"Configurar"**

### Passo 3: Configurar OAuth Redirect URIs

1. Em **"Configurações Básicas"**, adicione:
   - **URIs de redirecionamento OAuth válidos**: 
     - `http://localhost:8090/auth/instagram/callback` (para desenvolvimento)
     - `https://seu-dominio.com/auth/instagram/callback` (para produção)
2. Salve as alterações

### Passo 4: Criar App do Instagram

1. Vá em **"Produtos"** → **"Instagram Basic Display"**
2. Clique em **"Criar novo app do Instagram"**
3. Preencha:
   - **Nome do app**: VeloHub Feed
   - **URL do site**: `https://velohub.velotax.com.br` (ou seu domínio)
   - **URL de redirecionamento OAuth**: `http://localhost:8090/auth/instagram/callback`
4. Clique em **"Criar"**

### Passo 5: Obter Access Token

1. No painel do app, vá em **"Ferramentas"** → **"Token de Acesso"**
2. Clique em **"Gerar Token"**
3. Autorize o app a acessar seu perfil do Instagram
4. Copie o **Token de Acesso** gerado

### Passo 6: Obter User ID

1. Use a API do Instagram para obter o User ID:
   ```
   GET https://graph.instagram.com/me?fields=id,username&access_token=SEU_TOKEN_AQUI
   ```
2. Ou use este endpoint no seu backend:
   ```javascript
   const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${INSTAGRAM_ACCESS_TOKEN}`);
   const data = await response.json();
   console.log('User ID:', data.id);
   console.log('Username:', data.username);
   ```

## 📱 Método 2: Instagram Graph API (Para Contas de Negócio)

Se o perfil `@velo_tax` for uma conta de negócio ou criador:

1. Conecte a conta do Instagram ao Facebook Page
2. Use a **Instagram Graph API** em vez da Basic Display
3. Obtenha o token através do Facebook Page

### Passos:

1. Vá em **"Produtos"** → **"Instagram Graph API"**
2. Conecte sua conta do Instagram
3. Obtenha o **Page Access Token**
4. Use o endpoint:
   ```
   GET https://graph.facebook.com/v18.0/{instagram-business-account-id}/media?access_token={page-access-token}
   ```

## 🔧 Configuração no Projeto

Depois de obter o token e user ID, configure no `config-local.js` ou variáveis de ambiente:

```javascript
INSTAGRAM_ACCESS_TOKEN: 'seu-token-aqui',
INSTAGRAM_USER_ID: 'id-do-usuario-aqui',
INSTAGRAM_USERNAME: 'velo_tax'
```

## ⚠️ Importante

- **Tokens expiram**: Tokens de curta duração expiram em 1 hora. Use tokens de longa duração (60 dias) ou renove automaticamente
- **Limitações**: A API do Instagram tem limites de requisições (200 por hora por usuário)
- **Permissões**: Certifique-se de que o app tem permissão para ler postagens públicas

## 🧪 Teste Rápido

Após configurar, teste com:

```bash
curl "https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp&access_token=SEU_TOKEN"
```

## 📚 Documentação Oficial

- Instagram Basic Display: https://developers.facebook.com/docs/instagram-basic-display-api
- Instagram Graph API: https://developers.facebook.com/docs/instagram-api

