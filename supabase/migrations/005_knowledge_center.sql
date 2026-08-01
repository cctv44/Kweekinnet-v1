-- Knowledge Center Tables

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  thumbnail_url TEXT,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  reading_time INT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_articles_author (author_id),
  INDEX idx_articles_category (category_id),
  INDEX idx_articles_status (status),
  INDEX idx_articles_published (published_at)
);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  source_url TEXT,
  source_name VARCHAR(255),
  thumbnail_url TEXT,
  category_id UUID REFERENCES categories(id),
  status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_news_category (category_id),
  INDEX idx_news_published (published_at)
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INT,
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_videos_author (author_id),
  INDEX idx_videos_category (category_id),
  INDEX idx_videos_published (published_at)
);

-- PDF Library table
CREATE TABLE IF NOT EXISTS pdf_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  file_url TEXT NOT NULL,
  file_size INT,
  file_key VARCHAR(255),
  thumbnail_url TEXT,
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  download_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  pages INT,
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_pdf_author (author_id),
  INDEX idx_pdf_category (category_id),
  INDEX idx_pdf_published (published_at)
);

-- Knowledge Bookmarks table
CREATE TABLE IF NOT EXISTS knowledge_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('article', 'news', 'video', 'pdf')),
  content_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE KEY unique_bookmark (user_id, content_type, content_id),
  INDEX idx_bookmarks_user (user_id),
  INDEX idx_bookmarks_content (content_type, content_id)
);

-- AI Conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  summary TEXT,
  message_count INT DEFAULT 0,
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_conversations_user (user_id),
  INDEX idx_conversations_created (created_at)
);

-- AI Messages table
CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INT,
  model VARCHAR(100),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_messages_conversation (conversation_id),
  INDEX idx_messages_user (user_id),
  INDEX idx_messages_created (created_at)
);

-- Knowledge Search History table
CREATE TABLE IF NOT EXISTS knowledge_search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  query VARCHAR(500) NOT NULL,
  results_count INT,
  search_type VARCHAR(50) CHECK (search_type IN ('articles', 'news', 'videos', 'pdf', 'global')),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_search_user (user_id),
  INDEX idx_search_query (query),
  INDEX idx_search_created (created_at)
);

-- Knowledge Recommendations table
CREATE TABLE IF NOT EXISTS knowledge_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('article', 'news', 'video', 'pdf')),
  content_id UUID NOT NULL,
  reason VARCHAR(255),
  score DECIMAL(3,2),
  viewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_recommendations_user (user_id),
  INDEX idx_recommendations_content (content_type, content_id),
  INDEX idx_recommendations_score (score)
);

-- Knowledge Tags table (for tagging articles, videos, etc.)
CREATE TABLE IF NOT EXISTS knowledge_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  usage_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_tags_slug (slug)
);

-- Knowledge Content Tags junction table
CREATE TABLE IF NOT EXISTS knowledge_content_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('article', 'news', 'video', 'pdf')),
  content_id UUID NOT NULL,
  tag_id UUID NOT NULL REFERENCES knowledge_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE KEY unique_content_tag (content_type, content_id, tag_id),
  INDEX idx_content_tags_content (content_type, content_id),
  INDEX idx_content_tags_tag (tag_id)
);

-- Knowledge Comments table
CREATE TABLE IF NOT EXISTS knowledge_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('article', 'news', 'video', 'pdf')),
  content_id UUID NOT NULL,
  parent_comment_id UUID REFERENCES knowledge_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  like_count INT DEFAULT 0,
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_comments_user (user_id),
  INDEX idx_comments_content (content_type, content_id),
  INDEX idx_comments_parent (parent_comment_id),
  INDEX idx_comments_created (created_at)
);

-- AI Knowledge Base table (for storing embeddings and knowledge)
CREATE TABLE IF NOT EXISTS ai_knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('article', 'news', 'video', 'pdf')),
  content_id UUID NOT NULL,
  title VARCHAR(255),
  content TEXT,
  summary TEXT,
  keywords TEXT,
  embedding VECTOR(1536),
  relevance_score DECIMAL(3,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_knowledge_content (content_type, content_id),
  INDEX idx_knowledge_embedding (embedding)
);

-- Create triggers for auto-increment counters
DELIMITER $$

CREATE TRIGGER update_article_view_count
AFTER INSERT ON knowledge_search_history
FOR EACH ROW
BEGIN
  IF NEW.search_type = 'articles' THEN
    UPDATE articles SET view_count = view_count + 1 WHERE id = NEW.content_id;
  END IF;
END$$

CREATE TRIGGER update_conversation_message_count
AFTER INSERT ON ai_messages
FOR EACH ROW
BEGIN
  UPDATE ai_conversations 
  SET message_count = message_count + 1, last_message_at = NOW()
  WHERE id = NEW.conversation_id;
END$$

DELIMITER ;
