/**
 * VeloHub V3 - Escalações API Routes - Solicitações Técnicas
 * VERSION: v1.3.0 | DATE: 2025-01-30 | AUTHOR: VeloHub Development Team
 * Branch: main (recuperado de escalacoes)
 * 
 * Rotas para gerenciamento de solicitações técnicas
 * 
 * Mudanças v1.3.0:
 * - Adicionado endpoint POST /auto-status para atualização automática via reações WhatsApp
 * - Suporte para reações ✅ (Resolvido) e ❌ (Negado)
 * 
 * Mudanças v1.2.0:
 * - Integração com WhatsApp service para envio automático de mensagens
 * 
 * Mudanças v1.1.0:
 * - Database alterado de console_servicos para hub_escalacoes
 * - Campo agente substituído por colaboradorNome no nível raiz
 * - Campo agente mantido dentro do payload
 * - Adicionados campos respondedAt, respondedBy, updatedAt
 * - Filtros atualizados para usar colaboradorNome
 */

const express = require('express');
const router = express.Router();
const whatsappService = require('../../../services/escalacoes/whatsappService');
const config = require('../../../config');

/**
 * Inicializar rotas de solicitações
 * @param {Object} client - MongoDB client
 * @param {Function} connectToMongo - Função para conectar ao MongoDB
 * @param {Object} services - Serviços disponíveis (userActivityLogger, etc.)
 */
const initSolicitacoesRoutes = (client, connectToMongo, services = {}) => {
  const { userActivityLogger } = services;

  /**
   * GET /api/escalacoes/solicitacoes
   * Buscar todas as solicitações ou filtrar por query params
   */
  router.get('/', async (req, res) => {
    try {
      if (!client) {
        return res.status(503).json({
          success: false,
          message: 'MongoDB não configurado',
          data: []
        });
      }

      await connectToMongo();
      const db = client.db('hub_escalacoes');
      const collection = db.collection('solicitacoes_tecnicas');

      // Filtros opcionais
      const { cpf, colaboradorNome, agente, status } = req.query;
      const filter = {};
      if (cpf) {
        filter.cpf = { $regex: String(cpf).replace(/\D/g, ''), $options: 'i' };
      }
      // Suportar tanto colaboradorNome quanto agente (para compatibilidade)
      if (colaboradorNome) {
        filter.colaboradorNome = { $regex: String(colaboradorNome), $options: 'i' };
      } else if (agente) {
        filter.colaboradorNome = { $regex: String(agente), $options: 'i' };
      }
      if (status) {
        filter.status = String(status);
      }

      const solicitacoes = await collection
        .find(filter)
        .sort({ createdAt: -1 })
        .toArray();

      console.log(`✅ Solicitações encontradas: ${solicitacoes.length}`);
      
      // Log de status para debug (apenas em desenvolvimento)
      if (process.env.NODE_ENV === 'development' && solicitacoes.length > 0) {
        const statusCount = {};
        solicitacoes.forEach(s => {
          const st = String(s.status || 'sem status');
          statusCount[st] = (statusCount[st] || 0) + 1;
        });
        console.log(`📊 Status das solicitações:`, statusCount);
      }

      res.json({
        success: true,
        data: solicitacoes
      });
    } catch (error) {
      console.error('❌ Erro ao buscar solicitações:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar solicitações',
        error: error.message
      });
    }
  });

  /**
   * GET /api/escalacoes/solicitacoes/:id
   * Buscar solicitação por ID
   */
  router.get('/:id', async (req, res) => {
    try {
      if (!client) {
        return res.status(503).json({
          success: false,
          message: 'MongoDB não configurado',
          data: null
        });
      }

      await connectToMongo();
      const db = client.db('hub_escalacoes');
      const collection = db.collection('solicitacoes_tecnicas');

      const { ObjectId } = require('mongodb');
      const solicitacao = await collection.findOne({
        _id: ObjectId.isValid(req.params.id) ? new ObjectId(req.params.id) : req.params.id
      });

      if (!solicitacao) {
        return res.status(404).json({
          success: false,
          message: 'Solicitação não encontrada',
          data: null
        });
      }

      res.json({
        success: true,
        data: solicitacao
      });
    } catch (error) {
      console.error('❌ Erro ao buscar solicitação:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar solicitação',
        error: error.message
      });
    }
  });

  /**
   * POST /api/escalacoes/solicitacoes
   * Criar nova solicitação
   */
  router.post('/', async (req, res) => {
    try {
      if (!client) {
        return res.status(503).json({
          success: false,
          message: 'MongoDB não configurado',
          data: null
        });
      }

      const { agente, cpf, tipo, payload, agentContact, waMessageId, mensagemTexto } = req.body;

      // Validação básica
      if (!agente || !cpf || !tipo) {
        return res.status(400).json({
          success: false,
          message: 'Campos obrigatórios: agente (colaboradorNome), cpf, tipo',
          data: null
        });
      }

      await connectToMongo();
      const db = client.db('hub_escalacoes');
      const collection = db.collection('solicitacoes_tecnicas');

      const now = new Date();
      const colaboradorNome = String(agente).trim();
      
      // Garantir que payload tenha agente dentro
      const payloadCompleto = {
        agente: colaboradorNome,
        ...(payload || {})
      };

      const solicitacao = {
        colaboradorNome: colaboradorNome,
        cpf: String(cpf).replace(/\D/g, ''),
        tipo: String(tipo).trim(),
        payload: payloadCompleto,
        status: 'em aberto',
        agentContact: agentContact || null,
        waMessageId: waMessageId || null,
        respondedAt: null,
        respondedBy: null,
        createdAt: now,
        updatedAt: now
      };

      const result = await collection.insertOne(solicitacao);

      console.log(`✅ Solicitação criada: ${result.insertedId}`);

      // Enviar via WhatsApp se configurado
      let waMessageIdFinal = waMessageId || null;
      let messageIdsArray = [];
      
      console.log('[WHATSAPP DEBUG] Verificando configuração:', {
        WHATSAPP_API_URL: config.WHATSAPP_API_URL ? '✅ Configurado' : '❌ Não configurado',
        WHATSAPP_DEFAULT_JID: config.WHATSAPP_DEFAULT_JID ? '✅ Configurado' : '❌ Não configurado',
        mensagemTexto: mensagemTexto ? '✅ Existe' : '❌ Não existe',
        mensagemLength: mensagemTexto ? mensagemTexto.length : 0
      });
      
      if (config.WHATSAPP_API_URL && config.WHATSAPP_DEFAULT_JID && mensagemTexto) {
        try {
          // Extrair imagens do payload se existirem
          const imagens = [];
          if (payload && payload.imagens && Array.isArray(payload.imagens)) {
            // Se payload.imagens tem previews base64, usar eles
            if (payload.previews && Array.isArray(payload.previews)) {
              payload.imagens.forEach((img, idx) => {
                if (payload.previews[idx]) {
                  // Remover prefixo data:image se existir
                  const base64Data = String(payload.previews[idx]).replace(/^data:image\/[^;]+;base64,/, '');
                  imagens.push({
                    data: base64Data,
                    type: img.type || 'image/jpeg'
                  });
                }
              });
            }
          }
          
          const whatsappResult = await whatsappService.sendMessage(
            config.WHATSAPP_DEFAULT_JID,
            mensagemTexto,
            imagens,
            [],
            {
              cpf: solicitacao.cpf,
              solicitacao: tipo,
              agente: colaboradorNome
            }
          );
          
          if (whatsappResult.ok) {
            waMessageIdFinal = whatsappResult.messageId || null;
            messageIdsArray = whatsappResult.messageIds || [];
            
            // Atualizar solicitação com waMessageId e messageIds
            if (waMessageIdFinal || messageIdsArray.length > 0) {
              const updateData = {};
              if (waMessageIdFinal) updateData.waMessageId = waMessageIdFinal;
              if (messageIdsArray.length > 0) {
                updateData['payload.messageIds'] = messageIdsArray;
              }
              
              await collection.updateOne(
                { _id: result.insertedId },
                { $set: updateData }
              );
              
              // Atualizar objeto local para resposta
              solicitacao.waMessageId = waMessageIdFinal;
              if (!solicitacao.payload) solicitacao.payload = {};
              solicitacao.payload.messageIds = messageIdsArray;
            }
            
            console.log(`✅ WhatsApp: Mensagem enviada com sucesso! messageId: ${waMessageIdFinal}`);
          } else {
            console.warn(`⚠️ WhatsApp: Falha ao enviar mensagem: ${whatsappResult.error}`);
          }
        } catch (whatsappError) {
          console.error('❌ Erro ao enviar via WhatsApp (não crítico):', whatsappError);
          // Não bloquear criação da solicitação se WhatsApp falhar
        }
      } else {
        console.log('[WHATSAPP] WhatsApp não configurado ou mensagemTexto ausente - pulando envio');
      }

      // Atualizar agentContact se WhatsApp foi usado
      if (config.WHATSAPP_DEFAULT_JID && waMessageIdFinal) {
        solicitacao.agentContact = config.WHATSAPP_DEFAULT_JID;
      }

      // Log de atividade
      if (userActivityLogger) {
        try {
          await userActivityLogger.logActivity({
            action: 'create_solicitacao',
            detail: {
              solicitacaoId: result.insertedId.toString(),
              tipo,
              cpf: solicitacao.cpf,
              colaboradorNome: colaboradorNome,
              waMessageId: waMessageIdFinal,
              whatsappSent: !!waMessageIdFinal
            }
          });
        } catch (logErr) {
          console.error('Erro ao registrar log:', logErr);
        }
      }

      res.status(201).json({
        success: true,
        data: {
          _id: result.insertedId,
          ...solicitacao
        }
      });
    } catch (error) {
      console.error('❌ Erro ao criar solicitação:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar solicitação',
        error: error.message
      });
    }
  });

  /**
   * PUT /api/escalacoes/solicitacoes/:id
   * Atualizar solicitação
   */
  router.put('/:id', async (req, res) => {
    try {
      if (!client) {
        return res.status(503).json({
          success: false,
          message: 'MongoDB não configurado',
          data: null
        });
      }

      await connectToMongo();
      const db = client.db('hub_escalacoes');
      const collection = db.collection('solicitacoes_tecnicas');

      const { ObjectId } = require('mongodb');
      const filter = {
        _id: ObjectId.isValid(req.params.id) ? new ObjectId(req.params.id) : req.params.id
      };

      const now = new Date();
      const updateData = { ...req.body };
      
      // Sempre atualizar updatedAt
      updateData.updatedAt = now;
      
      // Se não está sendo atualizado respondedAt/respondedBy, não remover se já existir
      const update = {
        $set: updateData
      };

      const result = await collection.updateOne(filter, update);

      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Solicitação não encontrada',
          data: null
        });
      }

      console.log(`✅ Solicitação atualizada: ${req.params.id}`);

      // Buscar solicitação atualizada
      const solicitacao = await collection.findOne(filter);

      res.json({
        success: true,
        data: solicitacao
      });
    } catch (error) {
      console.error('❌ Erro ao atualizar solicitação:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar solicitação',
        error: error.message
      });
    }
  });

  /**
   * DELETE /api/escalacoes/solicitacoes/:id
   * Deletar solicitação
   */
  router.delete('/:id', async (req, res) => {
    try {
      if (!client) {
        return res.status(503).json({
          success: false,
          message: 'MongoDB não configurado',
          data: null
        });
      }

      await connectToMongo();
      const db = client.db('hub_escalacoes');
      const collection = db.collection('solicitacoes_tecnicas');

      const { ObjectId } = require('mongodb');
      const filter = {
        _id: ObjectId.isValid(req.params.id) ? new ObjectId(req.params.id) : req.params.id
      };

      const result = await collection.deleteOne(filter);

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Solicitação não encontrada',
          data: null
        });
      }

      console.log(`✅ Solicitação deletada: ${req.params.id}`);

      res.json({
        success: true,
        message: 'Solicitação deletada com sucesso'
      });
    } catch (error) {
      console.error('❌ Erro ao deletar solicitação:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar solicitação',
        error: error.message
      });
    }
  });

  /**
   * POST /api/escalacoes/solicitacoes/auto-status
   * Atualizar status automaticamente via reação do WhatsApp
   */
  router.post('/auto-status', async (req, res) => {
    try {
      console.log(`[AUTO-STATUS] Recebida requisição:`, {
        body: req.body,
        headers: req.headers
      });

      if (!client) {
        return res.status(503).json({
          success: false,
          error: 'MongoDB não configurado'
        });
      }

      const { waMessageId, reactor, status: inputStatus, reaction } = req.body;

      console.log(`[AUTO-STATUS] Dados recebidos:`, {
        waMessageId,
        reactor,
        inputStatus,
        reaction
      });

      // Validação
      if (!waMessageId) {
        console.log(`[AUTO-STATUS] ❌ waMessageId ausente`);
        return res.status(400).json({
          success: false,
          error: 'waMessageId é obrigatório'
        });
      }

      await connectToMongo();
      const db = client.db('hub_escalacoes');
      const collection = db.collection('solicitacoes_tecnicas');

      // Buscar solicitação por waMessageId (campo direto)
      console.log(`[AUTO-STATUS] Buscando solicitação por waMessageId: ${waMessageId}`);
      let solicitacao = await collection.findOne({ waMessageId });

      // Se não encontrou, buscar em payload.messageIds (array)
      if (!solicitacao) {
        console.log(`[AUTO-STATUS] Não encontrado em waMessageId, buscando em payload.messageIds`);
        solicitacao = await collection.findOne({
          'payload.messageIds': waMessageId
        });
      }

      if (!solicitacao) {
        console.log(`[AUTO-STATUS] ❌ Solicitação não encontrada para waMessageId: ${waMessageId}`);
        return res.status(404).json({
          success: false,
          error: 'Solicitação não encontrada'
        });
      }

      console.log(`[AUTO-STATUS] ✅ Solicitação encontrada:`, {
        _id: solicitacao._id,
        statusAtual: solicitacao.status,
        waMessageIdAtual: solicitacao.waMessageId,
        messageIds: solicitacao.payload?.messageIds
      });

      // Mapear emoji para status
      let statusFinal = inputStatus;
      if (!statusFinal && reaction) {
        if (reaction === '✅') {
          statusFinal = 'feito';
        } else if (reaction === '❌' || reaction === '✖️' || reaction === '✖') {
          statusFinal = 'não feito';
        }
      }

      if (!statusFinal) {
        return res.status(400).json({
          success: false,
          error: 'status ou reaction são obrigatórios'
        });
      }

      // Atualizar no MongoDB
      const now = new Date();
      const reactorDigits = reactor ? String(reactor).replace(/\D/g, '') : null;

      const result = await collection.updateOne(
        { _id: solicitacao._id },
        {
          $set: {
            status: statusFinal,
            respondedAt: now,
            respondedBy: reactorDigits,
            updatedAt: now
          }
        }
      );

      if (result.modifiedCount === 0) {
        return res.status(400).json({
          success: false,
          error: 'Nenhuma alteração realizada'
        });
      }

      // Buscar solicitação atualizada
      const atualizado = await collection.findOne({ _id: solicitacao._id });

      // Log de atividade
      if (userActivityLogger) {
        try {
          await userActivityLogger.logActivity({
            action: 'auto_status_update',
            detail: {
              solicitacaoId: solicitacao._id.toString(),
              waMessageId,
              status: statusFinal,
              reactor: reactorDigits,
              reaction: reaction || null
            }
          });
        } catch (logErr) {
          console.error('Erro ao registrar log:', logErr);
        }
      }

      console.log(`✅ Status automático atualizado: ${solicitacao._id} → ${statusFinal} (reação: ${reaction || 'N/A'})`);

      res.json({
        success: true,
        data: atualizado
      });
    } catch (error) {
      console.error('❌ Erro ao atualizar status automático:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  return router;
};

module.exports = initSolicitacoesRoutes;

