# Guia Rápido - Configuração do Feed Social

## 📺 Canais da Velotax

- **YouTube**: https://www.youtube.com/@canalvelotax
- **Instagram**: https://www.instagram.com/velo_tax/

## ✅ Sim, conseguimos puxar os vídeos e postagens!

O sistema já está configurado para buscar conteúdo desses canais. Você só precisa configurar as chaves de API.

## 🔑 Configuração Rápida

### 1. YouTube API

1. Acesse: https://console.cloud.google.com/
2. Crie um projeto ou selecione um existente
3. Ative a "YouTube Data API v3"
4. Crie uma credencial (API Key)
5. Configure no `.env` ou `config-local.js`:
   ```env
   YOUTUBE_API_KEY=sua-chave-aqui
   YOUTUBE_USERNAME=@canalvelotax
   ```

**Nota**: O sistema busca automaticamente o Channel ID pelo username `@canalvelotax`. Se preferir, você pode fornecer o Channel ID diretamente.

### 2. Instagram API

1. Acesse: https://developers.facebook.com/
2. Crie um app
3. Adicione o produto "Instagram Basic Display"
4. Configure as permissões
5. Gere um Access Token
6. Configure no `.env` ou `config-local.js`:
   ```env
   INSTAGRAM_ACCESS_TOKEN=seu-token-aqui
   INSTAGRAM_USER_ID=id-do-usuario
   INSTAGRAM_USERNAME=velo_tax
   ```

## 🎯 Como Funciona

### YouTube
- Busca os últimos 50 vídeos do canal `@canalvelotax`
- Detecta automaticamente Shorts (vídeos < 60 segundos)
- Mostra thumbnails, títulos, visualizações e datas

### Instagram
- Busca as últimas 50 postagens do perfil `velo_tax`
- Mostra imagens, captions e timestamps
- Layout adaptado para posts do Instagram

## 🚀 Teste Rápido

1. Configure as variáveis de ambiente
2. Reinicie o backend
3. Acesse a página "Feed" no menu
4. Os vídeos e postagens devem aparecer automaticamente!

## ⚠️ Sem API Keys?

Se as chaves não estiverem configuradas, o sistema retorna dados mock para desenvolvimento, permitindo testar o layout sem precisar das APIs.

## 📝 Variáveis de Ambiente

Adicione ao seu `.env` ou configure no `config-local.js`:

```env
# YouTube
YOUTUBE_API_KEY=sua-chave-api-youtube
YOUTUBE_USERNAME=@canalvelotax
YOUTUBE_CHANNEL_ID=  # Opcional - será buscado automaticamente

# Instagram
INSTAGRAM_ACCESS_TOKEN=seu-token-instagram
INSTAGRAM_USER_ID=id-do-usuario-instagram
INSTAGRAM_USERNAME=velo_tax
```

## 🔄 Atualização Automática

O feed é atualizado automaticamente ao carregar a página. Os dados são buscados diretamente das APIs do YouTube e Instagram em tempo real.

