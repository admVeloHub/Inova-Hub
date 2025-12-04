# Configuração do Feed Social

## 📋 Descrição

O Feed Social integra vídeos do YouTube (completos e shorts) e postagens do Instagram da Velotax em uma única página moderna e fluida.

## 🔧 Configuração

### Variáveis de Ambiente Necessárias

#### YouTube API

1. **Obter API Key do YouTube:**
   - Acesse: https://console.cloud.google.com/
   - Crie um projeto ou selecione um existente
   - Ative a "YouTube Data API v3"
   - Crie uma credencial (API Key)
   - Copie a chave gerada

2. **Obter Channel ID:**
   - Acesse o canal do YouTube da Velotax
   - O Channel ID pode ser encontrado na URL ou nas configurações do canal
   - Exemplo: `UCvelotax` ou `@velotax`

3. **Configurar variáveis:**
   ```env
   YOUTUBE_API_KEY=sua-chave-api-aqui
   YOUTUBE_CHANNEL_ID=ID-do-canal-aqui
   ```

#### Instagram API

1. **Criar App no Facebook Developers:**
   - Acesse: https://developers.facebook.com/
   - Crie um novo app
   - Adicione o produto "Instagram Basic Display"
   - Configure as permissões necessárias

2. **Obter Access Token:**
   - Use o Instagram Basic Display API
   - Gere um token de acesso de longa duração
   - Copie o token gerado

3. **Obter User ID:**
   - Use a API do Instagram para obter o ID do usuário
   - Ou encontre nas configurações do app

4. **Configurar variáveis:**
   ```env
   INSTAGRAM_ACCESS_TOKEN=seu-token-aqui
   INSTAGRAM_USER_ID=id-do-usuario-aqui
   ```

### Configuração Local (Desenvolvimento)

Edite o arquivo `backend/config-local.js`:

```javascript
YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || 'sua-chave-aqui',
YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID || 'ID-do-canal-aqui',
INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN || 'seu-token-aqui',
INSTAGRAM_USER_ID: process.env.INSTAGRAM_USER_ID || 'id-usuario-aqui'
```

### Configuração em Produção

Configure as variáveis de ambiente no seu provedor de hospedagem (Google Cloud, Render, etc.):

- `YOUTUBE_API_KEY`
- `YOUTUBE_CHANNEL_ID`
- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_USER_ID`

## 🎨 Funcionalidades

### Feed Integrado
- ✅ Vídeos completos do YouTube
- ✅ YouTube Shorts (detectados automaticamente)
- ✅ Postagens do Instagram
- ✅ Ordenação por data (mais recentes primeiro)
- ✅ Filtros por tipo de conteúdo

### Design Moderno
- ✅ Layout tipo feed social
- ✅ Cards responsivos
- ✅ Modal para reprodução de vídeos
- ✅ Thumbnails automáticos
- ✅ Animações suaves

### Tabs de Filtro
- **Tudo**: Mostra todos os conteúdos
- **Vídeos**: Apenas vídeos completos do YouTube
- **Shorts**: Apenas YouTube Shorts
- **Instagram**: Apenas postagens do Instagram

## 📡 Endpoints da API

### GET /api/feed/youtube
Retorna os vídeos do canal YouTube configurado.

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "video-id",
      "type": "youtube",
      "videoId": "video-id",
      "title": "Título do vídeo",
      "description": "Descrição",
      "thumbnail": "url-thumbnail",
      "channelTitle": "Velotax",
      "viewCount": "1000",
      "publishedAt": "2025-01-31T00:00:00Z",
      "isShort": false
    }
  ]
}
```

### GET /api/feed/instagram
Retorna as postagens do Instagram configurado.

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "post-id",
      "type": "instagram",
      "mediaUrl": "url-imagem",
      "caption": "Legenda do post",
      "timestamp": "2025-01-31T00:00:00Z",
      "permalink": "url-post"
    }
  ]
}
```

## 🚀 Uso

1. Configure as variáveis de ambiente
2. Acesse a página "Feed" no menu de navegação
3. Use as tabs para filtrar o conteúdo desejado
4. Clique em um vídeo para reproduzir no modal
5. Visualize postagens do Instagram diretamente no feed

## ⚠️ Notas Importantes

- **Sem API Keys**: Se as chaves não estiverem configuradas, o sistema retorna dados mock para desenvolvimento
- **Rate Limits**: Respeite os limites de requisições das APIs do YouTube e Instagram
- **Tokens**: Tokens do Instagram expiram periodicamente - renove quando necessário
- **Shorts**: A detecção de shorts é baseada na duração do vídeo (< 60 segundos)

## 🔄 Atualização

O feed é atualizado automaticamente ao carregar a página. Para forçar atualização, recarregue a página.

