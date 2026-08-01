import { useState, useCallback, useEffect } from 'react';
import {
  conversationService,
  messageService,
  knowledgeSearchService,
  recommendationService,
  bookmarkService,
  AIMessage,
  AIConversation,
  KnowledgeItem,
} from '@/lib/ai-service';
import { toast } from 'sonner';

/**
 * Hook for managing AI conversations
 */
export const useAIConversations = () => {
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async (limit = 20, offset = 0) => {
    setLoading(true);
    setError(null);
    try {
      const data = await conversationService.getConversations(limit, offset);
      setConversations(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch conversations';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createConversation = useCallback(async (title?: string) => {
    try {
      const conversation = await conversationService.createConversation(title);
      setConversations((prev) => [conversation, ...prev]);
      return conversation;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create conversation';
      toast.error(message);
      throw err;
    }
  }, []);

  const deleteConversation = useCallback(async (conversationId: string) => {
    try {
      await conversationService.deleteConversation(conversationId);
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));
      toast.success('Conversation deleted');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete conversation';
      toast.error(message);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    error,
    fetchConversations,
    createConversation,
    deleteConversation,
  };
};

/**
 * Hook for managing AI messages in a conversation
 */
export const useAIMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async (limit = 50, offset = 0) => {
    setLoading(true);
    setError(null);
    try {
      const data = await messageService.getMessages(conversationId, limit, offset);
      setMessages(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch messages';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      setSending(true);
      setError(null);
      try {
        const { userMessage, assistantMessage } = await messageService.sendMessage(
          conversationId,
          content
        );
        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        return assistantMessage;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to send message';
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setSending(false);
      }
    },
    [conversationId]
  );

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId, fetchMessages]);

  return {
    messages,
    loading,
    sending,
    error,
    fetchMessages,
    sendMessage,
  };
};

/**
 * Hook for knowledge search
 */
export const useKnowledgeSearch = () => {
  const [results, setResults] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, limit = 10) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await knowledgeSearchService.searchKnowledge(query, limit);
      setResults(data);
      await knowledgeSearchService.recordSearch(query, 'global', data.length);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    loading,
    error,
    search,
  };
};

/**
 * Hook for trending knowledge
 */
export const useTrendingKnowledge = () => {
  const [trending, setTrending] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = useCallback(async (limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await knowledgeSearchService.getTrendingKnowledge(limit);
      setTrending(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch trending';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  return {
    trending,
    loading,
    error,
    fetchTrending,
  };
};

/**
 * Hook for recommendations
 */
export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async (limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await recommendationService.getRecommendations(limit);
      setRecommendations(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch recommendations';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    recommendations,
    loading,
    error,
    fetchRecommendations,
  };
};

/**
 * Hook for bookmarks
 */
export const useKnowledgeBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async (limit = 20, offset = 0) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookmarkService.getBookmarks(limit, offset);
      setBookmarks(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch bookmarks';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBookmark = useCallback(async (contentType: string, contentId: string) => {
    try {
      await bookmarkService.addBookmark(contentType, contentId);
      toast.success('Bookmarked!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add bookmark';
      toast.error(message);
    }
  }, []);

  const removeBookmark = useCallback(async (contentType: string, contentId: string) => {
    try {
      await bookmarkService.removeBookmark(contentType, contentId);
      setBookmarks((prev) => prev.filter((b) => !(b.type === contentType && b.id === contentId)));
      toast.success('Bookmark removed');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove bookmark';
      toast.error(message);
    }
  }, []);

  const isBookmarked = useCallback(async (contentType: string, contentId: string) => {
    try {
      return await bookmarkService.isBookmarked(contentType, contentId);
    } catch (err) {
      return false;
    }
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    loading,
    error,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };
};
