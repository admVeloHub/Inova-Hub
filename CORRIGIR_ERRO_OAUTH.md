# Como Corrigir o Erro "invalid_client" no OAuth

## ❌ Erro: "The OAuth client was not found" / "invalid_client"

Este erro geralmente ocorre quando as credenciais OAuth não estão configuradas corretamente no Google Cloud Console.

## 🔧 Solução Passo a Passo

### 1. Verificar Credenciais no Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Selecione o projeto correto
3. Vá em **APIs e Serviços** → **Credenciais**
4. Encontre o **OAuth 2.0 Client ID** que você está usando
5. Clique para editar

### 2. Verificar Tipo de Cliente

O cliente OAuth deve ser do tipo **"Aplicativo da Web"** (Web application), não "Desktop" ou "Android".

### 3. Configurar URIs de Redirecionamento

Adicione estas URIs na seção **"URIs de redirecionamento autorizados"**:

**Para desenvolvimento local:**
```
http://localhost:8090/api/feed/youtube/oauth/callback
```

**Para produção:**
```
https://seu-dominio.com/api/feed/youtube/oauth/callback
https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

### 4. Verificar Client ID e Secret

1. No Google Cloud Console, copie o **Client ID** completo
2. Copie o **Client Secret**
3. Verifique se estão corretos no `config-local.js` ou variáveis de ambiente

### 5. Verificar Formato do Client ID

O Client ID deve ter o formato:
```
278491073220-eb4ogvn3aifu0ut9mq3rvu5r9r9l3137.apps.googleusercontent.com
```

### 6. Habilitar YouTube Data API v3

1. No Google Cloud Console, vá em **APIs e Serviços** → **Biblioteca**
2. Procure por **"YouTube Data API v3"**
3. Clique em **Ativar**

### 7. Verificar Escopo

O escopo necessário é:
```
https://www.googleapis.com/auth/youtube.force-ssl
```

## 🔍 Debug

Execute o backend e verifique os logs. Você verá:

```
🔍 [OAUTH DEBUG] Configuração:
  - GOOGLE_CLIENT_ID: 278491073220-eb4ogvn3a...
  - GOOGLE_CLIENT_SECRET: ***CONFIGURADO***
  - Callback URL: http://localhost:8090/api/feed/youtube/oauth/callback
```

Se algum estiver como "❌ NÃO CONFIGURADO", configure as variáveis de ambiente.

## ✅ Checklist

- [ ] Client ID está correto e completo
- [ ] Client Secret está correto
- [ ] Tipo de cliente é "Aplicativo da Web"
- [ ] URIs de redirecionamento estão configuradas
- [ ] YouTube Data API v3 está ativada
- [ ] Variáveis de ambiente estão configuradas

## 🚀 Teste

Após configurar, teste novamente:

1. Acesse a página Feed
2. Clique em "Conectar YouTube" (botão no topo)
3. Deve redirecionar para o Google sem erro
4. Autorize o acesso
5. Deve retornar ao feed com sucesso

## ⚠️ Erro Persiste?

Se o erro continuar:

1. Verifique se está usando o Client ID correto do projeto correto
2. Certifique-se de que o redirect URI está EXATAMENTE como configurado
3. Tente criar um novo OAuth Client ID
4. Verifique se não há espaços extras nas credenciais

