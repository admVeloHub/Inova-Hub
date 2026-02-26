/**
 * Página de Mídias Velotax - vídeos por sessão (IRPF, Crédito, Seguros)
 * Layout: grid com thumbs menores + lateral Categorias com ícones
 */
import React, { useState, useRef } from 'react';
import { Calculator, CreditCard, ShieldCheck, FileText } from 'lucide-react';
import { SESSOES, SESSOES_ORDEM } from '../lib/midiasVelotax';

const CATEGORIA_ICONES = {
  irpf: Calculator,
  credito: CreditCard,
  seguros: ShieldCheck,
};

function getEmbedUrl(url, type) {
  if (type === 'youtube') {
    const trimmed = (url || '').trim();
    if (trimmed.includes('/embed/')) return trimmed;
    const match = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return trimmed;
  }
  return url;
}

function getYtThumbUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const m = url.match(/embed\/([a-zA-Z0-9_-]+)/);
  if (m && m[1] !== 'videoseries') return `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg`;
  const m2 = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (m2) return `https://img.youtube.com/vi/${m2[1]}/mqdefault.jpg`;
  return null;
}

export default function MidiasPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategoriaKey, setActiveCategoriaKey] = useState(null);
  const [failedThumbs, setFailedThumbs] = useState({});
  const sectionRefs = useRef({});

  const allVideos = SESSOES_ORDEM.flatMap((key) => {
    const sessao = SESSOES[key];
    if (!sessao?.videos?.length) return [];
    return sessao.videos.map((v) => ({ ...v, sessaoKey: key, sessaoTitulo: sessao.titulo }));
  });

  return (
    <div className="velohub-container rounded-2xl p-4 md:p-6 min-h-[80vh]" style={{ border: '1px solid var(--cor-borda)' }}>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Conteúdo principal: grid com thumbs menores */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Mídias Velotax
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Vídeos por sessão: IRPF, Crédito e Seguros
            </p>
          </div>

          <div className="space-y-8">
            {SESSOES_ORDEM.map((key) => {
              const sessao = SESSOES[key];
              if (!sessao?.videos?.length) return null;

              return (
                <section
                  key={key}
                  ref={(el) => { sectionRefs.current[key] = el; }}
                  className="rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur border border-gray-200/80 dark:border-gray-700/80 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
                    {sessao.titulo}
                  </h2>
                  {sessao.descricao && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{sessao.descricao}</p>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {sessao.videos.map((video) => {
                      const embedUrl = getEmbedUrl(video.url, video.type);
                      const thumbUrl = video.type === 'youtube' ? getYtThumbUrl(video.url) : video.thumbnail;
                      const thumbFalhou = failedThumbs[video.id];
                      const mostrarThumb = thumbUrl && !thumbFalhou;
                      const isSelected = selectedVideo?.id === video.id;

                      return (
                        <article
                          key={video.id}
                          className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/30 shadow-lg'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedVideo(isSelected ? null : { ...video, embedUrl })}
                            className="w-full text-left block"
                          >
                            <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                              {mostrarThumb ? (
                                <img
                                  src={thumbUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  onError={() => setFailedThumbs((p) => ({ ...p, [video.id]: true }))}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                                  <span className="text-2xl text-gray-400">▶</span>
                                </div>
                              )}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                                <span className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center text-blue-600 opacity-0 hover:opacity-100 transition-opacity shadow">
                                  ▶
                                </span>
                              </div>
                            </div>
                            <div className="p-2">
                              <h3 className="text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight">
                                {video.titulo}
                              </h3>
                              {video.duracao && video.duracao !== '—' && (
                                <p className="text-[10px] text-gray-400 mt-0.5">{video.duracao}</p>
                              )}
                            </div>
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Lateral: Categorias */}
        <aside className="lg:w-56 xl:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              Categorias
            </p>
            <div className="flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 lg:overflow-x-visible">
              {SESSOES_ORDEM.map((key) => {
                const sessao = SESSOES[key];
                if (!sessao?.videos?.length) return null;
                const Icon = CATEGORIA_ICONES[key] ?? FileText;
                const isActive = activeCategoriaKey === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setActiveCategoriaKey(key);
                      sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
                  >
                    <div
                      className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'border-2 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/40 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-2 border-gray-200 dark:border-gray-600 group-hover:border-gray-300 dark:group-hover:border-gray-500 bg-white dark:bg-gray-800/80'
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 lg:w-9 lg:h-9 ${
                          isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                        }`}
                        strokeWidth={1.8}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 max-w-[4rem] lg:max-w-[5rem] truncate text-center">
                      {sessao.titulo}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Player em destaque (modal-style) quando um vídeo é selecionado */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
          onKeyDown={(e) => e.key === 'Escape' && setSelectedVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Assistir vídeo"
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center text-xl transition-colors"
              aria-label="Fechar"
            >
              ×
            </button>
            <div className="aspect-video">
              {selectedVideo.type === 'youtube' ? (
                <iframe
                  src={selectedVideo.embedUrl + (selectedVideo.embedUrl.includes('?') ? '&' : '?') + 'autoplay=1'}
                  title={selectedVideo.titulo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={selectedVideo.url} controls autoPlay className="w-full h-full" />
              )}
            </div>
            <div className="p-3 bg-gray-900 text-white">
              <p className="font-medium text-sm">{selectedVideo.titulo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
