# ⚠️ Quota da API do YouTube Excedida

## ❌ Problema

A API do YouTube retornou erro 403: `quotaExceeded`

Isso significa que a quota diária da API Key foi excedida.

## ✅ Soluções

### Opção 1: Aguardar Reset da Quota (Recomendado)

A quota do YouTube é resetada diariamente (24 horas). Aguarde até o próximo dia e tente novamente.

### Opção 2: Criar Nova API Key

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Clique em **"+ Criar credenciais"** → **"Chave de API"**
3. Copie a nova API Key
4. Configure no código ou variáveis de ambiente

### Opção 3: Aumentar Quota (Plano Pago)

Se você tiver um plano pago do Google Cloud, pode aumentar a quota:
1. Acesse: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas
2. Solicite aumento de quota

## 🔧 O Que Foi Implementado

1. **Cache de 30 minutos**: Os vídeos são armazenados em cache para evitar múltiplas requisições
2. **Retorno de cache em caso de erro**: Se a quota estiver excedida, retorna dados do cache se disponível
3. **Tratamento de erro**: Mensagem clara quando a quota é excedida

## 📊 Quota Padrão do YouTube

- **Gratuito**: 10.000 unidades por dia
- Cada busca de vídeos consome ~100 unidades
- Cada busca de detalhes consome ~1 unidade

## 💡 Dicas para Reduzir Uso de Quota

1. **Cache**: Já implementado (30 minutos)
2. **Reduzir frequência de atualizações**: Não atualizar muito frequentemente
3. **Usar múltiplas API Keys**: Rotacionar entre diferentes keys
4. **Otimizar requisições**: Buscar apenas o necessário

## 🧪 Teste

Após implementar o cache, mesmo com quota excedida, os vídeos devem aparecer se houver dados em cache.

