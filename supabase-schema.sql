-- AI Music Discovery 数据库结构
-- 在 Supabase SQL Editor 中运行此脚本

-- 创建歌曲表
CREATE TABLE songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  suno_id VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  genre VARCHAR(100),
  mood VARCHAR(100),
  tags TEXT[],
  description TEXT,
  featured BOOLEAN DEFAULT false,
  play_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引（提升查询性能）
CREATE INDEX idx_songs_created_at ON songs(created_at DESC);
CREATE INDEX idx_songs_featured ON songs(featured);
CREATE INDEX idx_songs_genre ON songs(genre);
CREATE INDEX idx_songs_mood ON songs(mood);

-- 插入示例数据（可选）
INSERT INTO songs (suno_id, title, artist, genre, mood, tags, description, featured)
VALUES 
(
  'd4f8e2a1-1234-5678-9abc-def012345678',
  'Midnight Synthesis',
  'Neural Composer',
  'Electronic',
  'Focus',
  ARRAY['ambient', 'coding', 'night'],
  'A calm electronic piece perfect for late-night coding. Subtle synth pads create a focused atmosphere without being distracting.',
  true
),
(
  'a1b2c3d4-5678-90ab-cdef-123456789012',
  'Digital Sunrise',
  'AI Dreams',
  'Ambient',
  'Relaxing',
  ARRAY['morning', 'peaceful', 'meditation'],
  'Gentle ambient soundscape that evokes the feeling of watching a sunrise. Ideal for meditation or quiet reflection.',
  true
),
(
  'f9e8d7c6-b5a4-3210-9876-543210fedcba',
  'Cyber Runner',
  'Neon Pulse',
  'Synthwave',
  'Energetic',
  ARRAY['retro', 'cyberpunk', 'workout'],
  'High-energy synthwave track with driving bass and retro-futuristic melodies. Perfect for workouts or gaming.',
  false
);

-- 查询所有歌曲（测试用）
SELECT * FROM songs ORDER BY created_at DESC;
