import { useState, useEffect, useCallback } from 'react';
import { postsService, commentsService, likesService, bookmarksService, followersService } from '@/lib/supabase-services';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

// Hook for posts
export const usePosts = (page = 1, limit = 10, categoryId?: string, search?: string) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error: err, total: count } = await postsService.getPosts(page, limit, categoryId, search);
        if (err) throw err;
        setPosts(data || []);
        setTotal(count || 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit, categoryId, search]);

  return { posts, loading, error, total };
};

// Hook for single post
export const usePost = (postId: string) => {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data, error: err } = await postsService.getPostById(postId);
        if (err) throw err;
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  return { post, loading, error };
};

// Hook for creating post
export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(async (post: any) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await postsService.createPost(post);
      if (err) throw err;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createPost, loading, error };
};

// Hook for comments
export const useComments = (postId: string, page = 1, limit = 20) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data, error: err, total: count } = await commentsService.getComments(postId, page, limit);
        if (err) throw err;
        setComments(data || []);
        setTotal(count || 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, page, limit]);

  return { comments, loading, error, total };
};

// Hook for creating comment
export const useCreateComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = useCallback(async (postId: string, content: string, parentCommentId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await commentsService.createComment(postId, content, parentCommentId);
      if (err) throw err;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createComment, loading, error };
};

// Hook for likes
export const useLike = (postId?: string, commentId?: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    const checkLike = async () => {
      if (!user) return;
      try {
        if (postId) {
          const liked = await likesService.isPostLiked(postId);
          setIsLiked(liked);
        }
      } catch (err) {
        console.error('Error checking like:', err);
      }
    };

    checkLike();
  }, [user, postId, commentId]);

  const toggleLike = useCallback(async () => {
    try {
      setLoading(true);
      if (postId) {
        if (isLiked) {
          await likesService.unlikePost(postId);
        } else {
          await likesService.likePost(postId);
        }
        setIsLiked(!isLiked);
      } else if (commentId) {
        if (isLiked) {
          await likesService.unlikeComment(commentId);
        } else {
          await likesService.likeComment(commentId);
        }
        setIsLiked(!isLiked);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    } finally {
      setLoading(false);
    }
  }, [postId, commentId, isLiked]);

  return { isLiked, toggleLike, loading };
};

// Hook for bookmarks
export const useBookmark = (postId: string) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    const checkBookmark = async () => {
      if (!user) return;
      try {
        const bookmarked = await bookmarksService.isPostBookmarked(postId);
        setIsBookmarked(bookmarked);
      } catch (err) {
        console.error('Error checking bookmark:', err);
      }
    };

    checkBookmark();
  }, [user, postId]);

  const toggleBookmark = useCallback(async () => {
    try {
      setLoading(true);
      if (isBookmarked) {
        await bookmarksService.removeBookmark(postId);
      } else {
        await bookmarksService.bookmarkPost(postId);
      }
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    } finally {
      setLoading(false);
    }
  }, [postId, isBookmarked]);

  return { isBookmarked, toggleBookmark, loading };
};

// Hook for followers
export const useFollower = (userId: string) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    const checkFollower = async () => {
      if (!user) return;
      try {
        const following = await followersService.isFollowing(userId);
        const followers = await followersService.getFollowerCount(userId);
        const following_count = await followersService.getFollowingCount(userId);
        setIsFollowing(following);
        setFollowerCount(followers);
        setFollowingCount(following_count);
      } catch (err) {
        console.error('Error checking follower:', err);
      }
    };

    checkFollower();
  }, [user, userId]);

  const toggleFollow = useCallback(async () => {
    try {
      setLoading(true);
      if (isFollowing) {
        await followersService.unfollowUser(userId);
        setFollowerCount(Math.max(0, followerCount - 1));
      } else {
        await followersService.followUser(userId);
        setFollowerCount(followerCount + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Error toggling follow:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, isFollowing, followerCount]);

  return { isFollowing, toggleFollow, loading, followerCount, followingCount };
};

// Hook for bookmarks list
export const useBookmarks = (page = 1, limit = 10) => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data, error: err, total: count } = await bookmarksService.getBookmarks(page, limit);
        if (err) throw err;
        setBookmarks(data || []);
        setTotal(count || 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user, page, limit]);

  return { bookmarks, loading, error, total };
};
