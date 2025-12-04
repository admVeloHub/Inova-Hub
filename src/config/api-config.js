/**
 * VeloHub V3 - API Configuration
 * VERSION: v1.0.6 | DATE: 2025-01-30 | AUTHOR: VeloHub Development Team
 * REGRA: Frontend porta 8080 | Backend porta 8090 na rede local
 */

/**
 * Obtém a URL base da API automaticamente baseada no ambiente
 * VERSION: v1.0.5 | DATE: 2025-01-30 | AUTHOR: VeloHub Development Team
 * @returns {string} URL base da API (já inclui /api no final)
 */
export const getApiBaseUrl = () => {
  // Prioridade 1: Se há uma variável de ambiente definida, usar ela
  if (process.env.REACT_APP_API_URL) {
    // Garantir que termina com /api se não terminar
    const url = process.env.REACT_APP_API_URL.trim();
    return url.endsWith('/api') ? url : `${url}/api`;
  }
  
  // Prioridade 2: Detecta automaticamente a URL baseada no domínio atual
  if (typeof window !== 'undefined') {
    const currentHost = window.location.hostname;
    const currentProtocol = window.location.protocol;
    const currentPort = window.location.port;
    
    // Se estamos em localhost, usar o backend local na porta 8090
    if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
      return 'http://localhost:8090/api';
    }
    
    // Se estamos no Cloud Run, usar o mesmo domínio
    if (currentHost.includes('run.app')) {
      return `https://${currentHost}/api`;
    }
    
    // Se estamos em produção (qualquer outro domínio), usar o backend de produção
    // Usar o mesmo protocolo do frontend para evitar problemas de CORS
    if (currentProtocol === 'https:') {
      return `${currentProtocol}//${currentHost}${currentPort ? `:${currentPort}` : ''}/api`;
    }
    
    // Fallback para URL padrão online
    return 'https://velohub-main-staging-278491073220.us-east1.run.app/api';
  }
  
  // Fallback para server-side rendering - sempre URL online
  return 'https://velohub-main-staging-278491073220.us-east1.run.app/api';
};

/**
 * URL base da API (calculada automaticamente)
 */
export const API_BASE_URL = getApiBaseUrl();

/**
 * Log da configuração da API (apenas em desenvolvimento)
 */
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 API Config:', {
    baseUrl: API_BASE_URL,
    environment: process.env.NODE_ENV,
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server-side',
    reactAppApiUrl: process.env.REACT_APP_API_URL,
    nodeEnv: process.env.NODE_ENV
  });
}

// Log sempre (para debug do problema)
console.log('🔧 API Config (SEMPRE):', {
  baseUrl: API_BASE_URL,
  environment: process.env.NODE_ENV,
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'server-side',
  reactAppApiUrl: process.env.REACT_APP_API_URL
});
