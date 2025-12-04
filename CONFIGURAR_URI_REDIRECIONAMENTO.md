# 🔧 Configurar URI de Redirecionamento no Google Cloud Console

## ❌ Erro Atual

```
Não é possível fazer login no app porque ele não obedece à política do OAuth 2.0 do Google.
redirect_uri=https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

## ✅ Solução: Registrar a URL no Google Cloud Console

### Passo 1: Acessar o Google Cloud Console

1. Acesse: **https://console.cloud.google.com/**
2. Certifique-se de que está no **projeto correto**
3. No menu lateral, vá em **APIs e Serviços** → **Credenciais**

### Passo 2: Encontrar o OAuth Client

1. Na lista de credenciais, encontre o **OAuth 2.0 Client ID**
2. O Client ID deve ser: `866929285541-eooa33671afun3lg68pp0gp7o5g108qd`
3. **Clique no nome** do cliente para editar

### Passo 3: Adicionar URI de Redirecionamento

1. Na página de edição, role até a seção **"URIs de redirecionamento autorizados"**
2. Você verá um campo de texto com as URIs atuais
3. **Clique no botão "+ Adicionar URI"** (ou edite a URI existente se houver)
4. **Cole EXATAMENTE esta URL** (copie e cole, não digite):

```
https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback
```

### Passo 4: Verificações Importantes

⚠️ **A URL DEVE SER EXATAMENTE ASSIM:**

✅ `https://` (não `http://`)  
✅ `velohub-278491073220.us-east1.run.app` (sem porta)  
✅ `/api/feed/youtube/oauth/callback` (caminho completo)  
✅ **Sem espaços** antes ou depois  
✅ **Sem barra no final** (não `/callback/`)  

### Passo 5: Salvar

1. Após adicionar a URI, **role até o final da página**
2. Clique no botão **"Salvar"** (ou "Save")
3. Aguarde a confirmação de que foi salvo

### Passo 6: Aguardar Propagação

⚠️ **IMPORTANTE:** Após salvar, pode levar **1-5 minutos** para as mudanças entrarem em vigor.

## 📸 Exemplo Visual

A seção deve ficar assim:

```
URIs de redirecionamento autorizados
Para usar com solicitações de um servidor da Web

URI 1 *
https://velohub-278491073220.us-east1.run.app/api/feed/youtube/oauth/callback

[+ Adicionar URI]
```

## ✅ Verificação

Após configurar:

1. **Aguarde 2-5 minutos**
2. Acesse: https://velohub-278491073220.us-east1.run.app/feed
3. Clique em **"Conectar YouTube"**
4. Deve redirecionar para o Google **sem erro**

## 🐛 Se Ainda Não Funcionar

### Verifique:

1. ✅ Está no **projeto correto** no Google Cloud Console?
2. ✅ O **Client ID** é o correto (`866929285541-eooa33671afun3lg68pp0gp7o5g108qd`)?
3. ✅ A URL está **EXATAMENTE** como mostrado acima?
4. ✅ **Salvou** as alterações?
5. ✅ **Aguardou** alguns minutos após salvar?

### Se ainda der erro:

1. Verifique se há **múltiplos OAuth Clients** - use o correto
2. Verifique se o **tipo de cliente** é "Aplicativo da Web"
3. Tente **remover e adicionar novamente** a URI
4. Verifique se não há **espaços extras** ou **caracteres invisíveis**

## 📝 Nota

Se você tiver **múltiplas URIs** configuradas, todas devem estar corretas. A URL de produção deve estar na lista.

