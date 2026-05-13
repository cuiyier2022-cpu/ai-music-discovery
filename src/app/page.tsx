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
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)
  
  if (error) {
    console.error('Error fetching songs:', error)
    return []
  }
  
  return data as Song[]
}

export default async function Home() {
  const songs = await getSongs()

  return (
    <main className="min-h-screen text-white">
      {/* Header */}
      <header className="border-b border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Music Discovery
          </h1>
          <p className="text-gray-400 mt-2">Daily curated AI-generated music picks</p>
        </div>
      </header>

      {/* Featured Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">✨</span>
          Today's Picks
        </h2>

        {songs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No songs yet. Add your first song!</p>
            <p className="mt-2 text-sm">Songs will appear here once you add them to Supabase.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song) => (
              <div key={song.id} className="song-card rounded-xl p-4">
                {/* Suno Player Embed */}
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={`https://player.suno.ai/?id=${song.suno_id}`}
                    className="w-full h-full"
                    allow="autoplay"
                  />
                </div>

                {/* Song Info */}
                <h3 className="font-semibold text-lg mb-1">{song.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{song.artist}</p>
                
                {/* Description */}
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {song.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                    {song.genre}
                  </span>
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs">
                    {song.mood}
                  </span>
                  {song.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>Curated with ❤️ | Powered by AI</p>
        </div>
      </footer>
    </main>
  )
}
