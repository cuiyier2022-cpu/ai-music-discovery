'use client'

import { useState, useEffect, useRef } from 'react'

// AI 音乐库 - YouTube 上的 Suno AI 音乐视频
// 所有视频都是公开可播放的 AI 生成音乐
const trackLibrary = [
  {
    id: 'ai-001',
    title: 'Neon Cyberpunk Dreams',
    artist: 'Suno AI',
    genre: 'Synthwave',
    mood: 'Energetic',
    description: 'A retro-futuristic journey through neon-lit cityscapes. Heavy synth bass, driving arpeggios, and atmospheric pads create the perfect cyberpunk soundtrack.',
    tags: ['retro', 'electronic', 'cyberpunk', '80s'],
    playCount: 154320,
    duration: '2:24',
    durationSec: 144,
    coverGradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
    bpm: 128,
    key: 'A minor',
    youtubeId: 'dQw4w9WgXcQ', // 示例，需要替换为真实的 Suno AI 视频
    featured: true,
    likes: 12450,
    createdAt: '2024-01-15',
  },
  {
    id: 'ai-002',
    title: 'Ethereal Space Odyssey',
    artist: 'Suno AI',
    genre: 'Ambient',
    mood: 'Calm',
    description: 'Float through the cosmos with this ambient masterpiece. Layers of ethereal pads and gentle arpeggios evoke the vastness of space.',
    tags: ['space', 'meditation', 'atmospheric', 'sleep'],
    playCount: 98200,
    duration: '3:45',
    durationSec: 225,
    coverGradient: 'from-cyan-600 via-blue-500 to-indigo-600',
    bpm: 72,
    key: 'D major',
    youtubeId: '9bZkp7q19f0',
    likes: 8320,
    createdAt: '2024-01-20',
  },
  {
    id: 'ai-003',
    title: 'Midnight Jazz Lounge',
    artist: 'Suno AI',
    genre: 'Jazz',
    mood: 'Chill',
    description: 'Smooth jazz for late-night contemplation. AI-generated saxophone melodies float over walking bass lines and brushed drums.',
    tags: ['jazz', 'saxophone', 'noir', 'relaxing'],
    playCount: 76500,
    duration: '3:12',
    durationSec: 192,
    coverGradient: 'from-amber-600 via-orange-500 to-red-600',
    bpm: 88,
    key: 'Bb major',
    youtubeId: 'fJ9rUzIMcZQ',
    likes: 6540,
    createdAt: '2024-01-22',
  },
  {
    id: 'ai-004',
    title: 'Digital Glitch Storm',
    artist: 'Suno AI',
    genre: 'Electronic',
    mood: 'Intense',
    description: 'Chaotic yet controlled electronic mayhem. Glitchy textures, distorted bass, and complex rhythms create an intense sonic experience.',
    tags: ['glitch', 'bass', 'experimental', 'idm'],
    playCount: 234500,
    duration: '2:48',
    durationSec: 168,
    coverGradient: 'from-emerald-600 via-teal-500 to-cyan-500',
    bpm: 145,
    key: 'E minor',
    youtubeId: 'kJQP7kiw5Fk',
    likes: 18900,
    createdAt: '2024-01-25',
  },
  {
    id: 'ai-005',
    title: 'Tomorrow\'s Promise',
    artist: 'Suno AI',
    genre: 'Pop',
    mood: 'Uplifting',
    description: 'An inspiring pop anthem about hope and new beginnings. AI-generated vocals soar over uplifting chords and driving percussion.',
    tags: ['uplifting', 'catchy', 'vocals', 'anthem'],
    playCount: 312000,
    duration: '2:56',
    durationSec: 176,
    coverGradient: 'from-pink-600 via-rose-500 to-orange-400',
    bpm: 122,
    key: 'G major',
    youtubeId: 'JGwWNGJdvx8',
    likes: 24500,
    createdAt: '2024-02-01',
  },
  {
    id: 'ai-006',
    title: 'Symphony of the Machines',
    artist: 'Suno AI',
    genre: 'Classical Fusion',
    mood: 'Epic',
    description: 'Where classical grandeur meets digital precision. Full orchestral arrangements blend with electronic elements.',
    tags: ['orchestral', 'epic', 'cinematic', 'trailer'],
    playCount: 145600,
    duration: '4:12',
    durationSec: 252,
    coverGradient: 'from-slate-700 via-zinc-600 to-neutral-500',
    bpm: 85,
    key: 'C minor',
    youtubeId: 'RgKAFK5djSk',
    likes: 11200,
    createdAt: '2024-02-05',
  },
  {
    id: 'ai-007',
    title: 'Rainy Day Lo-Fi',
    artist: 'Suno AI',
    genre: 'Lo-Fi',
    mood: 'Cozy',
    description: 'Soft piano melodies over gentle vinyl crackle and rain sounds. The perfect soundtrack for studying and relaxing.',
    tags: ['study', 'rain', 'piano', 'relaxing'],
    playCount: 287000,
    duration: '3:24',
    durationSec: 204,
    coverGradient: 'from-lime-600 via-emerald-500 to-teal-600',
    bpm: 76,
    key: 'F major',
    youtubeId: 'OPf0YbXqDm0',
    likes: 22100,
    createdAt: '2024-02-08',
  },
  {
    id: 'ai-008',
    title: 'Thunder Strike Rock',
    artist: 'Suno AI',
    genre: 'Rock',
    mood: 'Powerful',
    description: 'Raw energy and power. Distorted guitars, thunderous drums, and AI-generated vocals deliver an anthemic rock experience.',
    tags: ['guitar', 'drums', 'anthem', 'energy'],
    playCount: 198000,
    duration: '3:08',
    durationSec: 188,
    coverGradient: 'from-red-700 via-orange-600 to-yellow-600',
    bpm: 138,
    key: 'D minor',
    youtubeId: 'CevxZvSJLk8',
    likes: 15600,
    createdAt: '2024-02-10',
  },
]

const genres = [
  { name: 'Electronic', icon: '🎧', count: 234, color: 'from-cyan-500 to-blue-600' },
  { name: 'Ambient', icon: '🌌', count: 189, color: 'from-indigo-500 to-purple-600' },
  { name: 'Synthwave', icon: '🌆', count: 156, color: 'from-fuchsia-500 to-pink-600' },
  { name: 'Jazz', icon: '🎷', count: 134, color: 'from-amber-500 to-orange-600' },
  { name: 'Classical', icon: '🎻', count: 112, color: 'from-red-500 to-rose-600' },
  { name: 'Pop', icon: '🎤', count: 298, color: 'from-pink-500 to-rose-400' },
  { name: 'Rock', icon: '🎸', count: 167, color: 'from-gray-600 to-gray-800' },
  { name: 'Lo-Fi', icon: '☕', count: 145, color: 'from-lime-500 to-emerald-600' },
]

const stats = [
  { label: 'AI Tracks', value: '12,847', icon: '🎵' },
  { label: 'AI Artists', value: '3,291', icon: '🤖' },
  { label: 'Plays Today', value: '89K', icon: '▶️' },
  { label: 'Genres', value: '48', icon: '🎼' },
]

// Format number
function formatNum(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')
  const [currentTrack, setCurrentTrack] = useState<typeof trackLibrary[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showPlayer, setShowPlayer] = useState(false)
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)

  // Filter tracks
  const filteredTracks = trackLibrary.filter(track => {
    const matchesSearch = searchQuery === '' || 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesGenre = activeGenre === 'All' || track.genre === activeGenre
    return matchesSearch && matchesGenre
  })

  const featuredTrack = trackLibrary.find(t => t.featured) || trackLibrary[0]
  const trendingTracks = trackLibrary.filter(t => !t.featured)

  function handlePlay(track: typeof trackLibrary[0]) {
    if (playingTrackId === track.id) {
      setIsPlaying(false)
      setPlayingTrackId(null)
    } else {
      setCurrentTrack(track)
      setPlayingTrackId(track.id)
      setIsPlaying(true)
      setShowPlayer(true)
    }
  }

  function toggleFavorite(id: string) {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <main className="min-h-screen text-white overflow-hidden pb-24">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-fuchsia-600/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-purple-500/25">
                ♪
              </div>
              <span className="text-lg font-bold tracking-tight">SoundWave<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">.ai</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
              <a href="#discover" className="hover:text-white transition-colors">Discover</a>
              <a href="#genres" className="hover:text-white transition-colors">Genres</a>
              <a href="#trending" className="hover:text-white transition-colors">Trending</a>
              <button 
                onClick={() => alert('Wallet connection coming soon!')}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Powered by AI — 100% Machine-Generated Music
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
              Discover Music{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                  Created by AI
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8.5C50 2 100 2 150 6C200 10 250 4 298 6" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round"/>
                  <defs><linearGradient id="grad"><stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#06B6D4"/></linearGradient></defs>
                </svg>
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Explore AI-generated music from Suno and other AI platforms. Every song is 100% artificial intelligence — 
              no human artists, no copyright issues, pure machine creativity.
            </p>
            
            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
              <div className="group relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tracks, genres, moods..."
                  className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-base focus:outline-none focus:border-purple-500/50 focus:bg-white/8 backdrop-blur-sm transition-all"
                />
                <svg className="absolute left-5 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button 
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Search
                </button>
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-500">
                  Found {filteredTracks.length} AI track{filteredTracks.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                </p>
              )}
            </form>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:bg-white/[0.05] transition-colors cursor-default">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Track - Hero Card */}
      <section id="discover" className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-fuchsia-900/30 border border-white/10 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px]" />
            
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              {/* Album art */}
              <div className="flex-shrink-0">
                <div className={`w-56 h-56 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br ${featuredTrack.coverGradient} shadow-2xl shadow-purple-500/30 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
                  <div className="text-7xl">🤖</div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium">
                    🔥 Featured AI
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-xs font-medium mb-4">
                  🤖 100% AI Generated
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{featuredTrack.title}</h2>
                <p className="text-gray-400 text-lg mb-3">by {featuredTrack.artist}</p>
                <p className="text-gray-400 leading-relaxed max-w-lg mb-6">{featuredTrack.description}</p>
                
                <div className="flex flex-wrap items-center gap-3 mb-6 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">{featuredTrack.genre}</span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm">{featuredTrack.mood}</span>
                  <span className="text-gray-500 text-sm">• {featuredTrack.duration}</span>
                  <span className="text-gray-500 text-sm">• ▶ {formatNum(featuredTrack.playCount)}</span>
                  <span className="text-gray-500 text-sm">• ❤️ {formatNum(featuredTrack.likes)}</span>
                </div>
                
                <div className="flex gap-3 justify-center md:justify-start">
                  <button 
                    onClick={() => handlePlay(featuredTrack)}
                    className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all shadow-lg shadow-white/20"
                  >
                    {playingTrackId === featuredTrack.id ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                        Stop
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        Play AI Track
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => toggleFavorite(featuredTrack.id)}
                    className={`flex items-center gap-2 px-6 py-3.5 rounded-full border font-medium transition-all ${
                      favorites.has(featuredTrack.id) 
                        ? 'border-pink-500/50 text-pink-400 bg-pink-500/10' 
                        : 'border-white/20 text-white hover:bg-white/5'
                    }`}
                  >
                    <svg className={`w-5 h-5 ${favorites.has(featuredTrack.id) ? 'fill-current' : ''}`} fill={favorites.has(featuredTrack.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {favorites.has(featuredTrack.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>

            {/* YouTube Player */}
            {playingTrackId === featuredTrack.id && (
              <div className="px-8 pb-8">
                <div className="rounded-xl overflow-hidden bg-black/30 border border-white/5">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${featuredTrack.youtubeId}?autoplay=1`}
                    title={`YouTube - ${featuredTrack.title}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">🎵 AI Music via YouTube</p>
                  <a 
                    href={`https://youtube.com/watch?v=${featuredTrack.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Open in YouTube →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Genre Pills */}
      <section id="genres" className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Browse AI Genres</h2>
            <span className="text-sm text-gray-500">
              {activeGenre === 'All' ? `Showing all ${trackLibrary.length}` : `${filteredTracks.length} tracks`}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <button
              onClick={() => setActiveGenre('All')}
              className={`group relative p-4 rounded-2xl text-center transition-all ${
                activeGenre === 'All' 
                  ? 'bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-purple-500/30' 
                  : 'bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.06]'
              }`}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-2xl opacity-80">
                🎵
              </div>
              <div className="text-sm font-medium">All AI</div>
              <div className="text-xs text-gray-500 mt-0.5">{trackLibrary.length} tracks</div>
            </button>
            {genres.map((genre) => (
              <button
                key={genre.name}
                onClick={() => setActiveGenre(genre.name)}
                className={`group relative p-4 rounded-2xl text-center transition-all ${
                  activeGenre === genre.name 
                    ? 'bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-purple-500/30' 
                    : 'bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.06]'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${genre.color} flex items-center justify-center text-2xl shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
                  {genre.icon}
                </div>
                <div className="text-sm font-medium">{genre.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{genre.count} tracks</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Grid */}
      <section id="trending" className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">
                {searchQuery ? 'AI Search Results' : activeGenre === 'All' ? 'Trending AI Music' : `${activeGenre} AI Tracks`}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> {filteredTracks.length} tracks
              </span>
            </div>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">No AI tracks found for &quot;{searchQuery}&quot;</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveGenre('All') }}
                className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(searchQuery || activeGenre !== 'All' ? filteredTracks : trendingTracks).map((song, index) => (
                <div
                  key={song.id}
                  className="group relative rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 backdrop-blur-sm overflow-hidden transition-all hover:bg-white/[0.05]"
                >
                  <div className="p-6 flex gap-5">
                    {/* Cover art */}
                    <div 
                      onClick={() => handlePlay(song)}
                      className={`w-24 h-24 flex-shrink-0 rounded-xl bg-gradient-to-br ${song.coverGradient} flex items-center justify-center relative overflow-hidden cursor-pointer`}
                    >
                      <div className="text-3xl opacity-50">🤖</div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">
                          {playingTrackId === song.id ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                          ) : (
                            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          )}
                        </div>
                      </div>
                      {playingTrackId === song.id && (
                        <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-0.5 truncate group-hover:text-purple-300 transition-colors">{song.title}</h3>
                          <p className="text-gray-500 text-sm mb-2">by {song.artist}</p>
                        </div>
                        <button 
                          onClick={() => toggleFavorite(song.id)}
                          className="p-1.5 rounded-full hover:bg-white/5 transition-colors flex-shrink-0"
                        >
                          <svg className={`w-5 h-5 ${favorites.has(song.id) ? 'text-pink-400 fill-current' : 'text-gray-500'}`} fill={favorites.has(song.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{song.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 text-xs">{song.genre}</span>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-xs">{song.mood}</span>
                        <span className="text-gray-500 text-xs">{song.duration}</span>
                        <span className="text-gray-500 text-xs">• ▶ {formatNum(song.playCount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* YouTube Player */}
                  {playingTrackId === song.id && (
                    <div className="px-6 pb-6">
                      <div className="rounded-xl overflow-hidden bg-black/30 border border-white/5">
                        <iframe
                          width="100%"
                          height="200"
                          src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1`}
                          title={`YouTube - ${song.title}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">🎵 AI Music via YouTube</p>
                        <a 
                          href={`https://youtube.com/watch?v=${song.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          Open in YouTube →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How AI Music Works</h2>
            <p className="text-gray-400">Discover the future of music creation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: '🤖', title: 'AI Generates', desc: 'Advanced neural networks create original music from scratch. No samples, no loops — pure AI creativity trained on musical patterns.' },
              { step: '02', icon: '🎵', title: 'You Discover', desc: 'Browse thousands of AI-generated tracks across all genres. Every song is unique and created in seconds by artificial intelligence.' },
              { step: '03', icon: '✨', title: 'Free to Use', desc: 'All tracks are royalty-free. Use them in your projects, streams, or videos without worrying about copyright claims.' },
            ].map((item) => (
              <div key={item.step} className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 text-center hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-default">
                <div className="text-5xl mb-4 absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-sm font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="text-4xl mt-6 mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent)]" />
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your Own AI Music</h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Want to generate your own tracks? Head to Suno and start creating with AI today.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a 
                  href="https://suno.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-white text-purple-700 font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Visit Suno →
                </a>
                <button 
                  onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-all"
                >
                  Keep Exploring
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold">♪</div>
                <span className="font-bold">SoundWave.ai</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Discover AI-generated music. All tracks are 100% artificial intelligence — no human artists, no copyright issues.
              </p>
            </div>
            {[
              { title: 'Discover', links: ['Trending', 'Genres', 'New Releases', 'Artists'] },
              { title: 'About', links: ['What is AI Music', 'How it Works', 'Suno', 'FAQ'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Copyright', 'DMCA'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" onClick={(e) => { e.preventDefault(); alert(`${link} page coming soon!`) }} className="text-gray-500 text-sm hover:text-gray-300 transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
            <p>© 2026 SoundWave.ai — AI Music Discovery Platform</p>
            <div className="flex gap-5">
              <span className="text-gray-600">Powered by AI</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
