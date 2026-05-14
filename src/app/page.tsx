'use client'

import { useState } from 'react'

// 自有 AI 音乐库 - 占位数据，后续替换为自己生成的音乐
const trackLibrary = [
  {
    id: 'sw-001',
    title: 'Neon Dreams',
    artist: 'SoundWave AI',
    genre: 'Synthwave',
    mood: 'Energetic',
    description: 'A journey through digital cityscapes. Pulsing synths and driving beats create an immersive retro-futuristic experience.',
    tags: ['retro', 'electronic', 'night-drive'],
    duration: '3:24',
    coverGradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
    bpm: 128,
    status: 'coming_soon',
  },
  {
    id: 'sw-002',
    title: 'Ocean of Stars',
    artist: 'SoundWave AI',
    genre: 'Ambient',
    mood: 'Calm',
    description: 'Drift through cosmic soundscapes. Layers of ethereal pads create a meditative space for deep focus.',
    tags: ['space', 'meditation', 'atmospheric'],
    duration: '5:12',
    coverGradient: 'from-cyan-600 via-blue-500 to-indigo-600',
    bpm: 72,
    status: 'coming_soon',
  },
  {
    id: 'sw-003',
    title: 'Midnight Lounge',
    artist: 'SoundWave AI',
    genre: 'Jazz',
    mood: 'Chill',
    description: 'Smooth melodies for late-night contemplation. Capturing the essence of a smoky underground club.',
    tags: ['jazz', 'noir', 'relaxing'],
    duration: '4:45',
    coverGradient: 'from-amber-600 via-orange-500 to-red-600',
    bpm: 88,
    status: 'coming_soon',
  },
  {
    id: 'sw-004',
    title: 'Digital Storm',
    artist: 'SoundWave AI',
    genre: 'Electronic',
    mood: 'Intense',
    description: 'Hard-hitting electronic beats with glitchy textures. The sound of data flowing at lightspeed.',
    tags: ['glitch', 'bass', 'cyberpunk'],
    duration: '3:58',
    coverGradient: 'from-emerald-600 via-teal-500 to-cyan-500',
    bpm: 145,
    status: 'coming_soon',
  },
  {
    id: 'sw-005',
    title: 'Tomorrow\'s Promise',
    artist: 'SoundWave AI',
    genre: 'Pop',
    mood: 'Uplifting',
    description: 'An inspiring anthem about hope and new beginnings. Catchy melodies that stay with you.',
    tags: ['uplifting', 'catchy', 'vocals'],
    duration: '3:33',
    coverGradient: 'from-pink-600 via-rose-500 to-orange-400',
    bpm: 122,
    status: 'coming_soon',
  },
  {
    id: 'sw-006',
    title: 'Ancient Code',
    artist: 'SoundWave AI',
    genre: 'Classical Fusion',
    mood: 'Epic',
    description: 'Orchestral grandeur meets digital precision. A symphony bridging centuries of tradition.',
    tags: ['orchestral', 'epic', 'cinematic'],
    duration: '6:01',
    coverGradient: 'from-slate-700 via-zinc-600 to-neutral-500',
    bpm: 80,
    status: 'coming_soon',
  },
]

const genres = [
  { name: 'Electronic', icon: '🎧', color: 'from-cyan-500 to-blue-600' },
  { name: 'Ambient', icon: '🌌', color: 'from-indigo-500 to-purple-600' },
  { name: 'Synthwave', icon: '🌆', color: 'from-fuchsia-500 to-pink-600' },
  { name: 'Jazz', icon: '🎷', color: 'from-amber-500 to-orange-600' },
  { name: 'Classical', icon: '🎻', color: 'from-red-500 to-rose-600' },
  { name: 'Pop', icon: '🎤', color: 'from-pink-500 to-rose-400' },
]

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[100px]" />
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
              <a href="#catalog" className="hover:text-white transition-colors">Catalog</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              AI Music Platform — Launching Soon
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
              Music Created by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Discover original AI-generated music. Every track is created by our own neural networks — 
              unique, royalty-free, and made entirely by machines.
            </p>

            {/* Email signup */}
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/20 text-green-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                You're on the list! We'll notify you at launch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Notify Me
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">Be the first to know when we launch.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Featured Track Preview */}
      <section id="catalog" className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-fuchsia-900/20 border border-white/10 backdrop-blur-sm">
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className={`w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br ${featuredTrack.coverGradient} shadow-2xl shadow-purple-500/20 flex items-center justify-center flex-shrink-0`}>
                <div className="text-6xl">♪</div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium mb-4">
                  Coming Soon
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{featuredTrack.title}</h2>
                <p className="text-gray-400 text-lg mb-3">by {featuredTrack.artist}</p>
                <p className="text-gray-400 leading-relaxed max-w-lg mb-6">{featuredTrack.description}</p>
                
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">{featuredTrack.genre}</span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm">{featuredTrack.mood}</span>
                  <span className="text-gray-500 text-sm">• {featuredTrack.duration}</span>
                  <span className="text-gray-500 text-sm">• {featuredTrack.bpm} BPM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genre Filter */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Browse Catalog</h2>
            <span className="text-sm text-gray-500">{filteredTracks.length} tracks</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveGenre('All')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeGenre === 'All' 
                  ? 'bg-white/15 text-white border border-white/20' 
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:border-white/15'
              }`}
            >
              All
            </button>
            {genres.map((genre) => (
              <button
                key={genre.name}
                onClick={() => setActiveGenre(genre.name)}
                className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-2 ${
                  activeGenre === genre.name 
                    ? 'bg-white/15 text-white border border-white/20' 
                    : 'bg-white/5 text-gray-400 border border-white/5 hover:border-white/15'
                }`}
              >
                <span>{genre.icon}</span>
                {genre.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks..."
            className="w-full max-w-md px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </section>

      {/* Track Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                className="group rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 backdrop-blur-sm overflow-hidden transition-all hover:bg-white/[0.05]"
              >
                <div className={`h-40 bg-gradient-to-br ${track.coverGradient} flex items-center justify-center relative`}>
                  <div className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">♪</div>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm text-[10px] text-white/70">
                    Coming Soon
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{track.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{track.artist}</p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{track.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-300 text-xs">{track.genre}</span>
                    <span className="px-2 py-1 rounded-md bg-white/5 text-gray-400 text-xs">{track.mood}</span>
                    <span className="px-2 py-1 rounded-md bg-white/5 text-gray-400 text-xs">{track.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About SoundWave.ai</h2>
            <p className="text-gray-400">Original AI music, created entirely by machines</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🤖', title: 'AI Generated', desc: 'Every track is created by our own neural networks. No samples, no loops — pure machine creativity.' },
              { icon: '✨', title: 'Royalty Free', desc: 'All music is original and free to use. No copyright claims, no licensing fees, no attribution required.' },
              { icon: '🎵', title: 'Always Fresh', desc: 'New tracks generated regularly. Our AI never sleeps, constantly creating new music across all genres.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold">♪</div>
              <span className="font-bold">SoundWave.ai</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 SoundWave.ai — All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
