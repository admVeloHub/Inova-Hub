# Como Funcionam os Likes Oficiais no YouTube

## ✅ Sistema Implementado

Os likes agora são **contabilizados oficialmente** na API do YouTube usando OAuth 2.0.

## 🔐 Como Funciona

### 1. Autenticação OAuth do YouTube

Quando o usuário clica em "Curtir" pela primeira vez:

1. **Sistema verifica** se o usuário está autenticado no YouTube
2. **Se não estiver**, mostra um modal pedindo autorização
3. **Usuário autoriza** o acesso à conta do Google/YouTube
4. **Token de acesso** é armazenado no backend
5. **Próximos likes** são registrados oficialmente no YouTube

### 2. Fluxo de Like Oficial

```
Usuário clica em "Curtir"
    ↓
Sistema verifica autenticação
    ↓
Se autenticado → Chama API do YouTube
    ↓
YouTube registra like oficialmente
    ↓
Contagem atualizada no YouTube
```

### 3. Renovação Automática de Tokens

- Tokens expiram após 1 hora
- Sistema renova automaticamente usando refresh token
- Usuário não precisa reautenticar constantemente

## 🎯 Endpoints Criados

### GET `/api/feed/youtube/oauth`
Inicia o fluxo de autenticação OAuth do YouTube.

**Parâmetros:**
- `userId` (query): Email do usuário

**Resposta:**
```json
{
  "success": true,
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### GET `/api/feed/youtube/oauth/callback`
Callback do OAuth (chamado pelo Google após autorização).

### GET `/api/feed/youtube/oauth/status`
Verifica se o usuário está autenticado.

**Parâmetros:**
- `userId` (query): Email do usuário

**Resposta:**
```json
{
  "success": true,
  "authenticated": true
}
```

### POST `/api/feed/youtube/like`
Registra like oficialmente no YouTube.

**Body:**
```json
{
  "videoId": "abc123",
  "userId": "usuario@email.com"
}
```

**Resposta (sucesso):**
```json
{
  "success": true,
  "message": "Like registrado oficialmente no YouTube!",
  "videoId": "abc123"
}
```

**Resposta (precisa autenticar):**
```json
{
  "success": false,
  "requiresAuth": true,
  "authUrl": "http://localhost:8090/api/feed/youtube/oauth?userId=..."
}
```

## 🔧 Configuração Necessária

### Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Vá em **APIs e Serviços** → **Credenciais**
3. Configure **URIs de redirecionamento autorizados**:
   - `http://localhost:8090/api/feed/youtube/oauth/callback` (desenvolvimento)
   - `https://seu-dominio.com/api/feed/youtube/oauth/callback` (produção)

### Variáveis de Ambiente

Já configuradas no `config-local.js`:
- `GOOGLE_CLIENT_ID` ✅
- `GOOGLE_CLIENT_SECRET` ✅
- `INOVA_HUB_API_URL` ✅

## 📱 Experiência do Usuário

### Primeira Vez
1. Usuário clica em "Curtir"
2. Modal aparece: "Autentique-se no YouTube"
3. Usuário clica em "Autorizar YouTube"
4. Redirecionado para Google (login)
5. Autoriza acesso
6. Retorna ao feed
7. Like é registrado oficialmente

### Próximas Vezes
1. Usuário clica em "Curtir"
2. Like é registrado instantaneamente no YouTube ✅
3. Contagem oficial atualizada

## ⚠️ Importante

- **Tokens são armazenados em memória** (Map) - em produção, usar MongoDB
- **Cada usuário precisa autorizar uma vez**
- **Tokens expiram em 1 hora**, mas são renovados automaticamente
- **Refresh tokens** permitem renovação sem reautenticação

## 🚀 Próximos Passos (Opcional)

Para produção, considere:
1. Armazenar tokens no MongoDB (em vez de Map)
2. Adicionar logout/revogação de tokens
3. Cache de status de autenticação
4. Logs de likes para analytics

## ✅ Status Atual

- ✅ OAuth do YouTube implementado
- ✅ Likes oficiais funcionando
- ✅ Renovação automática de tokens
- ✅ Frontend integrado
- ✅ Modal de autenticação
- ✅ Banner informativo

**Os likes agora são contabilizados oficialmente no YouTube!** 🎉

