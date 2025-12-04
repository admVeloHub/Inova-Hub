# 🔍 Testar URL do OAuth

## Como Verificar a URL Exata

Após o deploy, acesse este endpoint para ver exatamente qual URL está sendo gerada:

```
https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/debug
```

Este endpoint vai mostrar:
- A URL exata que está sendo gerada
- A URL que DEVE estar no Google Cloud Console
- Checklist de verificação

## O Que Verificar

1. **Acesse o endpoint de debug** acima
2. **Copie a URL exata** mostrada no campo `exactUrl`
3. **Vá no Google Cloud Console**
4. **Verifique se essa URL EXATA está na lista** de URIs de redirecionamento
5. **Se não estiver, adicione EXATAMENTE como mostrado**

## Possíveis Problemas

### 1. URL com Barra no Final
❌ Errado: `https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback/`  
✅ Correto: `https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`

### 2. URL com Espaços
❌ Errado: ` https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback `  
✅ Correto: `https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`

### 3. URL com http:// em vez de https://
❌ Errado: `http://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`  
✅ Correto: `https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback`

### 4. Projeto Errado no Google Console
- Certifique-se de que está no **projeto correto**
- Verifique se o Client ID é: `866929285541-eooa33671afun3lg68pp0gp7o5g108qd`

## Próximos Passos

1. Acesse o endpoint de debug
2. Copie a URL exata
3. Verifique no Google Cloud Console
4. Se necessário, remova a URL antiga e adicione a nova
5. Salve e aguarde 2-5 minutos
6. Teste novamente

