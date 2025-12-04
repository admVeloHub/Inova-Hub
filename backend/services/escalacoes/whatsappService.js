/**
 * VeloHub V3 - WhatsApp Service para Módulo Escalações
 * VERSION: v1.1.0 | DATE: 2025-01-31 | AUTHOR: VeloHub Development Team
 * Branch: escalacoes
 * 
 * Serviço para integração com API WhatsApp externa (Baileys)
 * Referência: painel de serviços/api wpp/index.js
 * 
 * Este serviço faz chamadas HTTP para a API WhatsApp externa,
 * não implementa Baileys diretamente.
 */

const config = require('../../config');

/**
 * Formatar número para JID WhatsApp
 * @param {string} numero - Número no formato numérico
 * @returns {string} JID formatado
 */
function formatJid(numero) {
  if (!numero || typeof numero !== 'string') {
    return null;
  }
  
  // Se já contém @, retornar como está
  if (numero.includes('@')) {
    return numero;
  }
  
  // Se contém -, é grupo
  if (numero.includes('-')) {
    return `${numero}@g.us`;
  }
  
  // Caso contrário, é individual
  return `${numero}@s.whatsapp.net`;
}

/**
 * Extrair CPF e tipo de solicitação do texto
 * Mesma lógica da API externa
 * @param {string} texto - Texto da mensagem
 * @returns {Object} { cpf, solicitacao }
 */
function parseMetaFromText(texto) {
  try {
    const s = String(texto || '');
    let cpfTxt = null;
    
    // Procurar linha que começa com CPF:
    const mCpf = s.match(/^\s*CPF\s*:\s*(.+)$/im);
    if (mCpf && mCpf[1]) {
      const dig = String(mCpf[1]).replace(/\D/g, '');
      if (dig) cpfTxt = dig;
    }
    
    let sol = null;
    // Tentar padrão do título: *Nova Solicitação Técnica - X*
    const mSol1 = s.match(/\*Nova\s+Solicitação\s+Técnica\s*-\s*([^*]+)\*/i);
    if (mSol1 && mSol1[1]) {
      sol = mSol1[1].trim();
    }
    
    // Fallback: procurar linha que começa com Tipo de Solicitação:
    if (!sol) {
      const mSol2 = s.match(/^\s*Tipo\s+de\s+Solicitação\s*:\s*(.+)$/im);
      if (mSol2 && mSol2[1]) {
        sol = mSol2[1].trim();
      }
    }
    
    return { cpf: cpfTxt, solicitacao: sol };
  } catch (error) {
    console.error('[WHATSAPP] Erro ao parsear meta do texto:', error);
    return { cpf: null, solicitacao: null };
  }
}

/**
 * Enviar mensagem via WhatsApp
 * @param {string} jid - JID WhatsApp ou número
 * @param {string} mensagem - Texto da mensagem
 * @param {Array} imagens - Array de imagens [{ data: base64, type: mimeType }]
 * @param {Array} videos - Array de vídeos (opcional, não suportado pela API atual)
 * @param {Object} options - Opções adicionais { cpf, solicitacao, agente }
 * @returns {Promise<Object>} { ok: boolean, messageId?: string, messageIds?: Array, error?: string }
 */
async function sendMessage(jid, mensagem, imagens = [], videos = [], options = {}) {
  const apiUrl = config.WHATSAPP_API_URL;
  
  console.log('[WHATSAPP DEBUG] ============================================');
  console.log('[WHATSAPP DEBUG] Iniciando envio de mensagem');
  console.log('[WHATSAPP DEBUG] API URL:', apiUrl || '❌ NÃO CONFIGURADA');
  console.log('[WHATSAPP DEBUG] JID recebido:', jid);
  console.log('[WHATSAPP DEBUG] Mensagem length:', mensagem ? mensagem.length : 0);
  console.log('[WHATSAPP DEBUG] Imagens:', imagens ? imagens.length : 0);
  console.log('[WHATSAPP DEBUG] Videos:', videos ? videos.length : 0);
  console.log('[WHATSAPP DEBUG] Options:', JSON.stringify(options, null, 2));
  console.log('[WHATSAPP DEBUG] Config completo:', {
    WHATSAPP_API_URL: config.WHATSAPP_API_URL,
    WHATSAPP_DEFAULT_JID: config.WHATSAPP_DEFAULT_JID
  });
  console.log('[WHATSAPP DEBUG] ============================================');
  
  if (!apiUrl) {
    console.error('[WHATSAPP ERROR] API URL não configurada - pulando envio');
    return { ok: false, error: 'WhatsApp API não configurada' };
  }
  
  try {
    // Formatar JID se necessário
    let destinatario = formatJid(jid);
    if (!destinatario) {
      console.error('[WHATSAPP ERROR] Destino inválido:', jid);
      return { ok: false, error: 'Destino inválido' };
    }
    
    console.log('[WHATSAPP DEBUG] JID formatado:', destinatario);
    
    // Extrair CPF e solicitação de options ou mensagem
    const { cpf: cpfOption, solicitacao: solOption, agente } = options;
    const parsed = parseMetaFromText(mensagem);
    const cpf = cpfOption || parsed.cpf || null;
    const solicitacao = solOption || parsed.solicitacao || null;
    
    console.log('[WHATSAPP DEBUG] CPF extraído:', cpf);
    console.log('[WHATSAPP DEBUG] Solicitação extraída:', solicitacao);
    console.log('[WHATSAPP DEBUG] Agente:', agente);
    
    // Preparar payload conforme API externa
    const payload = {
      jid: destinatario,
      mensagem: mensagem || '',
      imagens: Array.isArray(imagens) ? imagens : [],
      videos: Array.isArray(videos) ? videos : [],
      cpf: cpf,
      solicitacao: solicitacao,
      agente: agente || null
    };
    
    console.log(`[WHATSAPP] Enviando mensagem para ${destinatario}...`);
    console.log('[WHATSAPP DEBUG] Payload completo:', JSON.stringify({
      ...payload,
      mensagem: payload.mensagem.substring(0, 100) + '...',
      imagens: payload.imagens.length + ' imagens'
    }, null, 2));
    
    // Fazer requisição com timeout de 30 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    try {
      const url = `${apiUrl}/send`;
      console.log('[WHATSAPP DEBUG] URL completa:', url);
      console.log('[WHATSAPP DEBUG] Fazendo requisição POST...');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log('[WHATSAPP DEBUG] Resposta recebida:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Erro desconhecido');
        console.error('[WHATSAPP ERROR] Resposta não OK:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText.substring(0, 500)
        });
        
        if (response.status === 503) {
          console.error('[WHATSAPP ERROR] WhatsApp desconectado (503)');
          return { ok: false, error: 'WhatsApp desconectado' };
        }
        
        if (response.status === 400) {
          console.error('[WHATSAPP ERROR] Destino inválido (400)');
          return { ok: false, error: 'Destino inválido' };
        }
        
        console.error(`[WHATSAPP ERROR] Erro HTTP ${response.status}:`, errorText);
        return { ok: false, error: `Erro HTTP ${response.status}: ${errorText}` };
      }
      
      const data = await response.json();
      console.log('[WHATSAPP DEBUG] Dados da resposta:', JSON.stringify(data, null, 2));
      
      if (data.ok) {
        console.log(`[WHATSAPP SUCCESS] Mensagem enviada com sucesso! messageId: ${data.messageId}`);
        return {
          ok: true,
          messageId: data.messageId || null,
          messageIds: Array.isArray(data.messageIds) ? data.messageIds : (data.messageId ? [data.messageId] : [])
        };
      } else {
        console.error('[WHATSAPP ERROR] Erro na resposta:', data.error);
        return { ok: false, error: data.error || 'Erro desconhecido' };
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      console.error('[WHATSAPP ERROR] Erro na requisição fetch:', {
        name: fetchError.name,
        message: fetchError.message,
        stack: fetchError.stack?.substring(0, 500)
      });
      
      if (fetchError.name === 'AbortError') {
        console.error('[WHATSAPP ERROR] Timeout ao enviar mensagem');
        return { ok: false, error: 'Timeout ao enviar mensagem' };
      }
      
      if (fetchError.code === 'ECONNREFUSED') {
        console.error('[WHATSAPP ERROR] Conexão recusada - API WhatsApp pode estar offline');
        return { ok: false, error: 'API WhatsApp offline ou inacessível' };
      }
      
      if (fetchError.code === 'ENOTFOUND') {
        console.error('[WHATSAPP ERROR] Host não encontrado - URL da API pode estar incorreta');
        return { ok: false, error: 'URL da API WhatsApp inválida' };
      }
      
      console.error('[WHATSAPP ERROR] Erro ao fazer requisição:', fetchError.message);
      return { ok: false, error: fetchError.message };
    }
  } catch (error) {
    console.error('[WHATSAPP ERROR] Erro geral:', {
      message: error.message,
      stack: error.stack?.substring(0, 500)
    });
    return { ok: false, error: error.message || 'Erro desconhecido' };
  }
}

/**
 * Enviar imagem única via WhatsApp
 * @param {string} jid - JID WhatsApp ou número
 * @param {string} imageBase64 - Imagem em base64 (sem prefixo data:image)
 * @param {string} caption - Legenda da imagem
 * @param {string} mimeType - Tipo MIME (ex: 'image/jpeg')
 * @returns {Promise<Object>} { ok: boolean, messageId?: string, messageIds?: Array, error?: string }
 */
async function sendImage(jid, imageBase64, caption = '', mimeType = 'image/jpeg') {
  const imagens = [{
    data: imageBase64,
    type: mimeType
  }];
  
  return sendMessage(jid, caption, imagens, [], {});
}

module.exports = {
  sendMessage,
  sendImage,
  formatJid,
  parseMetaFromText
};

