-- RLS Policies for Knowledge Center

-- Articles RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Users can create articles"
  ON articles FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own articles"
  ON articles FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own articles"
  ON articles FOR DELETE
  USING (auth.uid() = author_id);

-- News RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published news"
  ON news FOR SELECT
  USING (status = 'published');

-- Videos RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published videos"
  ON videos FOR SELECT
  USING (status = 'published');

CREATE POLICY "Users can create videos"
  ON videos FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own videos"
  ON videos FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own videos"
  ON videos FOR DELETE
  USING (auth.uid() = author_id);

-- PDF Library RLS
ALTER TABLE pdf_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published PDFs"
  ON pdf_library FOR SELECT
  USING (status = 'published');

CREATE POLICY "Users can create PDFs"
  ON pdf_library FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own PDFs"
  ON pdf_library FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own PDFs"
  ON pdf_library FOR DELETE
  USING (auth.uid() = author_id);

-- Knowledge Bookmarks RLS
ALTER TABLE knowledge_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks"
  ON knowledge_bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookmarks"
  ON knowledge_bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON knowledge_bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- AI Conversations RLS
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations"
  ON ai_conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create conversations"
  ON ai_conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
  ON ai_conversations FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
  ON ai_conversations FOR DELETE
  USING (auth.uid() = user_id);

-- AI Messages RLS
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own messages"
  ON ai_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create messages"
  ON ai_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Knowledge Search History RLS
ALTER TABLE knowledge_search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own search history"
  ON knowledge_search_history FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create search history"
  ON knowledge_search_history FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Knowledge Recommendations RLS
ALTER TABLE knowledge_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recommendations"
  ON knowledge_recommendations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create recommendations"
  ON knowledge_recommendations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Knowledge Tags RLS
ALTER TABLE knowledge_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tags"
  ON knowledge_tags FOR SELECT
  USING (true);

-- Knowledge Content Tags RLS
ALTER TABLE knowledge_content_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view content tags"
  ON knowledge_content_tags FOR SELECT
  USING (true);

-- Knowledge Comments RLS
ALTER TABLE knowledge_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
  ON knowledge_comments FOR SELECT
  USING (is_deleted = FALSE);

CREATE POLICY "Users can create comments"
  ON knowledge_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON knowledge_comments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON knowledge_comments FOR DELETE
  USING (auth.uid() = user_id);

-- AI Knowledge Base RLS
ALTER TABLE ai_knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view knowledge base"
  ON ai_knowledge_base FOR SELECT
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_articles_full_text ON articles USING GIN (to_tsvector('english', title || ' ' || content));
CREATE INDEX idx_news_full_text ON news USING GIN (to_tsvector('english', title || ' ' || content));
CREATE INDEX idx_videos_full_text ON videos USING GIN (to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_pdf_full_text ON pdf_library USING GIN (to_tsvector('english', title || ' ' || description));
