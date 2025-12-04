// VeloHub V3 - Configuração Local para Testes
// VERSION: v1.0.0 | DATE: 2025-01-30 | AUTHOR: VeloHub Development Team

// Configuração para testes locais com dados reais
const config = {
  // MongoDB - Substitua pela sua URI real
  MONGO_ENV: process.env.MONGO_ENV || 'mongodb+srv://usuario:senha@cluster.mongodb.net/console_conteudo',
  
  // Servidor
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8090,
  
  // Google OAuth (para autenticação YouTube e SSO)
  // Obter em: https://console.cloud.google.com/apis/credentials
  // 1. Criar OAuth 2.0 Client ID (tipo: Aplicativo da Web)
  // 2. Adicionar URI de redirecionamento: http://localhost:8090/api/feed/youtube/oauth/callback
  // 3. Copiar Client ID e Client Secret
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '278491073220-eb4ogvn3aifu0ut9mq3rvu5r9r9l3137.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret-here',
  
  // INOVA_HUB_API_URL (para callbacks OAuth)
  // URL base da API - usado para callbacks do OAuth
  INOVA_HUB_API_URL: process.env.INOVA_HUB_API_URL || 'http://localhost:8090',
  
  // APIs de IA (opcional para testes de tickets)
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'sk-your-openai-key-here',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AI-your-gemini-key-here',
  
  // Configurações de teste
  LOCAL_TESTING: process.env.LOCAL_TESTING || 'false',
  
  // WhatsApp API (para módulo Escalações)
  WHATSAPP_API_URL: process.env.WHATSAPP_API_URL || 'https://whatsapp-api-y40p.onrender.com',
  WHATSAPP_DEFAULT_JID: process.env.WHATSAPP_DEFAULT_JID || process.env.WHATSAPP_JID || '120363400851545835@g.us',
  
  // Feed Social (YouTube e Instagram)
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || 'AIzaSyBA52XVYRzT4l19qwRv0WK3vmVfxUecAFc', // Chave da API do YouTube
  YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID || '', // ID do canal YouTube da Velotax (opcional, pode usar username)
  YOUTUBE_USERNAME: process.env.YOUTUBE_USERNAME || '@canalvelotax', // Username do canal (@canalvelotax)
  INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN || '', // Token de acesso do Instagram
  INSTAGRAM_USER_ID: process.env.INSTAGRAM_USER_ID || '', // ID do usuário Instagram
  INSTAGRAM_USERNAME: process.env.INSTAGRAM_USERNAME || 'velo_tax' // Username do Instagram (velo_tax)
};

// Definir variáveis de ambiente se não estiverem definidas
Object.keys(config).forEach(key => {
  if (!process.env[key]) {
    process.env[key] = config[key];
    console.log(`🔧 Definindo ${key}: ${key.includes('KEY') || key.includes('SECRET') ? '***' : config[key]}`);
  }
});

module.exports = config;
