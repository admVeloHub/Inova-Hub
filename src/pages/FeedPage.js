/**
 * VeloHub V3 - Página de Feed Social
 * VERSION: v2.0.0 | DATE: 2025-01-31 | AUTHOR: VeloHub Development Team
 * 
 * Feed integrado com YouTube (vídeos e shorts) e Instagram (embed direto)
 */

import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config/api-config';

const FeedPage = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'youtube', 'shorts', 'instagram'
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const shortsContainerRef = useRef(null);

  // Carregar feed
  const carregarFeed = async () => {
    setLoading(true);
    try {
      // Buscar vídeos do YouTube
      const youtubeResponse = await fetch(`${API_BASE_URL}/feed/youtube`);
      const youtubeData = await youtubeResponse.json();

      if (youtubeData.success && youtubeData.data) {
        const videos = youtubeData.data;
        // Separar shorts dos vídeos normais
        const shortsList = videos.filter(v => v.isShort);
        const normalVideos = videos.filter(v => !v.isShort);
        
        setShorts(shortsList);
        setFeedItems(normalVideos);
      }
    } catch (error) {
      console.error('Erro ao carregar feed:', error);
      setFeedItems([]);
      setShorts([]);
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
    if (activeTab === 'instagram') return item.type === 'instagram';
    return true;
  });

  // Abrir modal de vídeo
  const handleVideoClick = (item) => {
    setSelectedItem(item);
  };

  // Dar like no vídeo (YouTube API)
  const handleLikeVideo = async (videoId, e) => {
    e.stopPropagation();
    
    if (likedVideos.has(videoId)) {
      // Já curtiu, remover like
      setLikedVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/feed/youtube/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId })
      });

      const result = await response.json();
      
      if (result.success) {
        setLikedVideos(prev => new Set(prev).add(videoId));
      } else {
        console.error('Erro ao dar like:', result.message);
        // Mesmo assim, marcar como curtido localmente
        setLikedVideos(prev => new Set(prev).add(videoId));
      }
    } catch (error) {
      console.error('Erro ao dar like:', error);
      // Marcar como curtido localmente mesmo com erro
      setLikedVideos(prev => new Set(prev).add(videoId));
    }
  };

  // Navegação de shorts com setas
  const handleShortNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentShortIndex(prev => (prev + 1) % shorts.length);
    } else {
      setCurrentShortIndex(prev => (prev - 1 + shorts.length) % shorts.length);
    }
  };

  // Navegação por teclado
  useEffect(() => {
    if (activeTab === 'shorts' && shorts.length > 0) {
      const handleKeyPress = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          handleShortNavigation(e.key === 'ArrowDown' ? 'next' : 'prev');
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [activeTab, shorts.length]);

  // Renderizar card de vídeo do YouTube
  const renderYouTubeCard = (item) => {
    const thumbnail = item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
    const isLiked = likedVideos.has(item.videoId);

    return (
      <div 
        key={item.id || item.videoId}
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
      >
        {/* Thumbnail horizontal */}
        <div 
          className="relative w-full cursor-pointer" 
          style={{ height: '200px' }}
          onClick={() => handleVideoClick(item)}
        >
          <img 
            src={thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
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
          <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-2">
            {item.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              {item.viewCount && (
                <span>{parseInt(item.viewCount).toLocaleString('pt-BR')} views</span>
              )}
              {item.publishedAt && (
                <span>• {new Date(item.publishedAt).toLocaleDateString('pt-BR')}</span>
              )}
            </div>
            {/* Botão de Like */}
            <button
              onClick={(e) => handleLikeVideo(item.videoId, e)}
              className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                isLiked 
                  ? 'text-red-600 hover:text-red-700' 
                  : 'text-gray-500 hover:text-red-600'
              }`}
              title="Curtir no YouTube"
            >
              <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {isLiked && <span className="text-xs">Curtido</span>}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar feed de Shorts (tipo TikTok/Reels)
  const renderShortsFeed = () => {
    if (shorts.length === 0) {
      return (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📹</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Nenhum Short encontrado
          </h3>
        </div>
      );
    }

    const currentShort = shorts[currentShortIndex];

    return (
      <div 
        ref={shortsContainerRef}
        className="relative w-full max-w-md mx-auto"
        style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
      >
        {/* Short atual */}
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${currentShort.videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Overlay com informações */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-semibold mb-2 line-clamp-2">
              {currentShort.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white text-sm">
                {currentShort.viewCount && (
                  <span>{parseInt(currentShort.viewCount).toLocaleString('pt-BR')} views</span>
                )}
              </div>
              {/* Botão de Like */}
              <button
                onClick={(e) => handleLikeVideo(currentShort.videoId, e)}
                className={`flex flex-col items-center gap-1 ${
                  likedVideos.has(currentShort.videoId) 
                    ? 'text-red-600' 
                    : 'text-white'
                }`}
              >
                <svg className="w-6 h-6" fill={likedVideos.has(currentShort.videoId) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs">Curtir</span>
              </button>
            </div>
          </div>

          {/* Indicador de posição */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {currentShortIndex + 1} / {shorts.length}
          </div>
        </div>

        {/* Botões de navegação */}
        <button
          onClick={() => handleShortNavigation('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all"
          disabled={shorts.length <= 1}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => handleShortNavigation('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all"
          disabled={shorts.length <= 1}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Instruções */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-xs bg-black/50 px-3 py-1 rounded">
          Use ↑ ↓ ou clique nas setas para navegar
        </div>
      </div>
    );
  };

  // Renderizar card do Instagram (embed direto)
  const renderInstagramCard = () => {
    // Usar embed direto do Instagram sem API
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden p-4">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Para ver as postagens do Instagram, acesse:
          </p>
          <a 
            href="https://www.instagram.com/velo_tax/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            @velo_tax no Instagram
          </a>
        </div>
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

        {/* Feed de Shorts (tipo TikTok) */}
        {!loading && activeTab === 'shorts' && renderShortsFeed()}

        {/* Feed Grid - Layout mais compacto */}
        {!loading && activeTab !== 'shorts' && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => {
              if (item.type === 'youtube') {
                return renderYouTubeCard(item);
              } else if (item.type === 'instagram') {
                return renderInstagramCard();
              }
              return null;
            })}
          </div>
        )}

        {/* Mostrar shorts na tab "Tudo" */}
        {!loading && activeTab === 'all' && shorts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shorts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {shorts.slice(0, 12).map((short, idx) => (
                <div
                  key={short.id || short.videoId}
                  className="relative cursor-pointer rounded-lg overflow-hidden bg-black"
                  style={{ paddingBottom: '177.78%', height: 0 }}
                  onClick={() => {
                    setActiveTab('shorts');
                    setCurrentShortIndex(shorts.indexOf(short));
                  }}
                >
                  <img
                    src={short.thumbnail || `https://img.youtube.com/vi/${short.videoId}/mqdefault.jpg`}
                    alt={short.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                    SHORTS
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && activeTab !== 'shorts' && filteredItems.length === 0 && (
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
              {/* Botão de Like no modal */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={(e) => handleLikeVideo(selectedItem.videoId, e)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    likedVideos.has(selectedItem.videoId)
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill={likedVideos.has(selectedItem.videoId) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {likedVideos.has(selectedItem.videoId) ? 'Curtido' : 'Curtir'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
