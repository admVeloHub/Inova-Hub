/**
 * Mídias (vídeos) da Velotax por sessão - VeloHub / inova-hub.
 * Apenas vídeos do canal oficial Velotax: youtube.com/channel/UCbmnBVWW-tQ1uzxAN0FKjeg
 *
 * COMO EDITAR:
 * 1. Abra este arquivo: src/lib/midiasVelotax.js
 * 2. Para um VÍDEO do YouTube: use YT('ID_DO_VIDEO'). O ID é o que vem em youtube.com/watch?v=ID_DO_VIDEO
 * 3. Para uma PLAYLIST: use YT_PLAYLIST('ID_DA_PLAYLIST') — lembre que playlist não gera thumb única
 * 4. Para vídeo direto (MP4 etc.): use type: 'video', url: 'https://...arquivo.mp4'
 * 5. Altere titulo e duracao como quiser; id deve ser único por vídeo.
 */
const YT = (id) => `https://www.youtube.com/embed/${id}`;
const YT_PLAYLIST = (listId) => `https://www.youtube.com/embed/videoseries?list=${listId}`;

export const SESSOES = {
  irpf: {
    titulo: 'IRPF',
    descricao: 'Vídeos sobre Imposto de Renda Pessoa Física, restituição e declaração.',
    videos: [
      { id: 'irpf-1', titulo: 'Antecipação da Restituição do Imposto de Renda para Negativados 2026', url: YT('judrObUHuvw'), type: 'youtube', duracao: '—' },
      { id: 'irpf-2', titulo: 'IMPOSTO DE RENDA 2026: O QUE MUDOU?', url: YT('NvzbdFaodEU'), type: 'youtube', duracao: '—' },
      { id: 'irpf-3', titulo: 'MUDANÇAS NO IRPF 2026', url: YT('eQO1EDDNb5Q'), type: 'youtube', duracao: '—' },
    ],
  },
  credito: {
    titulo: 'Crédito',
    descricao: 'Crédito do Trabalhador, Crédito Pessoal e orientações.',
    videos: [
      { id: 'cred-1', titulo: 'AUTÔNOMO APROVADO: 3 Formas de Conseguir Crédito SEM HOLERITE', url: YT('8v8yA3n7pIg'), type: 'youtube', duracao: '—' },
      { id: 'cred-2', titulo: 'O Fim do Holerite.', url: YT('3ElIwEOxcW4'), type: 'youtube', duracao: '—' },
      { id: 'cred-3', titulo: 'CUIDADO: 5 Erros Fatais Que Fazem Seu Salário Sumir Antes do Dia 10', url: YT('o-mYtgV64TQ'), type: 'youtube', duracao: '—' },
      { id: 'cred-4', titulo: 'Vale a pena empréstimo para pagar dívida?', url: YT('UEf4vZFSVXw'), type: 'youtube', duracao: '—' },
    ],
  },
  seguros: {
    titulo: 'Seguros',
    descricao: 'Proteção financeira, golpes e segurança do seu dinheiro.',
    videos: [
      { id: 'seg-1', titulo: 'ESSES SÃO OS 3 MAIORES GOLPES FINANCEIROS NO BRASIL (E Como se Blindar)', url: YT('7b9H87mHHZw'), type: 'youtube', duracao: '—' },
      { id: 'seg-2', titulo: 'ESSES SÃO OS 3 MAIORES GOLPES FINANCEIROS NO BRASIL', url: YT('S0WD8_0Rxvc'), type: 'youtube', duracao: '—' },
      { id: 'seg-3', titulo: 'Ainda acha que o TikTok é só dancinha? VENDA PELO TIKTOK SHOP', url: YT('XZQ9wldi9_w'), type: 'youtube', duracao: '—' },
    ],
  },
};

export const SESSOES_ORDEM = ['irpf', 'credito', 'seguros'];
