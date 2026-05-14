'use client'

import { useState } from 'react'

// 自有 AI 音乐库
const trackLibrary = [
  {
    id: 'sw-001',
    title: 'Neon Dreams',
    artist: 'SoundWave',
    genre: 'Synthwave',
    mood: 'Energetic',
    description: 'A journey through digital cityscapes. Pulsing synths and driving beats create an immersive retro-futuristic experience.',
    duration: '3:24',
    coverColors: ['#7c3aed', '#a855f7', '#ec4899'],
    bpm: 128,
    status: 'coming_soon',
  },
  {
    id: 'sw-002',
    title: 'Ocean of Stars',
    artist: 'SoundWave',
    genre: 'Ambient',
    mood: 'Calm',
    description: 'Drift through cosmic soundscapes. Layers of ethereal pads create a meditative space for deep focus.',
    duration: '5:12',
    coverColors: ['#0891b2', '#3b82f6', '#6366f1'],
    bpm: 72,
    status: 'coming_soon',
  },
  {
    id: 'sw-003',
    title: 'Midnight Lounge',
    artist: 'SoundWave',
    genre: 'Jazz',
    mood: 'Chill',
    description: 'Smooth melodies for late-night contemplation. Capturing the essence of a smoky underground club.',
    duration: '4:45',
    coverColors: ['#d97706', '#ea580c', '#dc2626'],
    bpm: 88,
    status: 'coming_soon',
  },
  {
    id: 'sw-004',
    title: 'Digital Storm',
    artist: 'SoundWave',
    genre: 'Electronic',
    mood: 'Intense',
    description: 'Hard-hitting electronic beats with glitchy textures. The sound of data flowing at lightspeed.',
    duration: '3:58',
    coverColors: ['#059669', '#0d9488', '#06b6d4'],
    bpm: 145,
    status: 'coming_soon',
  },
  {
    id: 'sw-005',
    title: 'Tomorrow\'s Promise',
    artist: 'SoundWave',
    genre: 'Pop',
    mood: 'Uplifting',
    description: 'An inspiring anthem about hope and new beginnings. Catchy melodies that stay with you.',
    duration: '3:33',
    coverColors: ['#db2777', '#f43f5e', '#fb923c'],
    bpm: 122,
    status: 'coming_soon',
  },
  {
    id: 'sw-006',
    title: 'Ancient Code',
    artist: 'SoundWave',
    genre: 'Classical Fusion',
    mood: 'Epic',
    description: 'Orchestral grandeur meets digital precision. A symphony bridging centuries of tradition.',
    duration: '6:01',
    coverColors: ['#475569', '#6b7280', '#9ca3af'],
    bpm: 80,
    status: 'coming_soon',
  },
]

const genres = [
  { name: 'Electronic', color: 'from-cyan-600 to-blue-600', accent: '#06b6d4' },
  { name: 'Ambient', color: 'from-indigo-600 to-purple-600', accent: '#818cf8' },
  { name: 'Synthwave', color: 'from-fuchsia-600 to-pink-600', accent: '#e879f9' },
  { name: 'Jazz', color: 'from-amber-600 to-orange-600', accent: '#fbbf24' },
  { name: 'Classical', color: 'from-red-600 to-rose-600', accent: '#f87171' },
  { name: 'Pop', color: 'from-pink-600 to-rose-500', accent: '#fb7185' },
]

// SVG Icons
const WaveIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <defs>
      <linearGradient id="waveGrad" x1="0" y1="0" x2="28" y2="28">
        <stop offset="0%" stopColor="#8b5cf6"/>
        <stop offset="100%" stopColor="#ec4899"/>
      </linearGradient>
    </defs>
    <rect x="2" y="10" width="3" height="8" rx="1.5" fill="url(#waveGrad)"/>
    <rect x="7" y="7" width="3" height="14" rx="1.5" fill="url(#waveGrad)"/>
    <rect x="12" y="4" width="3" height="20" rx="1.5" fill="url(#waveGrad)"/>
    <rect x="17" y="7" width="3" height="14" rx="1.5" fill="url(#waveGrad)"/>
    <rect x="22" y="10" width="3" height="8" rx="1.5" fill="url(#waveGrad)"/>
  </svg>
)

const AIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L2 18h4l1.5-3h5L14 18h4L10 2zm0 5l1.8 4H8.2L10 7z" fill="currentColor"/>
    <circle cx="7.5" cy="14" r="1" fill="currentColor"/>
    <circle cx="12.5" cy="14" r="1" fill="currentColor"/>
  </svg>
)

const SoundWaveLogo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <defs>
      <linearGradient id="logoBg" x1="0" y1="0" x2="36" y2="36">
        <stop offset="0%" stopColor="#8b5cf6"/>
        <stop offset="50%" stopColor="#a855f7"/>
        <stop offset="100%" stopColor="#ec4899"/>
      </linearGradient>
    </defs>
    <rect width="36" height="36" rx="10" fill="url(#logoBg)"/>
    <g fill="white">
      <rect x="7" y="13" width="3.5" height="10" rx="1.75"/>
      <rect x="12.5" y="9" width="3.5" height="18" rx="1.75"/>
      <rect x="18" y="5" width="3.5" height="26" rx="1.75"/>
      <rect x="23.5" y="9" width="3.5" height="18" rx="1.75"/>
    </g>
  </svg>
)

function AlbumArt({ colors, size = 'large' }: { colors: string[], size?: 'large' | 'small' }) {
  const isLarge = size === 'large'
  const h = isLarge ? 'w-48 h-48 md:w-56 md:h-56' : 'w-full aspect-square'
  const innerSize = isLarge ? 'text-7xl' : 'text-4xl'
  
  return (
    <div className={`${h} rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden flex-shrink-0`} style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})` }}>
      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`grid-${colors[0]}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#grid-${colors[0]})`}/>
        </svg>
      </div>
      
      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
      
      {/* Center icon */}
      <div className={`${innerSize} font-black text-white/20 select-none`} style={{ fontFamily: 'monospace' }}>
        SW
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  )
}

function GenreBadge({ name, color, accent }: { name: string, color: string, accent: string }) {
  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border`}
      style={{ 
        backgroundColor: `${accent}15`,
        borderColor: `${accent}40`,
        color: accent,
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
      {name}
    </div>
  )
}

function FeatureCard({ number, title, description, accent }: { number: string, title: string, description: string, accent: string }) {
  return (
    <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all">
      <div 
        className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-5 blur-2xl"
        style={{ backgroundColor: accent }}
      />
      <div className="relative">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black mb-5"
          style={{ backgroundColor: `${accent}20`, color: accent }}
        >
          {number}
        </div>
        <h3 className="font-bold text-lg mb-3">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredTracks = trackLibrary.filter(track => {
    const matchesSearch = searchQuery === '' || 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.mood.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = activeGenre === 'All' || track.genre === activeGenre
    return matchesSearch && matchesGenre
  })

  const featuredTrack = trackLibrary[0]

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06060f] via-[#0d0d20] to-[#06060f]" />
        <div className="absolute top-[-30%] left-[-15%] w-[60vw] h-[60vw]">
          <div className="w-full h-full bg-purple-600/[0.06] rounded-full blur-[150px]" />
        </div>
        <div className="absolute bottom-[-30%] right-[-15%] w-[50vw] h-[50vw]">
          <div className="w-full h-full bg-blue-600/[0.05] rounded-full blur-[120px]" />
        </div>
        <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw]">
          <div className="w-full h-full bg-fuchsia-600/[0.04] rounded-full blur-[100px]" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <SoundWaveLogo size={36} />
              <span className="text-lg font-bold tracking-tight">SoundWave</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#catalog" className="text-gray-400 hover:text-white transition-colors">Catalog</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#a855f7' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#a855f7' }} />
            </span>
            Platform Launching Soon
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
            Music Created by{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">
                Neural Networks
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C60 2 120 3 150 6C180 9 240 4 298 7" stroke="url(#heroGrad)" strokeWidth="2.5" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="heroGrad">
                    <stop stopColor="#a855f7"/>
                    <stop offset="1" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Original AI-generated music from our own neural networks. 
            No human artists. No copyright. Pure machine creativity.
          </p>

          {/* Email signup */}
          {subscribed ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              <span className="font-medium">You're on the list! We'll notify you at launch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-sm mx-auto">
              <div className="flex gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-600 text-sm focus:outline-none"
                />
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Get Notified
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-600">No spam. Just launch notification.</p>
            </form>
          )}
        </div>
      </section>

      {/* Featured Track */}
      <section id="catalog" className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] backdrop-blur-sm">
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <AlbumArt colors={featuredTrack.coverColors} size="large" />
              
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-xs mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Featured Preview
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-2">{featuredTrack.title}</h2>
                <p className="text-gray-500 text-sm mb-4">{featuredTrack.genre} · {featuredTrack.duration} · {featuredTrack.bpm} BPM</p>
                <p className="text-gray-400 leading-relaxed mb-6 max-w-md">{featuredTrack.description}</p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <GenreBadge name={featuredTrack.genre} color="from-purple-600/20" accent="#a855f7" />
                  <GenreBadge name={featuredTrack.mood} color="from-pink-600/20" accent="#ec4899" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Header */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Catalog</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveGenre('All')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeGenre === 'All' 
                    ? 'bg-white/15 text-white border border-white/20' 
                    : 'bg-white/[0.03] text-gray-500 border border-white/[0.05] hover:border-white/15 hover:text-gray-300'
                }`}
              >
                All
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.name}
                  onClick={() => setActiveGenre(genre.name)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    activeGenre === genre.name 
                      ? 'border-current text-white' 
                      : 'bg-white/[0.03] text-gray-500 border-white/[0.05] hover:border-white/15 hover:text-gray-300'
                  }`}
                  style={activeGenre === genre.name ? { backgroundColor: `${genre.accent}20`, borderColor: `${genre.accent}50`, color: genre.accent } : {}}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks, moods, genres..."
            className="w-full max-w-xs px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/30"
          />
        </div>
      </section>

      {/* Track Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {filteredTracks.length === 0 ? (
            <div className="text-center py-24 text-gray-600">
              <WaveIcon />
              <p className="mt-4 text-lg">No tracks match your search</p>
              <button onClick={() => { setSearchQuery(''); setActiveGenre('All') }} className="mt-3 text-sm text-purple-400 hover:text-purple-300">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTracks.map((track) => (
                <div key={track.id} className="group rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] backdrop-blur-sm overflow-hidden transition-all hover:bg-white/[0.04]">
                  <AlbumArt colors={track.coverColors} size="small" />
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1 group-hover:text-white/90">{track.title}</h3>
                    <p className="text-gray-600 text-xs mb-3">{track.genre} · {track.duration} · {track.bpm} BPM</p>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">{track.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      <GenreBadge name={track.genre} color="" accent="#8b5cf6" />
                      <GenreBadge name={track.mood} color="" accent="#ec4899" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">How It Works</h2>
            <p className="text-gray-500">Three pillars of original AI music</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard number="01" title="Pure AI Generation" description="Our neural networks compose every track from scratch. No samples, no loops, no human input — only mathematical patterns trained on musical theory." accent="#a855f7" />
            <FeatureCard number="02" title="100% Royalty Free" description="Every track is completely original. Use it anywhere — streams, videos, games, podcasts — without copyright claims or licensing fees." accent="#ec4899" />
            <FeatureCard number="03" title="Infinite Catalog" description="Our AI generates new music 24/7. The catalog grows automatically — no recording sessions, no studio time, no limits." accent="#06b6d4" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SoundWaveLogo size={30} />
              <span className="font-bold text-sm">SoundWave</span>
            </div>
            <p className="text-gray-600 text-xs">© 2026 SoundWave — Original AI Music</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
