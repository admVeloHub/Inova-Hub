/**
 * Serviço de Upload de Imagens para Google Cloud Storage
 * VERSION: v1.0.0 | DATE: 2025-01-30 | AUTHOR: VeloHub Development Team
 * 
 * Este serviço gerencia o upload de imagens para o GCS na pasta img_velonews/
 * e retorna URLs públicas para armazenamento no MongoDB
 */

const { Storage } = require('@google-cloud/storage');
const config = require('../config');
const localConfig = require('../config-local');

// Inicializar Google Cloud Storage
let storage = null;
let bucket = null;

const initializeStorage = () => {
  try {
    const bucketName = process.env.GCS_BUCKET_NAME2 || config.GCS_BUCKET_NAME2;
    
    if (!bucketName) {
      console.warn('⚠️ GCS_BUCKET_NAME2 não configurado. Upload de imagens desabilitado.');
      return null;
    }

    // Inicializar Storage (usa credenciais do ambiente ou service account)
    storage = new Storage({
      // Se houver variável de ambiente GOOGLE_APPLICATION_CREDENTIALS, será usada automaticamente
      // Caso contrário, tenta usar as credenciais padrão do GCP
    });

    bucket = storage.bucket(bucketName);
    console.log(`✅ Google Cloud Storage inicializado. Bucket: ${bucketName}`);
    
    return bucket;
  } catch (error) {
    console.error('❌ Erro ao inicializar Google Cloud Storage:', error);
    return null;
  }
};

// Inicializar na primeira chamada
if (!bucket) {
  bucket = initializeStorage();
}

/**
 * Faz upload de uma imagem em base64 para o GCS
 * @param {string} base64Data - Dados da imagem em base64 (sem prefixo data:image)
 * @param {string} fileName - Nome do arquivo (ex: "imagem.jpg")
 * @param {string} mimeType - Tipo MIME da imagem (ex: "image/jpeg")
 * @param {string} folder - Pasta no bucket (padrão: "img_velonews")
 * @returns {Promise<{url: string, path: string}>} URL pública e caminho do arquivo
 */
const uploadImageToGCS = async (base64Data, fileName, mimeType = 'image/jpeg', folder = 'img_velonews') => {
  if (!bucket) {
    throw new Error('Google Cloud Storage não inicializado. Configure GCS_BUCKET_NAME2.');
  }

  try {
    // Remover prefixo data:image se existir
    const cleanBase64 = base64Data.includes(',') 
      ? base64Data.split(',')[1] 
      : base64Data;

    // Converter base64 para Buffer
    const buffer = Buffer.from(cleanBase64, 'base64');

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const extension = fileName.split('.').pop() || 'jpg';
    const uniqueFileName = `${timestamp}-${randomId}.${extension}`;
    const filePath = `${folder}/${uniqueFileName}`;

    // Criar arquivo no bucket
    const file = bucket.file(filePath);

    // Fazer upload
    await file.save(buffer, {
      metadata: {
        contentType: mimeType,
        cacheControl: 'public, max-age=31536000', // Cache de 1 ano
      },
      public: true, // Tornar arquivo público
    });

    // Retornar apenas caminho relativo (ex: img_velonews/123.jpg)
    // A URL completa será construída no frontend usando a variável do bucket
    const relativePath = filePath; // Já inclui a pasta (ex: img_velonews/123.jpg)

    console.log(`✅ Imagem enviada para GCS: ${relativePath}`);

    // Retornar apenas o caminho relativo como string (conforme esquema)
    return relativePath; // String: "img_velonews/123.jpg"
  } catch (error) {
    console.error('❌ Erro ao fazer upload da imagem para GCS:', error);
    throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
  }
};

/**
 * Faz upload de múltiplas imagens
 * @param {Array} images - Array de objetos {data: string, name: string, type: string}
 * @param {string} folder - Pasta no bucket (padrão: "img_velonews")
 * @returns {Promise<Array>} Array de URLs públicas
 */
const uploadMultipleImages = async (images, folder = 'img_velonews') => {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }

  const uploadPromises = images.map(async (img) => {
    try {
      // Se já é um caminho relativo (string), retornar como está
      if (typeof img === 'string' && (img.startsWith('img_velonews/') || img.startsWith('/img_velonews/'))) {
        const cleanPath = img.startsWith('/') ? img.substring(1) : img;
        return cleanPath; // Retornar apenas a string do caminho
      }

      // Se é objeto com path (caminho relativo), extrair apenas o path
      if (img.path && (img.path.startsWith('img_velonews/') || img.path.startsWith('/img_velonews/'))) {
        const cleanPath = img.path.startsWith('/') ? img.path.substring(1) : img.path;
        return cleanPath; // Retornar apenas a string do caminho
      }

      // Compatibilidade: Se é URL completa antiga, extrair o path
      if (typeof img === 'string' && img.startsWith('http')) {
        const gcsMatch = img.match(/storage\.googleapis\.com\/[^\/]+\/(.+)$/);
        if (gcsMatch) {
          return gcsMatch[1]; // Retornar apenas o caminho como string
        }
        return null;
      }

      // Se é objeto com URL completa antiga
      if (img.url && img.url.startsWith('http')) {
        const gcsMatch = img.url.match(/storage\.googleapis\.com\/[^\/]+\/(.+)$/);
        if (gcsMatch) {
          return gcsMatch[1]; // Retornar apenas o caminho como string
        }
        return null;
      }

      // Se é base64, fazer upload e retornar apenas o caminho
      const base64Data = typeof img === 'string' ? img : (img.data || img);
      const fileName = typeof img === 'string' ? 'imagem.jpg' : (img.name || 'imagem.jpg');
      const mimeType = typeof img === 'string' ? 'image/jpeg' : (img.type || 'image/jpeg');

      const result = await uploadImageToGCS(base64Data, fileName, mimeType, folder);
      return result; // uploadImageToGCS agora retorna apenas a string do caminho
    } catch (error) {
      console.error(`❌ Erro ao fazer upload de imagem ${img.name || 'desconhecida'}:`, error);
      return null;
    }
  });

  const results = await Promise.all(uploadPromises);
  // Filtrar resultados nulos (falhas) e retornar array de strings
  return results.filter(result => result !== null && typeof result === 'string');
};

/**
 * Deleta uma imagem do GCS
 * @param {string} filePath - Caminho do arquivo no bucket
 * @returns {Promise<boolean>} true se deletado com sucesso
 */
const deleteImageFromGCS = async (filePath) => {
  if (!bucket) {
    throw new Error('Google Cloud Storage não inicializado.');
  }

  try {
    const file = bucket.file(filePath);
    await file.delete();
    console.log(`✅ Imagem deletada do GCS: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao deletar imagem do GCS (${filePath}):`, error);
    return false;
  }
};

module.exports = {
  uploadImageToGCS,
  uploadMultipleImages,
  deleteImageFromGCS,
  initializeStorage
};

