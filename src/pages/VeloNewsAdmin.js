/**
 * VeloHub V3 - Painel Administrativo VeloNews (Provisório)
 * VERSION: v1.0.0 | DATE: 2025-12-04 | AUTHOR: VeloHub Development Team
 * 
 * Painel provisório para gerenciar notícias do VeloNews
 * Funcionalidades:
 * - Criar/editar notícias
 * - Upload de imagens
 * - Embed de vídeos do YouTube
 */

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api-config';

const VeloNewsAdmin = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageBaseUrl, setImageBaseUrl] = useState(null); // URL base do bucket GCS
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    isCritical: false,
    images: [], // Array de imagens em base64
    videos: [], // Array de vídeos em base64
    videoYoutube: '', // URL do YouTube (será convertida para embed)
    solved: false
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Carregar notícias
  const carregarNoticias = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/velo-news`);
      const result = await response.json();
      if (result.success) {
        setNoticias(result.data || []);
      }
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar notícias' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarNoticias();
    // Carregar configuração de imagens (URL base do bucket)
    const carregarConfigImagens = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/images/config`);
        const result = await response.json();
        if (result.success && result.imageBaseUrl) {
          setImageBaseUrl(result.imageBaseUrl);
        }
      } catch (error) {
        console.error('Erro ao carregar configuração de imagens:', error);
      }
    };
    carregarConfigImagens();
  }, []);

  // Extrair ID do YouTube
  const extrairIdYoutube = (url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Gerar URL de embed do YouTube
  const gerarEmbedYoutube = (url) => {
    const videoId = extrairIdYoutube(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  // Adicionar imagens (múltiplas)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = [];
    let processed = 0;

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: `Imagem ${file.name} muito grande. Máximo 5MB.` });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Manter o formato completo com data:image para exibição no frontend
        // O backend vai processar e salvar como necessário
        newImages.push({
          data: reader.result, // Base64 completo (data:image/jpeg;base64,...)
          name: file.name,
          type: file.type,
          size: file.size
        });
        processed++;

        if (processed === files.length) {
          setFormData({
            ...formData,
            images: [...formData.images, ...newImages]
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remover imagem
  const removerImagem = (index) => {
    const novasImagens = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: novasImagens });
  };

  // Adicionar vídeo (base64)
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Vídeo muito grande. Máximo 50MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        videos: [...formData.videos, {
          data: reader.result, // Base64 completo
          name: file.name,
          type: file.type,
          size: file.size
        }]
      });
    };
    reader.readAsDataURL(file);
  };

  // Remover vídeo
  const removerVideo = (index) => {
    const novosVideos = formData.videos.filter((_, i) => i !== index);
    setFormData({ ...formData, videos: novosVideos });
  };

  // Salvar notícia
  const salvarNoticia = async () => {
    if (!formData.titulo || !formData.conteudo) {
      setMessage({ type: 'error', text: 'Título e conteúdo são obrigatórios' });
      return;
    }

    setLoading(true);
    try {
      // Preparar arrays de imagens: enviar caminhos relativos (strings) ou base64 para upload
      const imagesArray = formData.images.map(img => {
        // Se já é caminho relativo (formato novo), enviar como string
        if (img.path && (img.path.startsWith('img_velonews/') || img.path.startsWith('/img_velonews/'))) {
          return img.path.startsWith('/') ? img.path.substring(1) : img.path; // Retornar apenas a string
        }
        // Se é string com caminho relativo, enviar como está
        if (typeof img === 'string' && (img.startsWith('img_velonews/') || img.startsWith('/img_velonews/'))) {
          return img.startsWith('/') ? img.substring(1) : img; // Retornar apenas a string
        }
        // Se é URL completa antiga (compatibilidade), extrair path como string
        if (img.url && img.url.startsWith('http')) {
          const gcsMatch = img.url.match(/storage\.googleapis\.com\/[^\/]+\/(.+)$/);
          if (gcsMatch) {
            return gcsMatch[1]; // Retornar apenas a string do caminho
          }
        }
        // Se é base64 (nova imagem), remover prefixo data:image/...;base64,
        const base64Data = img.data && img.data.includes(',') 
          ? img.data.split(',')[1] 
          : (img.data || '');
        return {
          data: base64Data,
          name: img.name || 'imagem.jpg',
          type: img.type || 'image/jpeg',
          size: img.size || 0
        };
      });

      const videosArray = formData.videos.map(vid => {
        // Remover prefixo data:video/...;base64, se existir
        const base64Data = vid.data.includes(',') 
          ? vid.data.split(',')[1] 
          : vid.data;
        return {
          data: base64Data,
          name: vid.name,
          type: vid.type || 'video/mp4',
          size: vid.size
        };
      });

      // Adicionar vídeo do YouTube como embed se houver
      const videoEmbed = formData.videoYoutube ? gerarEmbedYoutube(formData.videoYoutube) : null;
      if (videoEmbed) {
        videosArray.push({
          data: null, // YouTube não precisa base64
          embed: videoEmbed,
          url: formData.videoYoutube,
          type: 'youtube',
          name: 'YouTube Video'
        });
      }
      
      const payload = {
        titulo: formData.titulo,
        conteudo: formData.conteudo,
        isCritical: formData.isCritical,
        solved: formData.solved,
        images: imagesArray, // Array de imagens em base64
        videos: videosArray, // Array de vídeos em base64 + YouTube
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('📤 [Frontend] Enviando payload:', {
        titulo: payload.titulo,
        imagesCount: imagesArray.length,
        imagesSample: imagesArray.length > 0 ? {
          type: typeof imagesArray[0],
          hasData: !!(imagesArray[0] && typeof imagesArray[0] === 'object' && imagesArray[0].data),
          dataLength: (imagesArray[0] && typeof imagesArray[0] === 'object' && imagesArray[0].data) ? imagesArray[0].data.length : 0,
          name: imagesArray[0]?.name || 'sem nome'
        } : null
      });

      let response;
      if (editingId) {
        // Atualizar
        response = await fetch(`${API_BASE_URL}/velo-news/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Criar
        response = await fetch(`${API_BASE_URL}/velo-news`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const result = await response.json();
      
      console.log('📥 [Frontend] Resposta do servidor:', {
        success: result.success,
        message: result.message,
        hasData: !!result.data,
        dataImagesCount: result.data?.media?.images?.length || result.data?.images?.length || 0
      });
      
      if (result.success || response.ok) {
        setMessage({ type: 'success', text: editingId ? 'Notícia atualizada!' : 'Notícia criada!' });
        limparFormulario();
        carregarNoticias();
      } else {
        console.error('❌ [Frontend] Erro ao salvar:', result);
        setMessage({ type: 'error', text: result.message || 'Erro ao salvar' });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar notícia' });
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para construir URL da imagem a partir do caminho relativo
  const getImageUrl = (img) => {
    // Se é caminho relativo (formato novo: string "img_velonews/123.jpg")
    if (typeof img === 'string' && (img.startsWith('img_velonews/') || img.startsWith('/img_velonews/'))) {
      const cleanPath = img.startsWith('/') ? img.substring(1) : img;
      // Construir URL completa usando a URL base do bucket
      if (imageBaseUrl) {
        return `${imageBaseUrl}/${cleanPath}`;
      }
      // Fallback: usar endpoint do backend
      return `${API_BASE_URL}/images/${cleanPath}`;
    }
    // Se é objeto com path (compatibilidade temporária)
    if (img && typeof img === 'object' && img.path && (img.path.startsWith('img_velonews/') || img.path.startsWith('/img_velonews/'))) {
      const cleanPath = img.path.startsWith('/') ? img.path.substring(1) : img.path;
      // Construir URL completa usando a URL base do bucket
      if (imageBaseUrl) {
        return `${imageBaseUrl}/${cleanPath}`;
      }
      // Fallback: usar endpoint do backend
      return `${API_BASE_URL}/images/${cleanPath}`;
    }
    // Se é URL completa antiga (compatibilidade)
    if (typeof img === 'string' && img.startsWith('http')) {
      return img;
    }
    if (img.url && img.url.startsWith('http')) {
      return img.url;
    }
    // Se é base64 (compatibilidade)
    if (typeof img === 'string') {
      return img.includes('data:') ? img : `data:image/jpeg;base64,${img}`;
    }
    if (img.data) {
      return img.data.includes('data:') ? img.data : `data:image/jpeg;base64,${img.data}`;
    }
    return null;
  };

  // Editar notícia
  const editarNoticia = (noticia) => {
    // Conforme esquema: imagens estão em media.images (formato novo) ou images (compatibilidade)
    const imagesArray = noticia.media?.images || noticia.images || [];
    
    // Processar imagens: agora são strings (caminhos relativos) ou base64 (compatibilidade)
    const imagesPreview = imagesArray.map(img => {
      // Se é caminho relativo (formato novo) - string simples
      if (typeof img === 'string' && (img.startsWith('img_velonews/') || img.startsWith('/img_velonews/'))) {
        const cleanPath = img.startsWith('/') ? img.substring(1) : img;
        return { 
          path: cleanPath, 
          fileName: cleanPath.split('/').pop() || 'imagem.jpg',
          isUrl: true 
        };
      }
      // Se é objeto com path (compatibilidade temporária)
      if (img && typeof img === 'object' && img.path && (img.path.startsWith('img_velonews/') || img.path.startsWith('/img_velonews/'))) {
        const cleanPath = img.path.startsWith('/') ? img.path.substring(1) : img.path;
        return { 
          path: cleanPath, 
          fileName: img.fileName || cleanPath.split('/').pop() || 'imagem.jpg',
          isUrl: true 
        };
      }
      // Se é URL completa antiga (compatibilidade)
      if (typeof img === 'string' && img.startsWith('http')) {
        return { url: img, path: null, fileName: null, isUrl: true };
      }
      if (img.url && img.url.startsWith('http')) {
        return { url: img.url, path: img.path || null, fileName: img.fileName || null, isUrl: true };
      }
      // Se é base64 (compatibilidade com dados antigos)
      if (typeof img === 'string') {
        const base64Data = img.includes('data:') ? img : `data:image/jpeg;base64,${img}`;
        return { data: base64Data, name: 'imagem.jpg', type: 'image/jpeg', size: 0, isUrl: false };
      }
      // Se é objeto com data (base64)
      const base64Data = img.data || img;
      const fullBase64 = base64Data.includes('data:') ? base64Data : `data:image/jpeg;base64,${base64Data}`;
      return {
        data: fullBase64,
        name: img.name || 'imagem.jpg',
        type: img.type || 'image/jpeg',
        size: img.size || 0,
        isUrl: false
      };
    });

    // Extrair URL do YouTube dos vídeos
    const youtubeVideo = (noticia.videos || []).find(v => v.type === 'youtube' || v.embed);
    const videoYoutubeUrl = youtubeVideo ? (youtubeVideo.url || '') : '';

    setFormData({
      titulo: noticia.title || noticia.titulo || '',
      conteudo: noticia.content || noticia.conteudo || '',
      isCritical: noticia.is_critical === 'Y' || noticia.isCritical === true,
      images: imagesPreview,
      videos: (noticia.videos || []).filter(v => v.type !== 'youtube').map((vid, idx) => ({
        data: typeof vid === 'string' 
          ? (vid.includes('data:') ? vid : `data:video/mp4;base64,${vid}`)
          : (vid.data?.includes('data:') ? vid.data : `data:video/mp4;base64,${vid.data || vid}`),
        name: vid.name || `video-${idx + 1}.mp4`,
        type: vid.type || 'video/mp4',
        size: vid.size || 0
      })),
      videoYoutube: videoYoutubeUrl,
      solved: noticia.solved || false
    });
    setEditingId(noticia._id);
  };

  // Deletar notícia
  const deletarNoticia = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta notícia?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/velo-news/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Notícia deletada!' });
        carregarNoticias();
      } else {
        setMessage({ type: 'error', text: 'Erro ao deletar' });
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
      setMessage({ type: 'error', text: 'Erro ao deletar notícia' });
    } finally {
      setLoading(false);
    }
  };

  // Limpar formulário
  const limparFormulario = () => {
    setFormData({
      titulo: '',
      conteudo: '',
      isCritical: false,
      images: [],
      videos: [],
      videoYoutube: '',
      solved: false
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          📰 Painel Administrativo VeloNews (Provisório)
        </h1>

        {/* Mensagem */}
        {message.text && (
          <div className={`mb-4 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {message.text}
            <button 
              onClick={() => setMessage({ type: '', text: '' })}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {editingId ? '✏️ Editar Notícia' : '➕ Nova Notícia'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Título da notícia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Conteúdo *
                </label>
                <textarea
                  value={formData.conteudo}
                  onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Conteúdo da notícia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL do Vídeo YouTube
                </label>
                <input
                  type="text"
                  value={formData.videoYoutube}
                  onChange={(e) => setFormData({ ...formData, videoYoutube: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {formData.videoYoutube && extrairIdYoutube(formData.videoYoutube) && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded">
                      <iframe
                        src={gerarEmbedYoutube(formData.videoYoutube)}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Imagens (múltiplas)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
                {formData.images.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {formData.images.map((img, idx) => {
                      const imgSrc = getImageUrl(img);
                      // Extrair nome do arquivo do path ou usar fallback
                      const imgName = img.fileName || img.name || 
                        (typeof img === 'string' && img.includes('/') ? img.split('/').pop() : null) ||
                        (img.path ? img.path.split('/').pop() : null) ||
                        `imagem-${idx + 1}.jpg`;
                      return (
                        <div key={idx} className="relative">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                              onError={(e) => {
                                // Placeholder em caso de erro ao carregar
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="Arial" font-size="14"%3EImagem não encontrada%3C/text%3E%3C/svg%3E';
                              }}
                            />
                          ) : (
                            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <span className="text-gray-500 dark:text-gray-400 text-sm">Placeholder</span>
                            </div>
                          )}
                          <button
                            onClick={() => removerImagem(idx)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{imgName}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vídeos (arquivo)
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
                {formData.videos.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {formData.videos.map((vid, idx) => (
                      <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{vid.name}</span>
                          <button
                            onClick={() => removerVideo(idx)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            🗑️ Remover
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {(vid.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isCritical}
                    onChange={(e) => setFormData({ ...formData, isCritical: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Notícia Crítica</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.solved}
                    onChange={(e) => setFormData({ ...formData, solved: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Resolvida</span>
                </label>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={salvarNoticia}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Salvando...' : (editingId ? 'Atualizar' : 'Criar')}
                </button>
                {editingId && (
                  <button
                    onClick={limparFormulario}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Lista de Notícias */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              📋 Notícias ({noticias.length})
            </h2>

            {loading && !noticias.length ? (
              <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
            ) : noticias.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">Nenhuma notícia encontrada</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {noticias.map((noticia) => (
                  <div
                    key={noticia._id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {noticia.title || noticia.titulo || '(sem título)'}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editarNoticia(noticia)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deletarNoticia(noticia._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {noticia.content || noticia.conteudo || ''}
                    </p>

                    {/* Imagens */}
                    {(() => {
                      // Conforme esquema: imagens estão em media.images (formato novo) ou images (compatibilidade)
                      const imagesArray = noticia.media?.images || noticia.images || [];
                      return imagesArray && Array.isArray(imagesArray) && imagesArray.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          {imagesArray.map((img, idx) => {
                          const imgSrc = getImageUrl(img);
                          return (
                            <div key={idx} className="relative">
                              {imgSrc ? (
                                <img
                                  src={imgSrc}
                                  alt={`Imagem ${idx + 1}`}
                                  className="w-full h-24 object-cover rounded"
                                  onError={(e) => {
                                    // Placeholder em caso de erro ao carregar
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="100"%3E%3Crect width="200" height="100" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="Arial" font-size="12"%3EImagem não encontrada%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                  <span className="text-gray-500 dark:text-gray-400 text-xs">Placeholder</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      );
                    })()}

                    {/* Vídeos do YouTube */}
                    {noticia.videos && Array.isArray(noticia.videos) && noticia.videos.some(v => v.type === 'youtube' || v.embed) && (
                      <div className="space-y-2 mb-2">
                        {noticia.videos
                          .filter(v => v.type === 'youtube' || v.embed)
                          .map((vid, idx) => (
                            <div key={idx} className="relative pb-[56.25%] h-0 overflow-hidden rounded">
                              <iframe
                                src={vid.embed || vid.data}
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Vídeos em base64 */}
                    {noticia.videos && Array.isArray(noticia.videos) && noticia.videos.some(v => v.type !== 'youtube' && !v.embed) && (
                      <div className="space-y-2 mb-2">
                        {noticia.videos
                          .filter(v => v.type !== 'youtube' && !v.embed)
                          .map((vid, idx) => {
                            const videoSrc = typeof vid === 'string'
                              ? (vid.includes('data:') ? vid : `data:video/mp4;base64,${vid}`)
                              : (vid.data?.includes('data:') ? vid.data : `data:video/mp4;base64,${vid.data || vid}`);
                            return (
                              <video
                                key={idx}
                                src={videoSrc}
                                controls
                                className="w-full rounded"
                              >
                                Seu navegador não suporta vídeo.
                              </video>
                            );
                          })}
                      </div>
                    )}

                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      {noticia.is_critical === 'Y' && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                          🚨 Crítica
                        </span>
                      )}
                      {noticia.solved && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                          ✅ Resolvida
                        </span>
                      )}
                      <span>
                        {new Date(noticia.createdAt || noticia.updatedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeloNewsAdmin;

