# 🔧 Como Configurar MongoDB para Testes Locais

## 1. Instalar dependência (se necessário)

Na raiz do projeto:

```bash
npm install mongodb
```

(O projeto já tem `mongodb` e `mongoose` no `package.json`; rode só se faltar.)

## 2. URI do MongoDB Atlas (VelohubCentral)

Use a connection string no formato:

```
mongodb+srv://<db_username>:<db_password>@velohubcentral.od7vwts.mongodb.net/?appName=VelohubCentral
```

Substitua:
- **&lt;db_username&gt;** → usuário do banco no Atlas  
- **&lt;db_password&gt;** → senha do usuário  

Exemplo (não commitar senha):  
`mongodb+srv://meuusuario:minhasenha@velohubcentral.od7vwts.mongodb.net/?appName=VelohubCentral`

## 📋 Opção 1: Criar arquivo .env (Recomendado)

1. Na **raiz do projeto** (ou em `backend/`), crie/edite o arquivo `.env`:

```env
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@velohubcentral.od7vwts.mongodb.net/?appName=VelohubCentral
PORT=8080
NODE_ENV=development
```

Ou use o nome antigo (também funciona):

```env
MONGO_ENV=mongodb+srv://<db_username>:<db_password>@velohubcentral.od7vwts.mongodb.net/?appName=VelohubCentral
```

2. Substitua `<db_username>` e `<db_password>` pelos dados reais do MongoDB Atlas

## 📋 Opção 2: Editar config-local.js

Edite `backend/config-local.js` e substitua a linha 7:

```javascript
MONGO_ENV: process.env.MONGO_ENV || 'SUA_URI_MONGODB_REAL_AQUI',
```

## 🔍 Como Obter a URI do MongoDB

### Se você tem acesso ao GCP Secret Manager:

1. Acesse: https://console.cloud.google.com/security/secret-manager
2. Procure pelo secret `MONGO_ENV` ou `MONGODB_ENV`
3. Copie o valor (é a URI completa do MongoDB)

### Se você tem acesso ao MongoDB Atlas:

1. Acesse: https://cloud.mongodb.com/
2. Vá em "Database" → "Connect"
3. Escolha "Connect your application"
4. Copie a connection string
5. Substitua `<password>` pela senha do usuário
6. Formato: `mongodb+srv://usuario:senha@cluster.mongodb.net/console_conteudo`

## ⚠️ Importante

- **NÃO** commite o arquivo `.env` no git (já está no .gitignore)
- A URI deve ser a mesma usada em produção para testar com dados reais
- Se não tiver acesso à URI, você pode testar apenas a lógica do código (mas não conseguirá criar/ler solicitações)

## 🧪 Teste sem MongoDB (apenas lógica)

Se você quiser testar apenas a lógica do endpoint sem MongoDB:

1. O servidor iniciará mesmo sem MongoDB conectado
2. Mas ao tentar criar/buscar solicitações, retornará erro
3. Você pode testar o endpoint `/auto-status` diretamente se já tiver um `waMessageId` válido

