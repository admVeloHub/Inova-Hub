/**
 * EXEMPLO: Listener de Reações do WhatsApp para Inova-Hub
 * 
 * Este código deve ser adicionado ao serviço WhatsApp (Baileys)
 * para que as reações ✅ e ❌ atualizem automaticamente o status das escalações
 * 
 * INSTRUÇÕES:
 * 1. Adicione este código ao seu index.js do WhatsApp (onde está o Baileys)
 * 2. Configure a variável de ambiente INOVA_HUB_API_URL
 * 3. Teste reagindo a uma mensagem com ✅ ou ❌
 */

const INOVA_HUB_API_URL = process.env.INOVA_HUB_API_URL || 'http://localhost:8090';

/**
 * Adicionar listener de reações no socket do Baileys
 * @param {Object} sock - Socket do Baileys (makeWASocket)
 */
function setupReactionListener(sock) {
  console.log('[REAÇÕES] Listener de reações configurado');
  
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
}

// EXEMPLO DE USO:
// No seu código de conexão do WhatsApp, após criar o socket:
//
// const sock = makeWASocket({ ... });
// setupReactionListener(sock);

module.exports = { setupReactionListener };

