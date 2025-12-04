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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => handleVideoClick(item)}
      >
        {/* Thumbnail */}
        <div className="relative w-full" style={{ paddingBottom: isShort ? '177.78%' : '56.25%', height: 0 }}>
          <img 
            src={thumbnail}
            alt={item.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {/* Badge de Short */}
          {isShort && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
              SHORTS
            </div>
          )}
          {/* Overlay com play button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity">
            <div className="bg-white bg-opacity-90 rounded-full p-4 transform scale-75 hover:scale-90 transition-transform">
              <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.channelTitle || 'Velotax'}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                {item.viewCount && (
                  <span>{parseInt(item.viewCount).toLocaleString('pt-BR')} visualizações</span>
                )}
                {item.publishedAt && (
                  <span>• {new Date(item.publishedAt).toLocaleDateString('pt-BR')}</span>
                )}
              </div>
            </div>
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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        {/* Header do Instagram */}
        <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-0.5">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-white">velotax</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Instagram</p>
          </div>
        </div>

        {/* Imagem/Vídeo */}
        <div className="relative w-full" style={{ paddingBottom: '100%', height: 0 }}>
          <img 
            src={item.mediaUrl || item.imageUrl}
            alt={item.caption || 'Post do Instagram'}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* Caption */}
        {item.caption && (
          <div className="p-4">
            <p className="text-sm text-gray-900 dark:text-white line-clamp-3">
              <span className="font-semibold">velotax</span> {item.caption}
            </p>
            {item.timestamp && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {new Date(item.timestamp).toLocaleDateString('pt-BR')}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Feed Social
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Vídeos do YouTube e postagens do Instagram da Velotax
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Tudo', icon: '📱' },
            { id: 'youtube', label: 'Vídeos', icon: '▶️' },
            { id: 'shorts', label: 'Shorts', icon: '📹' },
            { id: 'instagram', label: 'Instagram', icon: '📷' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
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

        {/* Feed Grid */}
        {!loading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

