/**
 * Script para testar a API do Instagram e obter User ID
 * Execute: node backend/scripts/test-instagram-api.js
 */

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';

if (!INSTAGRAM_ACCESS_TOKEN) {
  console.error('❌ INSTAGRAM_ACCESS_TOKEN não configurado!');
  console.log('Configure a variável de ambiente ou passe como argumento:');
  console.log('INSTAGRAM_ACCESS_TOKEN=seu-token node backend/scripts/test-instagram-api.js');
  process.exit(1);
}

async function testInstagramAPI() {
  try {
    console.log('🔍 Testando API do Instagram...\n');

    // 1. Obter informações do usuário (incluindo User ID)
    console.log('1️⃣ Obtendo informações do usuário...');
    const userUrl = `https://graph.instagram.com/me?fields=id,username,account_type&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    const userResponse = await fetch(userUrl);
    const userData = await userResponse.json();

    if (userData.error) {
      console.error('❌ Erro:', userData.error);
      return;
    }

    console.log('✅ Usuário encontrado:');
    console.log('   User ID:', userData.id);
    console.log('   Username:', userData.username);
    console.log('   Tipo de conta:', userData.account_type);
    console.log('');

    // 2. Obter postagens
    console.log('2️⃣ Obtendo postagens...');
    const mediaUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=5`;
    const mediaResponse = await fetch(mediaUrl);
    const mediaData = await mediaResponse.json();

    if (mediaData.error) {
      console.error('❌ Erro:', mediaData.error);
      return;
    }

    console.log(`✅ ${mediaData.data.length} postagens encontradas:\n`);
    mediaData.data.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.caption ? post.caption.substring(0, 50) + '...' : 'Sem caption'}`);
      console.log(`      Tipo: ${post.media_type}`);
      console.log(`      Data: ${new Date(post.timestamp).toLocaleDateString('pt-BR')}`);
      console.log('');
    });

    // 3. Resumo
    console.log('📋 Resumo da Configuração:');
    console.log('   INSTAGRAM_ACCESS_TOKEN:', INSTAGRAM_ACCESS_TOKEN.substring(0, 20) + '...');
    console.log('   INSTAGRAM_USER_ID:', userData.id);
    console.log('   INSTAGRAM_USERNAME:', userData.username);
    console.log('');
    console.log('✅ API do Instagram funcionando corretamente!');

  } catch (error) {
    console.error('❌ Erro ao testar API:', error.message);
  }
}

testInstagramAPI();

