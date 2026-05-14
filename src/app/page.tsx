import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface Song {
  id: string
  suno_id: string
  title: string
  artist: string
  genre: string
  mood: string
  tags: string[]
  description: string
  featured: boolean
  created_at: string
}

async function getSongs() {
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (error) return []
    return data as Song[]
  } catch {
    return []
  }
}

// 预置精选内容 - 让网站不空
const featuredTracks = [
  {
    id: 'ft-1',
    suno_id: 'c5b0eb28-bd97-4f8e-9ce6-4a3e4e3e2d1f',
    title: 'Neon Dreams',
    artist: 'AI Orchestra',
    genre: 'Synthwave',
    mood: 'Energetic',
    description: 'A journey through digital cityscapes at midnight. Pulsing synths and driving beats create an immersive retro-futuristic experience.',
    tags: ['retro', 'electronic', 'night-drive'],
    playCount: '124K',
    duration: '3:24',
    coverGradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
  },
  {
    id: 'ft-2',
    suno_id: 'a7f3c91d-4e6a-4b3c-8d2e-1f5a6b7c8d9e',
    title: 'Ocean of Stars',
    artist: 'Neural Waves',
    genre: 'Ambient',
    mood: 'Calm',
    description: 'Drift through cosmic soundscapes where every note is a distant star. Perfect for deep focus and meditation.',
    tags: ['space', 'meditation', 'atmospheric'],
    playCount: '89K',
    duration: '5:12',
    coverGradient: 'from-cyan-600 via-blue-500 to-indigo-600',
  },
  {
    id: 'ft-3',
    suno_id: 'd2e8f4a1-9b3c-4d7e-8f1a-2b6c9d0e3f5a',
    title: 'Midnight Jazz Club',
    artist: 'Smooth AI',
    genre: 'Jazz',
    mood: 'Chill',
    description: 'Smoke-filled rooms and dim lights. AI-generated jazz that captures the soul of a late-night session.',
    tags: ['jazz', 'saxophone', 'noir'],
    playCount: '67K',
    duration: '4:45',
    coverGradient: 'from-amber-600 via-orange-500 to-red-600',
  },
  {
    id: 'ft-4',
    suno_id: 'b4c7d2e0-8a5f-4b6c-9d1e-3f4a5b6c7d8e',
    title: 'Digital Rain',
    artist: 'Cyber Pulse',
    genre: 'Electronic',
    mood: 'Intense',
    description: 'Hard-hitting electronic beats with glitchy textures. The sound of data flowing through fiber optic cables.',
    tags: ['glitch', 'bass', 'cyberpunk'],
    playCount: '203K',
    duration: '3:58',
    coverGradient: 'from-emerald-600 via-teal-500 to-cyan-500',
  },
  {
    id: 'ft-5',
    suno_id: 'e9f1a3b4-6c7d-4e8f-0a2b-4c5d6e7f8a9b',
    title: 'Whispers of Tomorrow',
    artist: 'Echo AI',
    genre: 'Pop',
    mood: 'Hopeful',
    description: 'An uplifting pop anthem about hope and new beginnings. Catchy melodies that stay with you all day.',
    tags: ['uplifting', 'catchy', 'vocal'],
    playCount: '156K',
    duration: '3:33',
    coverGradient: 'from-pink-600 via-rose-500 to-orange-400',
  },
  {
    id: 'ft-6',
    suno_id: 'f0a2b4c5-7d8e-4f9a-1b3c-5d6e7f8a9b0c',
    title: 'Ancient Code',
    artist: 'Binary Bard',
    genre: 'Classical Fusion',
    mood: 'Epic',
    description: 'Orchestral grandeur meets digital precision. A symphony that bridges centuries of musical tradition.',
    tags: ['orchestral', 'epic', 'cinematic'],
    playCount: '98K',
    duration: '6:01',
    coverGradient: 'from-slate-700 via-zinc-600 to-neutral-500',
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

export default async function Home() {
  const dbSongs = await getSongs()
  const displaySongs = dbSongs.length > 0 ? dbSongs.map(s => ({
    ...s,
    playCount: Math.floor(Math.random() * 200) + 'K',
    duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    coverGradient: ['from-violet-600 via-purple-500 to-fuchsia-500', 'from-cyan-600 via-blue-500 to-indigo-600', 'from-amber-600 via-orange-500 to-red-600', 'from-emerald-600 via-teal-500 to-cyan-500'][Math.floor(Math.random() * 4)],
  })) : featuredTracks

  return (
    <main className="min-h-screen text-white overflow-hidden">
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
              <button className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Powered by Advanced AI — 12,000+ tracks generated
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight mb-6">
              Music Created by{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                  Artificial Intelligence
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8.5C50 2 100 2 150 6C200 10 250 4 298 6" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round"/>
                  <defs><linearGradient id="grad"><stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#06B6D4"/></linearGradient></defs>
                </svg>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Discover, stream, and collect unique AI-generated music across 48 genres. 
              Every track is original, royalty-free, and created by neural networks.
            </p>
            
            {/* Search bar */}
            <div className="mt-10 max-w-xl mx-auto">
              <div className="group relative flex items-center">
                <input
                  type="text"
                  placeholder="Search tracks, artists, or moods..."
                  className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-base focus:outline-none focus:border-purple-500/50 focus:bg-white/8 backdrop-blur-sm transition-all"
                />
                <svg className="absolute left-5 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
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
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 shadow-2xl shadow-purple-500/30 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
                  <div className="text-7xl">♪</div>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{displaySongs[0].title}</h2>
                <p className="text-gray-400 text-lg mb-3">{displaySongs[0].artist}</p>
                <p className="text-gray-400 leading-relaxed max-w-lg mb-6">{displaySongs[0].description}</p>
                
                <div className="flex flex-wrap items-center gap-3 mb-6 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">{displaySongs[0].genre}</span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm">{displaySongs[0].mood}</span>
                  <span className="text-gray-500 text-sm">• {displaySongs[0].duration}</span>
                  <span className="text-gray-500 text-sm">• ▶ {displaySongs[0].playCount} plays</span>
                </div>
                
                <div className="flex gap-3 justify-center md:justify-start">
                  <button className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all shadow-lg shadow-white/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Play Now
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genre Pills */}
      <section id="genres" className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Browse Genres</h2>
            <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View all →</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {genres.map((genre) => (
              <button
                key={genre.name}
                className="group relative p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 text-center transition-all hover:bg-white/[0.06]"
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
              <h2 className="text-2xl font-bold">Trending Now</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Live
              </span>
            </div>
            <div className="flex gap-2">
              {['All', 'Electronic', 'Ambient', 'Pop'].map((tab) => (
                <button key={tab} className={`px-4 py-1.5 rounded-full text-sm transition-all ${tab === 'All' ? 'bg-white/10 text-white border border-white/10' : 'text-gray-500 hover:text-gray-300'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displaySongs.slice(1).map((song, index) => (
              <div
                key={song.id}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 backdrop-blur-sm overflow-hidden transition-all hover:bg-white/[0.05] cursor-pointer"
              >
                {/* Cover art */}
                <div className={`aspect-square bg-gradient-to-br ${song.coverGradient || 'from-gray-700 to-gray-900'} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl opacity-30">♪</div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <button className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-xl">
                      <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                  </div>
                  {/* Rank badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
                    #{index + 2}
                  </div>
                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-xs">
                    {song.duration || '3:45'}
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-0.5 truncate group-hover:text-purple-300 transition-colors">{song.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 truncate">{song.artist}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 text-xs`}>
                        {song.genre}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-xs">
                        {song.mood}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      {song.playCount || '---'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              { step: '01', icon: '🔍', title: 'Explore', desc: 'Browse thousands of AI-generated tracks across dozens of genres and moods.' },
              { step: '02', icon: '▶️', title: 'Listen', desc: 'Stream instantly in your browser. No downloads, no sign-up required.' },
              { step: '03', icon: '💎', title: 'Collect', desc: 'Save favorites, build playlists, and own unique pieces of AI art.' },
            ].map((item) => (
              <div key={item.step} className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
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
                Join thousands of music lovers discovering the future of sound.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button className="px-8 py-3.5 rounded-full bg-white text-purple-700 font-semibold hover:bg-gray-100 transition-all shadow-lg">
                  Start Exploring Free
                </button>
                <button className="px-8 py-3.5 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-all">
                  Learn More →
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
                    <li key={link}><a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
            <p>© 2026 SoundWave.ai — All rights reserved.</p>
            <div className="flex gap-5">
              {['Twitter', 'Discord', 'GitHub'].map((social) => (
                <a key={social} href="#" className="hover:text-gray-300 transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
