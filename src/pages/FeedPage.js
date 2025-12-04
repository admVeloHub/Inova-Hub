/**
 * VeloHub V3 - Página de Feed Social
 * VERSION: v1.0.0 | DATE: 2025-01-31 | AUTHOR: VeloHub Development Team
 * 
 * Feed integrado com YouTube (vídeos e shorts) e Instagram
 */

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api-config';

const FeedPage = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'youtube', 'shorts', 'instagram'
  const [selectedItem, setSelectedItem] = useState(null);

  // Carregar feed
  const carregarFeed = async () => {
    setLoading(true);
    try {
      // Buscar vídeos do YouTube
      const youtubeResponse = await fetch(`${API_BASE_URL}/feed/youtube`);
      const youtubeData = await youtubeResponse.json();

      // Buscar postagens do Instagram
      const instagramResponse = await fetch(`${API_BASE_URL}/feed/instagram`);
      const instagramData = await instagramResponse.json();

      // Combinar e ordenar por data
      const allItems = [
        ...(youtubeData.success ? youtubeData.data || [] : []),
        ...(instagramData.success ? instagramData.data || [] : [])
      ].sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.timestamp || 0);
        const dateB = new Date(b.publishedAt || b.timestamp || 0);
        return dateB - dateA;
      });

      setFeedItems(allItems);
    } catch (error) {
      console.error('Erro ao carregar feed:', error);
      // Em caso de erro, usar dados mock para desenvolvimento
      setFeedItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFeed();
  }, []);

  // Filtrar itens por tab
  const filteredItems = feedItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'youtube') return item.type === 'youtube' && !item.isShort;
    if (activeTab === 'shorts') return item.type === 'youtube' && item.isShort;
    if (activeTab === 'instagram') return item.type === 'instagram';
    return true;
  });

  // Abrir modal de vídeo
  const handleVideoClick = (item) => {
    setSelectedItem(item);
  };

  // Renderizar card de vídeo do YouTube
  const renderYouTubeCard = (item) => {
    const thumbnail = item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
    const isShort = item.isShort || false;

    return (
      <div 
        key={item.id || item.videoId}
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onClick={() => handleVideoClick(item)}
      >
        {/* Thumbnail horizontal */}
        <div className="relative w-full" style={{ height: '200px' }}>
          <img 
            src={thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {/* Badge de Short */}
          {isShort && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
              SHORTS
            </div>
          )}
          {/* Overlay com play button - apenas no hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity">
            <div className="bg-white bg-opacity-95 rounded-full p-3 transform scale-90 opacity-0 hover:opacity-100 transition-all">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Informações compactas */}
        <div className="p-3">
          <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {item.viewCount && (
              <span>{parseInt(item.viewCount).toLocaleString('pt-BR')} views</span>
            )}
            {item.publishedAt && (
              <span>• {new Date(item.publishedAt).toLocaleDateString('pt-BR')}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Renderizar card do Instagram
  const renderInstagramCard = (item) => {
    return (
      <div 
        key={item.id}
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
      >
        {/* Imagem horizontal */}
        <div className="relative w-full" style={{ height: '200px' }}>
          <img 
            src={item.mediaUrl || item.imageUrl}
            alt={item.caption || 'Post do Instagram'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Caption compacta */}
        {item.caption && (
          <div className="p-3">
            <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
              <span className="font-semibold">velotax</span> {item.caption}
            </p>
            {item.timestamp && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(item.timestamp).toLocaleDateString('pt-BR')}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header simplificado */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            Feed Social
          </h1>
        </div>

        {/* Tabs simplificadas */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'all', label: 'Tudo' },
            { id: 'youtube', label: 'Vídeos' },
            { id: 'shorts', label: 'Shorts' },
            { id: 'instagram', label: 'Instagram' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Feed Grid - Layout mais compacto */}
        {!loading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => {
              if (item.type === 'youtube') {
                return renderYouTubeCard(item);
              } else if (item.type === 'instagram') {
                return renderInstagramCard(item);
              }
              return null;
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum conteúdo encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente selecionar outra categoria ou verifique as configurações da API.
            </p>
          </div>
        )}

        {/* Modal de Vídeo */}
        {selectedItem && selectedItem.type === 'youtube' && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div 
              className="relative max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl z-10"
              >
                &times;
              </button>
              <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedItem.videoId}?autoplay=1`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;

