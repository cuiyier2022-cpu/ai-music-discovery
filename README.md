# AI Music Discovery

AI音乐发现平台 - 每日精选AI生成音乐

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`，填入你的 Supabase 配置：

```bash
cp .env.local.example .env.local
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## Supabase 设置

### 1. 注册 Supabase

访问 https://supabase.com 注册账号

### 2. 创建项目

创建新项目，记录下：
- Project URL
- anon public key

### 3. 创建数据表

在 SQL Editor 中运行以下 SQL：

```sql
CREATE TABLE songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  suno_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  genre VARCHAR(100),
  mood VARCHAR(100),
  tags TEXT[],
  description TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_songs_created_at ON songs(created_at DESC);
CREATE INDEX idx_songs_featured ON songs(featured);

-- 插入测试数据
INSERT INTO songs (suno_id, title, artist, genre, mood, tags, description, featured)
VALUES 
('example-suno-id-1', 'Midnight Dreams', 'AI Composer', 'Electronic', 'Relaxing', ARRAY['ambient', 'night'], 'A dreamy electronic piece perfect for late-night coding sessions', true),
('example-suno-id-2', 'Cyber Pulse', 'Neural Beats', 'Synthwave', 'Energetic', ARRAY['retro', 'cyberpunk'], 'High-energy synthwave with retro-futuristic vibes', false);
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 导入仓库
3. 设置环境变量（同 .env.local）
4. 部署完成

## 添加新歌曲

在 Supabase Table Editor 中直接添加，或使用 SQL：

```sql
INSERT INTO songs (suno_id, title, artist, genre, mood, tags, description, featured)
VALUES ('suno-song-id', 'Song Title', 'Artist Name', 'Genre', 'Mood', ARRAY['tag1', 'tag2'], 'Description', false);
```

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Vercel (部署)
