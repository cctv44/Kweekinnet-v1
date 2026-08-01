import { supabase } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// ==================== POSTS ====================
export const postsService = {
  async getPosts(page = 1, limit = 10, categoryId?: string, search?: string) {
    let query = supabase
      .from('posts')
      .select('*, users(id, full_name, avatar_url), categories(name, slug)', { count: 'exact' })
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const { data, error, count } = await query;
    return { data, error, total: count };
  },

  async getPostById(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*, users(id, full_name, avatar_url), categories(name, slug), post_tags(tags(name, slug))')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async createPost(post: {
    title: string;
    content: string;
    excerpt?: string;
    category_id: string;
    featured_image_url?: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 200);

    const { data, error } = await supabase
      .from('posts')
      .insert([{
        ...post,
        user_id: user.id,
        slug,
      }])
      .select()
      .single();

    return { data, error };
  },

  async updatePost(id: string, updates: Partial<any>) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    return { error };
  },

  async getTrendingPosts(limit = 10) {
    const { data, error } = await supabase
      .from('posts')
      .select('*, users(full_name, avatar_url)')
      .eq('status', 'published')
      .order('like_count', { ascending: false })
      .limit(limit);
    return { data, error };
  },
};

// ==================== COMMENTS ====================
export const commentsService = {
  async getComments(postId: string, page = 1, limit = 20) {
    const { data, error, count } = await supabase
      .from('comments')
      .select('*, users(id, full_name, avatar_url)', { count: 'exact' })
      .eq('post_id', postId)
      .is('parent_comment_id', null)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    return { data, error, total: count };
  },

  async getReplies(parentCommentId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, users(id, full_name, avatar_url)')
      .eq('parent_comment_id', parentCommentId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true });

    return { data, error };
  },

  async createComment(postId: string, content: string, parentCommentId?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: postId,
        user_id: user.id,
        content,
        parent_comment_id: parentCommentId || null,
      }])
      .select()
      .single();

    return { data, error };
  },

  async updateComment(id: string, content: string) {
    const { data, error } = await supabase
      .from('comments')
      .update({ content, is_edited: true })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  async deleteComment(id: string) {
    const { data, error } = await supabase
      .from('comments')
      .update({ is_deleted: true })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },
};

// ==================== LIKES ====================
export const likesService = {
  async likePost(postId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('likes')
      .insert([{ user_id: user.id, post_id: postId }])
      .select()
      .single();

    return { data, error };
  },

  async unlikePost(postId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', postId);

    return { error };
  },

  async likeComment(commentId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('likes')
      .insert([{ user_id: user.id, comment_id: commentId }])
      .select()
      .single();

    return { data, error };
  },

  async unlikeComment(commentId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', user.id)
      .eq('comment_id', commentId);

    return { error };
  },

  async isPostLiked(postId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', user.id)
      .eq('post_id', postId)
      .single();

    return !!data;
  },
};

// ==================== BOOKMARKS ====================
export const bookmarksService = {
  async getBookmarks(page = 1, limit = 10) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error, count } = await supabase
      .from('bookmarks')
      .select('posts(*, users(full_name, avatar_url))', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    return { data, error, total: count };
  },

  async bookmarkPost(postId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('bookmarks')
      .insert([{ user_id: user.id, post_id: postId }])
      .select()
      .single();

    return { data, error };
  },

  async removeBookmark(postId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', postId);

    return { error };
  },

  async isPostBookmarked(postId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', user.id)
      .eq('post_id', postId)
      .single();

    return !!data;
  },
};

// ==================== FOLLOWERS ====================
export const followersService = {
  async getFollowers(userId: string, page = 1, limit = 20) {
    const { data, error, count } = await supabase
      .from('followers')
      .select('users!follower_id(id, full_name, avatar_url)', { count: 'exact' })
      .eq('following_id', userId)
      .range((page - 1) * limit, page * limit - 1);

    return { data, error, total: count };
  },

  async getFollowing(userId: string, page = 1, limit = 20) {
    const { data, error, count } = await supabase
      .from('followers')
      .select('users!following_id(id, full_name, avatar_url)', { count: 'exact' })
      .eq('follower_id', userId)
      .range((page - 1) * limit, page * limit - 1);

    return { data, error, total: count };
  },

  async followUser(userId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('followers')
      .insert([{ follower_id: user.id, following_id: userId }])
      .select()
      .single();

    return { data, error };
  },

  async unfollowUser(userId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('followers')
      .delete()
      .eq('follower_id', user.id)
      .eq('following_id', userId);

    return { error };
  },

  async isFollowing(userId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from('followers')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', userId)
      .single();

    return !!data;
  },

  async getFollowerCount(userId: string) {
    const { count } = await supabase
      .from('followers')
      .select('id', { count: 'exact' })
      .eq('following_id', userId);

    return count || 0;
  },

  async getFollowingCount(userId: string) {
    const { count } = await supabase
      .from('followers')
      .select('id', { count: 'exact' })
      .eq('follower_id', userId);

    return count || 0;
  },
};

// ==================== REALTIME ====================
export const realtimeService = {
  subscribeToPost(postId: string, callback: (data: any) => void): RealtimeChannel {
    return supabase
      .channel(`post:${postId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts', filter: `id=eq.${postId}` },
        callback
      )
      .subscribe();
  },

  subscribeToComments(postId: string, callback: (data: any) => void): RealtimeChannel {
    return supabase
      .channel(`comments:${postId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` },
        callback
      )
      .subscribe();
  },

  subscribeToPosts(callback: (data: any) => void): RealtimeChannel {
    return supabase
      .channel('posts:all')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        callback
      )
      .subscribe();
  },

  unsubscribe(channel: RealtimeChannel) {
    return supabase.removeChannel(channel);
  },
};

// ==================== CATEGORIES & TAGS ====================
export const categoriesService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    return { data, error };
  },

  async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    return { data, error };
  },
};

export const tagsService = {
  async getTags() {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    return { data, error };
  },

  async searchTags(query: string) {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .ilike('name', `%${query}%`)
      .limit(10);

    return { data, error };
  },

  async addTagToPost(postId: string, tagId: string) {
    const { data, error } = await supabase
      .from('post_tags')
      .insert([{ post_id: postId, tag_id: tagId }])
      .select()
      .single();

    return { data, error };
  },

  async removeTagFromPost(postId: string, tagId: string) {
    const { error } = await supabase
      .from('post_tags')
      .delete()
      .eq('post_id', postId)
      .eq('tag_id', tagId);

    return { error };
  },
};
