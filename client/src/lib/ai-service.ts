/**
 * AI Service Architecture for Kweekinnet
 * Handles all AI-related operations including chat, embeddings, and recommendations
 * Prepared for future OpenAI API integration
 */

import { supabase } from './supabase';

// Types
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokensUsed?: number;
  model?: string;
  createdAt: Date;
}

export interface AIConversation {
  id: string;
  title?: string;
  summary?: string;
  messageCount: number;
  lastMessageAt?: Date;
  createdAt: Date;
}

export interface KnowledgeItem {
  id: string;
  type: 'article' | 'news' | 'video' | 'pdf';
  title: string;
  content: string;
  summary?: string;
  relevanceScore?: number;
  url?: string;
}

// AI Service Configuration
export const AI_CONFIG = {
  MODEL: 'gpt-4-turbo', // Default model for future OpenAI integration
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
  SYSTEM_PROMPT: `You are "กวีกินเน็ต AI" (Kweekinnet AI), a helpful AI assistant specialized in knowledge sharing and community support. 
You provide accurate, informative, and helpful responses to users' questions.
You have access to a knowledge base of articles, news, videos, and PDFs.
Always be respectful, clear, and provide sources when relevant.
Respond in the same language as the user (Thai or English).`,
};

// Conversation Management Service
export const conversationService = {
  /**
   * Create a new conversation
   */
  async createConversation(title?: string): Promise<AIConversation> {
    const { data, error } = await supabase
      .from('ai_conversations')
      .insert([
        {
          title: title || `Conversation ${new Date().toLocaleString()}`,
          message_count: 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      title: data.title,
      messageCount: data.message_count,
      createdAt: new Date(data.created_at),
    };
  },

  /**
   * Get all conversations for current user
   */
  async getConversations(limit = 20, offset = 0): Promise<AIConversation[]> {
    const { data, error } = await supabase
      .from('ai_conversations')
      .select('*')
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data.map((conv) => ({
      id: conv.id,
      title: conv.title,
      summary: conv.summary,
      messageCount: conv.message_count,
      lastMessageAt: conv.last_message_at ? new Date(conv.last_message_at) : undefined,
      createdAt: new Date(conv.created_at),
    }));
  },

  /**
   * Get single conversation
   */
  async getConversation(conversationId: string): Promise<AIConversation | null> {
    const { data, error } = await supabase
      .from('ai_conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (error) return null;
    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      messageCount: data.message_count,
      lastMessageAt: data.last_message_at ? new Date(data.last_message_at) : undefined,
      createdAt: new Date(data.created_at),
    };
  },

  /**
   * Update conversation title
   */
  async updateConversation(conversationId: string, updates: { title?: string; summary?: string }): Promise<void> {
    const { error } = await supabase
      .from('ai_conversations')
      .update(updates)
      .eq('id', conversationId);

    if (error) throw error;
  },

  /**
   * Delete conversation
   */
  async deleteConversation(conversationId: string): Promise<void> {
    const { error } = await supabase
      .from('ai_conversations')
      .delete()
      .eq('id', conversationId);

    if (error) throw error;
  },
};

// Message Management Service
export const messageService = {
  /**
   * Send message and get AI response
   */
  async sendMessage(
    conversationId: string,
    content: string,
    model = AI_CONFIG.MODEL
  ): Promise<{ userMessage: AIMessage; assistantMessage: AIMessage }> {
    // Save user message
    const { data: userMsgData, error: userMsgError } = await supabase
      .from('ai_messages')
      .insert([
        {
          conversation_id: conversationId,
          role: 'user',
          content,
          model,
        },
      ])
      .select()
      .single();

    if (userMsgError) throw userMsgError;

    const userMessage: AIMessage = {
      id: userMsgData.id,
      role: 'user',
      content: userMsgData.content,
      createdAt: new Date(userMsgData.created_at),
    };

    // Get AI response (mock for now, ready for OpenAI integration)
    const assistantContent = await messageService.generateAIResponse(content, conversationId);

    // Save assistant message
    const { data: assistantMsgData, error: assistantMsgError } = await supabase
      .from('ai_messages')
      .insert([
        {
          conversation_id: conversationId,
          role: 'assistant',
          content: assistantContent,
          model,
          tokens_used: Math.ceil(assistantContent.length / 4), // Rough estimation
        },
      ])
      .select()
      .single();

    if (assistantMsgError) throw assistantMsgError;

    const assistantMessage: AIMessage = {
      id: assistantMsgData.id,
      role: 'assistant',
      content: assistantMsgData.content,
      tokensUsed: assistantMsgData.tokens_used,
      createdAt: new Date(assistantMsgData.created_at),
    };

    return { userMessage, assistantMessage };
  },

  /**
   * Get conversation messages
   */
  async getMessages(conversationId: string, limit = 50, offset = 0): Promise<AIMessage[]> {
    const { data, error } = await supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data.map((msg) => ({
      id: msg.id,
      role: msg.role,
      content: msg.content,
      tokensUsed: msg.tokens_used,
      model: msg.model,
      createdAt: new Date(msg.created_at),
    }));
  },

  /**
   * Generate AI response (mock implementation, ready for OpenAI integration)
   */
  async generateAIResponse(userMessage: string, conversationId: string): Promise<string> {
    // Get relevant knowledge from knowledge base
    const relevantKnowledge = await knowledgeSearchService.searchKnowledge(userMessage, 3);

    // Build context from knowledge
    const context =
      relevantKnowledge.length > 0
        ? `Based on our knowledge base:\n${relevantKnowledge.map((k) => `- ${k.title}: ${k.summary}`).join('\n')}\n\n`
        : '';

    // Mock response (replace with actual OpenAI API call)
    const mockResponses = [
      `${context}Based on your question about "${userMessage}", I found some relevant information. Could you provide more details about what specific aspect you're interested in?`,
      `${context}That's a great question! Let me help you with that. ${userMessage.includes('?') ? 'I found some relevant resources that might help.' : 'Here are some insights based on our knowledge base.'}`,
      `${context}I understand you're asking about ${userMessage.split(' ').slice(0, 3).join(' ')}. Let me provide you with accurate information from our knowledge base.`,
    ];

    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  },

  /**
   * Delete message
   */
  async deleteMessage(messageId: string): Promise<void> {
    const { error } = await supabase
      .from('ai_messages')
      .delete()
      .eq('id', messageId);

    if (error) throw error;
  },
};

// Knowledge Search Service
export const knowledgeSearchService = {
  /**
   * Search knowledge base
   */
  async searchKnowledge(query: string, limit = 10): Promise<KnowledgeItem[]> {
    // Search articles
    const { data: articles } = await supabase
      .from('articles')
      .select('id, title, excerpt, slug')
      .textSearch('fts', query)
      .eq('status', 'published')
      .limit(Math.ceil(limit / 4));

    // Search news
    const { data: news } = await supabase
      .from('news')
      .select('id, title, excerpt, slug')
      .textSearch('fts', query)
      .eq('status', 'published')
      .limit(Math.ceil(limit / 4));

    // Search videos
    const { data: videos } = await supabase
      .from('videos')
      .select('id, title, description, slug')
      .textSearch('fts', query)
      .eq('status', 'published')
      .limit(Math.ceil(limit / 4));

    // Search PDFs
    const { data: pdfs } = await supabase
      .from('pdf_library')
      .select('id, title, description, slug')
      .textSearch('fts', query)
      .eq('status', 'published')
      .limit(Math.ceil(limit / 4));

    const results: KnowledgeItem[] = [
      ...(articles || []).map((a) => ({
        id: a.id,
        type: 'article' as const,
        title: a.title,
        content: a.excerpt || '',
        summary: a.excerpt,
        url: `/articles/${a.slug}`,
      })),
      ...(news || []).map((n) => ({
        id: n.id,
        type: 'news' as const,
        title: n.title,
        content: n.excerpt || '',
        summary: n.excerpt,
        url: `/news/${n.slug}`,
      })),
      ...(videos || []).map((v) => ({
        id: v.id,
        type: 'video' as const,
        title: v.title,
        content: v.description || '',
        summary: v.description,
        url: `/videos/${v.slug}`,
      })),
      ...(pdfs || []).map((p) => ({
        id: p.id,
        type: 'pdf' as const,
        title: p.title,
        content: p.description || '',
        summary: p.description,
        url: `/pdf/${p.slug}`,
      })),
    ];

    return results.slice(0, limit);
  },

  /**
   * Get trending knowledge
   */
  async getTrendingKnowledge(limit = 10): Promise<KnowledgeItem[]> {
    // Get trending articles
    const { data: articles } = await supabase
      .from('articles')
      .select('id, title, excerpt, slug, view_count')
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(Math.ceil(limit / 4));

    // Get trending news
    const { data: news } = await supabase
      .from('news')
      .select('id, title, excerpt, slug, view_count')
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(Math.ceil(limit / 4));

    // Get trending videos
    const { data: videos } = await supabase
      .from('videos')
      .select('id, title, description, slug, view_count')
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(Math.ceil(limit / 4));

    // Get trending PDFs
    const { data: pdfs } = await supabase
      .from('pdf_library')
      .select('id, title, description, slug, view_count')
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(Math.ceil(limit / 4));

    const results: KnowledgeItem[] = [
      ...(articles || []).map((a) => ({
        id: a.id,
        type: 'article' as const,
        title: a.title,
        content: a.excerpt || '',
        summary: a.excerpt,
        url: `/articles/${a.slug}`,
      })),
      ...(news || []).map((n) => ({
        id: n.id,
        type: 'news' as const,
        title: n.title,
        content: n.excerpt || '',
        summary: n.excerpt,
        url: `/news/${n.slug}`,
      })),
      ...(videos || []).map((v) => ({
        id: v.id,
        type: 'video' as const,
        title: v.title,
        content: v.description || '',
        summary: v.description,
        url: `/videos/${v.slug}`,
      })),
      ...(pdfs || []).map((p) => ({
        id: p.id,
        type: 'pdf' as const,
        title: p.title,
        content: p.description || '',
        summary: p.description,
        url: `/pdf/${p.slug}`,
      })),
    ];

    return results.slice(0, limit);
  },

  /**
   * Record search query
   */
  async recordSearch(query: string, searchType: string, resultsCount: number): Promise<void> {
    const { error } = await supabase.from('knowledge_search_history').insert([
      {
        query,
        search_type: searchType,
        results_count: resultsCount,
      },
    ]);

    if (error) throw error;
  },
};

// Recommendations Service
export const recommendationService = {
  /**
   * Get personalized recommendations
   */
  async getRecommendations(limit = 10): Promise<KnowledgeItem[]> {
    const { data } = await supabase
      .from('knowledge_recommendations')
      .select('content_type, content_id, reason, score')
      .order('score', { ascending: false })
      .limit(limit);

    if (!data) return [];

    const recommendations: KnowledgeItem[] = [];

    for (const rec of data) {
      let item: KnowledgeItem | null = null;

      if (rec.content_type === 'article') {
        const { data: article } = await supabase
          .from('articles')
          .select('id, title, excerpt, slug')
          .eq('id', rec.content_id)
          .single();
        if (article) {
          item = {
            id: article.id,
            type: 'article',
            title: article.title,
            content: article.excerpt || '',
            summary: article.excerpt,
            relevanceScore: rec.score,
            url: `/articles/${article.slug}`,
          };
        }
      } else if (rec.content_type === 'news') {
        const { data: news } = await supabase
          .from('news')
          .select('id, title, excerpt, slug')
          .eq('id', rec.content_id)
          .single();
        if (news) {
          item = {
            id: news.id,
            type: 'news',
            title: news.title,
            content: news.excerpt || '',
            summary: news.excerpt,
            relevanceScore: rec.score,
            url: `/news/${news.slug}`,
          };
        }
      } else if (rec.content_type === 'video') {
        const { data: video } = await supabase
          .from('videos')
          .select('id, title, description, slug')
          .eq('id', rec.content_id)
          .single();
        if (video) {
          item = {
            id: video.id,
            type: 'video',
            title: video.title,
            content: video.description || '',
            summary: video.description,
            relevanceScore: rec.score,
            url: `/videos/${video.slug}`,
          };
        }
      } else if (rec.content_type === 'pdf') {
        const { data: pdf } = await supabase
          .from('pdf_library')
          .select('id, title, description, slug')
          .eq('id', rec.content_id)
          .single();
        if (pdf) {
          item = {
            id: pdf.id,
            type: 'pdf',
            title: pdf.title,
            content: pdf.description || '',
            summary: pdf.description,
            relevanceScore: rec.score,
            url: `/pdf/${pdf.slug}`,
          };
        }
      }

      if (item) recommendations.push(item);
    }

    return recommendations;
  },

  /**
   * Add recommendation
   */
  async addRecommendation(
    contentType: string,
    contentId: string,
    reason: string,
    score: number
  ): Promise<void> {
    const { error } = await supabase.from('knowledge_recommendations').insert([
      {
        content_type: contentType,
        content_id: contentId,
        reason,
        score: Math.min(1, Math.max(0, score)), // Clamp between 0 and 1
      },
    ]);

    if (error) throw error;
  },
};

// Bookmarks Service
export const bookmarkService = {
  /**
   * Get user bookmarks
   */
  async getBookmarks(limit = 20, offset = 0): Promise<KnowledgeItem[]> {
    const { data } = await supabase
      .from('knowledge_bookmarks')
      .select('content_type, content_id')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (!data) return [];

    const bookmarks: KnowledgeItem[] = [];

    for (const bookmark of data) {
      let item: KnowledgeItem | null = null;

      if (bookmark.content_type === 'article') {
        const { data: article } = await supabase
          .from('articles')
          .select('id, title, excerpt, slug')
          .eq('id', bookmark.content_id)
          .single();
        if (article) {
          item = {
            id: article.id,
            type: 'article',
            title: article.title,
            content: article.excerpt || '',
            summary: article.excerpt,
            url: `/articles/${article.slug}`,
          };
        }
      } else if (bookmark.content_type === 'news') {
        const { data: news } = await supabase
          .from('news')
          .select('id, title, excerpt, slug')
          .eq('id', bookmark.content_id)
          .single();
        if (news) {
          item = {
            id: news.id,
            type: 'news',
            title: news.title,
            content: news.excerpt || '',
            summary: news.excerpt,
            url: `/news/${news.slug}`,
          };
        }
      } else if (bookmark.content_type === 'video') {
        const { data: video } = await supabase
          .from('videos')
          .select('id, title, description, slug')
          .eq('id', bookmark.content_id)
          .single();
        if (video) {
          item = {
            id: video.id,
            type: 'video',
            title: video.title,
            content: video.description || '',
            summary: video.description,
            url: `/videos/${video.slug}`,
          };
        }
      } else if (bookmark.content_type === 'pdf') {
        const { data: pdf } = await supabase
          .from('pdf_library')
          .select('id, title, description, slug')
          .eq('id', bookmark.content_id)
          .single();
        if (pdf) {
          item = {
            id: pdf.id,
            type: 'pdf',
            title: pdf.title,
            content: pdf.description || '',
            summary: pdf.description,
            url: `/pdf/${pdf.slug}`,
          };
        }
      }

      if (item) bookmarks.push(item);
    }

    return bookmarks;
  },

  /**
   * Add bookmark
   */
  async addBookmark(contentType: string, contentId: string): Promise<void> {
    const { error } = await supabase.from('knowledge_bookmarks').insert([
      {
        content_type: contentType,
        content_id: contentId,
      },
    ]);

    if (error) throw error;
  },

  /**
   * Remove bookmark
   */
  async removeBookmark(contentType: string, contentId: string): Promise<void> {
    const { error } = await supabase
      .from('knowledge_bookmarks')
      .delete()
      .eq('content_type', contentType)
      .eq('content_id', contentId);

    if (error) throw error;
  },

  /**
   * Check if bookmarked
   */
  async isBookmarked(contentType: string, contentId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('knowledge_bookmarks')
      .select('id')
      .eq('content_type', contentType)
      .eq('content_id', contentId)
      .single();

    return !error && !!data;
  },
};

export default {
  conversationService,
  messageService,
  knowledgeSearchService,
  recommendationService,
  bookmarkService,
};
