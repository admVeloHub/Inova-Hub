/**
 * EXEMPLO COMPLETO: Código do WhatsApp com Listener de Reações
 * 
 * Este é um exemplo completo de como deve ficar o seu index.js do WhatsApp
 * após adicionar o listener de reações.
 * 
 * ATENÇÃO: Este é apenas um EXEMPLO. Adapte para o seu código real.
 */

const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const qrcode = require('qrcode-terminal');

const app = express();
app.use(express.json());

let sock = null;
let isConnected = false;
let reconnecting = false;

// ===========================================
// CONFIGURAÇÃO DA URL DO INOVA-HUB
// ===========================================
// Esta variável deve vir do arquivo .env ou variáveis de ambiente do servidor
const INOVA_HUB_API_URL = process.env.INOVA_HUB_API_URL || 'http://localhost:8090';

async function connect() {
  if (reconnecting) return;
  reconnecting = true;
  isConnected = false;

  const { state, saveCreds } = await useMultiFileAuthState('auth');
  
  sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 60000,
  });

  // ===========================================
  // LISTENER DE CONEXÃO (código existente)
  // ===========================================
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('\nESCANEIE O QR CODE AGORA:\n');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'open') {
      isConnected = true;
      reconnecting = false;
      console.log('\nWHATSAPP CONECTADO! API PRONTA!');
      const url = process.env.RENDER_EXTERNAL_URL || `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`;
      console.log(`API ONLINE: ${url}/send`);
    }

    if (connection === 'close') {
      isConnected = false;
      const status = lastDisconnect?.error?.output?.statusCode;
      if (status === DisconnectReason.loggedOut) {
        console.log('DESLOGADO → Apagando auth...');
        fs.rmSync('auth', { recursive: true, force: true });
      }
      console.log(`DESCONECTADO (${status || 'desconhecido'}) → Reconectando em 2s...`);
      setTimeout(() => {
        reconnecting = false;
        connect();
      }, 2000);
    }
  });

  sock.ev.on('creds.update', saveCreds);

  // ===========================================
  // ⭐ ADICIONAR AQUI: LISTENER DE REAÇÕES
  // ===========================================
  // Este é o código que você precisa adicionar!
  
  sock.ev.on('messages.reaction', async (reactionUpdate) => {
    try {
      const { key, reaction } = reactionUpdate;
      
      // Validar dados básicos
      if (!key || !key.id) {
        console.log('[REAÇÕES] Reação sem ID de mensagem, ignorando');
        return;
      }
      
      if (!reaction || !reaction.text) {
        console.log('[REAÇÕES] Reação sem emoji, ignorando');
        return;
      }
      
      const emoji = reaction.text;
      const waMessageId = key.id;
      const reactor = key.participant || key.remoteJid;
      
      console.log(`[REAÇÕES] Reação recebida: ${emoji} na mensagem ${waMessageId} por ${reactor}`);
      
      // Só processar reações ✅ e ❌
      if (emoji !== '✅' && emoji !== '❌') {
        console.log(`[REAÇÕES] Reação ${emoji} ignorada (não é ✅ ou ❌)`);
        return;
      }
      
      // Chamar endpoint do Inova-Hub
      const apiUrl = `${INOVA_HUB_API_URL}/api/escalacoes/solicitacoes/auto-status`;
      
      console.log(`[REAÇÕES] Chamando API do Inova-Hub: ${apiUrl}`);
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            waMessageId: waMessageId,
            reactor: reactor,
            reaction: emoji
          }),
          // Timeout de 10 segundos
          signal: AbortSignal.timeout(10000)
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`[REAÇÕES] ✅ Status atualizado com sucesso:`, {
            solicitacaoId: data.data?._id,
            status: data.data?.status,
            waMessageId: waMessageId
          });
        } else {
          const errorText = await response.text();
          console.error(`[REAÇÕES] ❌ Erro ao atualizar status: ${response.status} - ${errorText}`);
        }
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          console.error(`[REAÇÕES] ❌ Timeout ao chamar API do Inova-Hub`);
        } else {
          console.error(`[REAÇÕES] ❌ Erro ao chamar API do Inova-Hub:`, fetchError.message);
        }
      }
    } catch (error) {
      console.error(`[REAÇÕES] ❌ Erro ao processar reação:`, error);
    }
  });

  console.log('[REAÇÕES] Listener de reações configurado e ativo');
}

connect();

// ===========================================
// ROTAS DA API (código existente)
// ===========================================
app.get('/', (req, res) => {
  res.send(`WhatsApp API - Status: ${isConnected ? 'CONECTADO' : 'Desconectado'}`);
});

app.post('/send', async (req, res) => {
  const { jid, numero, mensagem } = req.body;
  const destino = jid || numero;
  console.log(`[TENTATIVA] ${destino}: ${mensagem?.substring(0, 50)}...`);

  if (!isConnected || !sock) {
    return res.status(503).send('WhatsApp desconectado');
  }

  try {
    let destinatario = destino;

    if (!destinatario.includes('@')) {
      destinatario = destinatario.includes('-')
        ? `${destinatario}@g.us`
        : `${destinatario}@s.whatsapp.net`;
    }

    await sock.sendMessage(destinatario, { text: mensagem });
    console.log('[SUCESSO] Enviado!');
    res.send('Enviado!');
  } catch (e) {
    console.log('[FALHA]', e);
    res.status(500).send('Erro: ' + e.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

