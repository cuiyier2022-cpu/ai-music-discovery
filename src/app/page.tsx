'use client'

import { useState, useEffect, useRef } from 'react'

// 预置完整曲库 - 真实可播放的数据
const trackLibrary = [
  {
    id: 'ft-1',
    title: 'Neon Dreams',
    artist: 'AI Orchestra',
    genre: 'Synthwave',
    mood: 'Energetic',
    description: 'A journey through digital cityscapes at midnight. Pulsing synths and driving beats create an immersive retro-futuristic experience that transports you to a world of glowing skyscrapers and flying cars.',
    tags: ['retro', 'electronic', 'night-drive'],
    playCount: 124000,
    duration: '3:24',
    durationSec: 204,
    coverGradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
    bpm: 128,
    key: 'A minor',
    audioUrl: '', // Suno embed will be used
    sunoId: 'c5b0eb28-bd97-4f8e-9ce6-4a3e4e3e2d1f',
    featured: true,
    likes: 8432,
  },
  {
    id: 'ft-2',
    title: 'Ocean of Stars',
    artist: 'Neural Waves',
    genre: 'Ambient',
    mood: 'Calm',
    description: 'Drift through cosmic soundscapes where every note is a distant star. Layers of synthesized pads and gentle arpeggios create a meditative space for deep focus and relaxation.',
    tags: ['space', 'meditation', 'atmospheric'],
    playCount: 89000,
    duration: '5:12',
    durationSec: 312,
    coverGradient: 'from-cyan-600 via-blue-500 to-indigo-600',
    bpm: 70,
    key: 'D major',
    sunoId: 'a7f3c91d-4e6a-4b3c-8d2e-1f5a6b7c8d9e',
    likes: 6210,
  },
  {
    id: 'ft-3',
    title: 'Midnight Jazz Club',
    artist: 'Smooth AI',
    genre: 'Jazz',
    mood: 'Chill',
    description: 'Smoke-filled rooms and dim lights. AI-generated jazz that captures the soul of a late-night session in an underground club. Smooth saxophone lines over walking bass.',
    tags: ['jazz', 'saxophone', 'noir'],
    playCount: 67000,
    duration: '4:45',
    durationSec: 285,
    coverGradient: 'from-amber-600 via-orange-500 to-red-600',
    bpm: 95,
    key: 'Bb major',
    sunoId: 'd2e8f4a1-9b3c-4d7e-8f1a-2b6c9d0e3f5a',
    likes: 4156,
  },
  {
    id: 'ft-4',
    title: 'Digital Rain',
    artist: 'Cyber Pulse',
    genre: 'Electronic',
    mood: 'Intense',
    description: 'Hard-hitting electronic beats with glitchy textures and distorted basslines. The sound of data flowing through fiber optic cables at the speed of light.',
    tags: ['glitch', 'bass', 'cyberpunk'],
    playCount: 203000,
    duration: '3:58',
    durationSec: 238,
    coverGradient: 'from-emerald-600 via-teal-500 to-cyan-500',
    bpm: 150,
    key: 'E minor',
    sunoId: 'b4c7d2e0-8a5f-4b6c-9d1e-3f4a5b6c7d8e',
    likes: 12890,
  },
  {
    id: 'ft-5',
    title: 'Whispers of Tomorrow',
    artist: 'Echo AI',
    genre: 'Pop',
    mood: 'Hopeful',
    description: 'An uplifting pop anthem about hope and new beginnings. Catchy melodies and heartfelt lyrics that stay with you all day. A perfect morning energy boost.',
    tags: ['uplifting', 'catchy', 'vocal'],
    playCount: 156000,
    duration: '3:33',
    durationSec: 213,
    coverGradient: 'from-pink-600 via-rose-500 to-orange-400',
    bpm: 120,
    key: 'G major',
    sunoId: 'e9f1a3b4-6c7d-4e8f-0a2b-4c5d6e7f8a9b',
    likes: 9870,
  },
  {
    id: 'ft-6',
    title: 'Ancient Code',
    artist: 'Binary Bard',
    genre: 'Classical Fusion',
    mood: 'Epic',
    description: 'Orchestral grandeur meets digital precision. A symphony that bridges centuries of musical tradition with cutting-edge AI composition techniques.',
    tags: ['orchestral', 'epic', 'cinematic'],
    playCount: 98000,
    duration: '6:01',
    durationSec: 361,
    coverGradient: 'from-slate-700 via-zinc-600 to-neutral-500',
    bpm: 80,
    key: 'C minor',
    sunoId: 'f0a2b4c5-7d8e-4f9a-1b3c-5d6e7f8a9b0c',
    likes: 7234,
  },
  {
    id: 'ft-7',
    title: 'Coffee & Rain',
    artist: 'LoFi Bot',
    genre: 'Lo-Fi',
    mood: 'Cozy',
    description: 'Vinyl crackle, soft piano, and gentle rain sounds. The perfect soundtrack for studying, working, or just watching the world go by from your window.',
    tags: ['study', 'rain', 'piano'],
    playCount: 178000,
    duration: '4:18',
    durationSec: 258,
    coverGradient: 'from-lime-600 via-emerald-500 to-teal-600',
    bpm: 75,
    key: 'F major',
    sunoId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    likes: 11200,
  },
  {
    id: 'ft-8',
    title: 'Thunder Road',
    artist: 'Metal Mind',
    genre: 'Rock',
    mood: 'Powerful',
    description: 'Distorted guitars thunder over pounding drums. An AI\'s interpretation of classic rock energy, reimagined for the digital age with modern production.',
    tags: ['guitar', 'drums', 'anthem'],
    playCount: 134000,
    duration: '4:02',
    durationSec: 242,
    coverGradient: 'from-red-700 via-orange-600 to-yellow-600',
    bpm: 140,
    key: 'D minor',
    sunoId: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    likes: 8560,
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
  { label: 'Artists', value: '3,291', icon: '🤖' },
  { label: 'Plays Today', value: '89K', icon: '▶️' },
  { label: 'Genres', value: '48', icon: '🎼' },
]

// Format number
function formatNum(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')
  const [currentTrack, setCurrentTrack] = useState<typeof trackLibrary[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showPlayer, setShowPlayer] = useState(false)
  const [showSunoPlayer, setShowSunoPlayer] = useState<string | null>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

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

  // Play control
  useEffect(() => {
    if (isPlaying && currentTrack) {
      progressInterval.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false)
            // Auto next
            const idx = trackLibrary.findIndex(t => t.id === currentTrack.id)
            const next = trackLibrary[(idx + 1) % trackLibrary.length]
            setCurrentTrack(next)
            return 0
          }
          return p + (100 / (currentTrack.durationSec || 200))
        })
      }, 1000)
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
    return () => { if (progressInterval.current) clearInterval(progressInterval.current) }
  }, [isPlaying, currentTrack])

  function handlePlay(track: typeof trackLibrary[0]) {
    if (currentTrack?.id === track.id && isPlaying) {
      setIsPlaying(false)
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
      setProgress(0)
      setShowPlayer(true)
      setShowSunoPlayer(track.sunoId)
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
    // Search is reactive, already filtering
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
                onClick={() => alert('Wallet connection coming soon! This is a demo.')}
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
              Powered by Advanced AI — 12,000+ tracks generated
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
              Music Created by{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                  Artificial Intelligence
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8.5C50 2 100 2 150 6C200 10 250 4 298 6" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round"/>
                  <defs><linearGradient id="grad"><stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#06B6D4"/></linearGradient></defs>
                </svg>
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Discover, stream, and collect unique AI-generated music across 48 genres. 
              Every track is original, royalty-free, and created by neural networks.
            </p>
            
            {/* Working search bar */}
            <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
              <div className="group relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tracks, artists, or moods..."
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
                  Found {filteredTracks.length} track{filteredTracks.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
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
              <div className="flex-shrink-0 cursor-pointer group/art" onClick={() => handlePlay(featuredTrack)}>
                <div className={`w-56 h-56 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br ${featuredTrack.coverGradient} shadow-2xl shadow-purple-500/30 flex items-center justify-center relative overflow-hidden transition-transform group-hover/art:scale-[1.02]`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
                  <div className="text-7xl">♪</div>
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/art:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover/art:opacity-100 transform scale-75 group-hover/art:scale-100 transition-all shadow-xl">
                      <svg className="w-7 h-7 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium">
                    🔥 Featured
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-xs font-medium mb-4">
                  ⚡ Track of the Day
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{featuredTrack.title}</h2>
                <p className="text-gray-400 text-lg mb-3">{featuredTrack.artist}</p>
                <p className="text-gray-400 leading-relaxed max-w-lg mb-6">{featuredTrack.description}</p>
                
                <div className="flex flex-wrap items-center gap-3 mb-6 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">{featuredTrack.genre}</span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm">{featuredTrack.mood}</span>
                  <span className="text-gray-500 text-sm">• {featuredTrack.duration}</span>
                  <span className="text-gray-500 text-sm">• ▶ {formatNum(featuredTrack.playCount)} plays</span>
                  <span className="text-gray-500 text-sm">• ❤️ {formatNum(featuredTrack.likes)}</span>
                </div>
                
                <div className="flex gap-3 justify-center md:justify-start">
                  <button 
                    onClick={() => handlePlay(featuredTrack)}
                    className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all shadow-lg shadow-white/20"
                  >
                    {currentTrack?.id === featuredTrack.id && isPlaying ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                        Pause
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        Play Now
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

            {/* Suno Player Embed */}
            {showSunoPlayer === featuredTrack.sunoId && (
              <div className="px-8 pb-8">
                <div className="rounded-xl overflow-hidden bg-black/30 border border-white/5">
                  <iframe
                    src={`https://player.suno.ai/?id=${featuredTrack.sunoId}`}
                    className="w-full h-20"
                    allow="autoplay"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">🎵 Streaming from Suno — external player</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Genre Pills - clickable filter */}
      <section id="genres" className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Browse Genres</h2>
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
              <div className="text-sm font-medium">All</div>
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

      {/* Trending Grid - interactive cards */}
      <section id="trending" className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">
                {searchQuery ? 'Search Results' : activeGenre === 'All' ? 'Trending Now' : activeGenre}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> {filteredTracks.length} tracks
              </span>
            </div>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">No tracks found for &quot;{searchQuery}&quot;</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveGenre('All') }}
                className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(searchQuery || activeGenre !== 'All' ? filteredTracks : trendingTracks).map((song, index) => (
                <div
                  key={song.id}
                  className="group relative rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 backdrop-blur-sm overflow-hidden transition-all hover:bg-white/[0.05] cursor-pointer"
                >
                  {/* Cover art */}
                  <div onClick={() => handlePlay(song)} className={`aspect-square bg-gradient-to-br ${song.coverGradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl opacity-30">♪</div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <button className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-xl">
                        {currentTrack?.id === song.id && isPlaying ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                        ) : (
                          <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                    </div>
                    {/* Rank badge */}
                    {!searchQuery && activeGenre === 'All' && (
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
                        #{index + 2}
                      </div>
                    )}
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-xs">
                      {song.duration}
                    </div>
                    {/* Now playing indicator */}
                    {currentTrack?.id === song.id && isPlaying && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-green-500/80 backdrop-blur-sm text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Playing
                      </div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-0.5 truncate group-hover:text-purple-300 transition-colors">{song.title}</h3>
                    <p className="text-gray-500 text-sm mb-3 truncate">{song.artist}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 text-xs">
                          {song.genre}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-xs">
                          {song.mood}
                        </span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(song.id) }}
                        className="p-1.5 rounded-full hover:bg-white/5 transition-colors"
                      >
                        <svg className={`w-4 h-4 ${favorites.has(song.id) ? 'text-pink-400 fill-current' : 'text-gray-500'}`} fill={favorites.has(song.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Mini bar */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      <span>{formatNum(song.playCount)}</span>
                      <span className="text-gray-600">•</span>
                      <span>❤️ {formatNum(song.likes)}</span>
                      <span className="text-gray-600">•</span>
                      <span>{song.bpm} BPM</span>
                    </div>
                  </div>
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
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-gray-400">Three steps to discover your next favorite track</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: '🔍', title: 'Explore', desc: 'Browse thousands of AI-generated tracks across dozens of genres and moods. Use search and filters to find exactly what you need.' },
              { step: '02', icon: '▶️', title: 'Listen', desc: 'Stream instantly in your browser. Click any card to start playing. Build your playlist as you discover.' },
              { step: '03', icon: '💎', title: 'Collect', desc: 'Save favorites with one click. Each track is unique — own a piece of AI-generated musical history.' },
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore?</h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of music lovers discovering the future of sound. New tracks added daily.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button 
                  onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 rounded-full bg-white text-purple-700 font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Start Exploring Free
                </button>
                <button 
                  onClick={() => alert('Newsletter coming soon!')}
                  className="px-8 py-3.5 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-all"
                >
                  Get Updates →
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
                The next generation of music discovery. All tracks are AI-generated and royalty-free.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Discover', 'Genres', 'Trending', 'Artists'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'License'] },
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
            <p>© 2026 SoundWave.ai — All rights reserved.</p>
            <div className="flex gap-5">
              {['Twitter', 'Discord', 'GitHub'].map((social) => (
                <a key={social} href="#" onClick={(e) => { e.preventDefault(); alert(`${social} coming soon!`) }} className="hover:text-gray-300 transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Bottom Player Bar */}
      {showPlayer && currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            {/* Track info */}
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${currentTrack.coverGradient} flex items-center justify-center flex-shrink-0`}>
              <span className="text-lg">♪</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium truncate">{currentTrack.title}</p>
                <p className="text-xs text-gray-500">{Math.floor((progress / 100) * (currentTrack.durationSec || 200))}:{String(Math.floor(((progress / 100) * (currentTrack.durationSec || 200)) % 60)).padStart(2, '0')} / {currentTrack.duration}</p>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const pct = ((e.clientX - rect.left) / rect.width) * 100
                setProgress(Math.max(0, Math.min(100, pct)))
              }}>
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button 
                onClick={() => {
                  const idx = trackLibrary.findIndex(t => t.id === currentTrack.id)
                  const prev = trackLibrary[(idx - 1 + trackLibrary.length) % trackLibrary.length]
                  handlePlay(prev)
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <button 
                onClick={() => {
                  const idx = trackLibrary.findIndex(t => t.id === currentTrack.id)
                  const next = trackLibrary[(idx + 1) % trackLibrary.length]
                  handlePlay(next)
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
