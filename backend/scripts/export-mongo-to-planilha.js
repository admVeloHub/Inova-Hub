/**
 * Exporta dados do MongoDB para planilhas (CSV).
 * Usa o .env do caminho informado (ex: C:\Users\Velotax Suporte\Downloads\list anv\.env).
 *
 * Uso:
 *   node backend/scripts/export-mongo-to-planilha.js
 *   ENV_PATH="C:\Users\Velotax Suporte\Downloads\list anv\.env" node backend/scripts/export-mongo-to-planilha.js
 *
 * Opcional: DB_NAME=nome_do_banco COLLECTION=nome_da_colecao
 */

const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');

// Caminho do .env: ENV_PATH pode ser arquivo ou pasta (ex: C:\...\Downloads\list anv)
const defaultEnvDir = path.join(process.env.USERPROFILE || process.env.HOME || '', 'Downloads', 'list anv');
let ENV_FILE = process.env.ENV_PATH;
if (!ENV_FILE) {
  const envComUm = path.join(defaultEnvDir, 'env (1)');
  ENV_FILE = fs.existsSync(envComUm) ? envComUm : path.join(defaultEnvDir, '.env');
} else {
  const base = path.basename(ENV_FILE);
  if (base !== '.env' && base !== 'env (1)' && !path.extname(ENV_FILE)) {
    ENV_FILE = path.join(ENV_FILE, '.env');
  }
}

// Carregar dotenv: prioriza "env (1)" em list anv (com MONGODB_URI), depois ENV_FILE, depois raiz
function loadEnv() {
  const dotenv = require('dotenv');
  const envListAnv = path.join(defaultEnvDir, 'env (1)');
  if (fs.existsSync(envListAnv)) {
    const loaded = dotenv.config({ path: envListAnv });
    if (loaded && !loaded.error) console.log('📁 env carregado de: list anv\\env (1)');
  }
  if (!process.env.MONGODB_URI && !process.env.MONGO_ENV) {
    const loaded = dotenv.config({ path: ENV_FILE });
    if (loaded && !loaded.error) console.log('📁 .env carregado de:', ENV_FILE);
  }
  if (!process.env.MONGODB_URI && !process.env.MONGO_ENV) {
    const rootEnv = path.join(process.cwd(), '.env');
    const fallback = dotenv.config({ path: rootEnv });
    if (fallback && !fallback.error) console.log('📁 .env (fallback) carregado da raiz do projeto');
  }
}

function escapeCsv(val) {
  if (val == null) return '';
  const s = String(val);
  if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function docToRow(doc, headers) {
  return headers.map((h) => escapeCsv(doc[h])).join(',');
}

function getAllKeys(docs) {
  const set = new Set();
  for (const doc of docs) {
    for (const k of Object.keys(doc)) {
      if (k === '_id') set.add('_id');
      else set.add(k);
    }
  }
  return Array.from(set);
}

async function exportCollection(client, dbName, collName, outDir) {
  const db = client.db(dbName);
  const coll = db.collection(collName);
  const cursor = coll.find({});
  const docs = await cursor.toArray();

  if (docs.length === 0) {
    console.log(`   ⚠️ ${dbName}.${collName}: vazia, arquivo não criado`);
    return;
  }

  // Normalizar objetos para CSV (flatten _id)
  const normalized = docs.map((d) => {
    const out = { ...d };
    if (out._id) {
      out._id = out._id.toString ? out._id.toString() : out._id;
    }
    // Datas para formato legível
    for (const k of Object.keys(out)) {
      if (out[k] && out[k] instanceof Date) {
        out[k] = out[k].toISOString();
      }
    }
    return out;
  });

  const headers = getAllKeys(normalized);
  const lines = [
    headers.join(','),
    ...normalized.map((d) => docToRow(d, headers)),
  ];
  const csv = lines.join('\r\n');

  const safeName = `${dbName}_${collName}.csv`.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const filePath = path.join(outDir, safeName);
  fs.writeFileSync(filePath, '\uFEFF' + csv, 'utf8'); // BOM para Excel em português
  console.log(`   ✅ ${safeName} (${docs.length} linhas)`);
}

async function main() {
  loadEnv();

  const uri = process.env.MONGODB_URI || process.env.MONGO_ENV;
  if (!uri) {
    console.error('❌ Defina MONGODB_URI ou MONGO_ENV no .env em:', ENV_FILE);
    process.exit(1);
  }

  const dbName = process.env.DB_NAME || 'console_conteudo';
  const singleCollection = process.env.COLLECTION || null;

  const outDir = path.join(__dirname, 'planilhas_export');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  console.log('📂 Planilhas em:', outDir);

  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('✅ Conectado ao MongoDB');

    if (singleCollection) {
      await exportCollection(client, dbName, singleCollection, outDir);
    } else {
      const db = client.db(dbName);
      const collections = await db.listCollections().toArray();
      for (const { name } of collections) {
        await exportCollection(client, dbName, name, outDir);
      }
    }
  } finally {
    await client.close();
  }
  console.log('✅ Exportação concluída.');
}

main().catch((err) => {
  console.error('❌ Erro:', err.message);
  process.exit(1);
});
