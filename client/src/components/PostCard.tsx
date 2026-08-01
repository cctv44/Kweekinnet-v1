import { motion } from 'framer-motion';
import { Heart, MessageCircle, Bookmark, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLike } from '@/hooks/useCommunity';
import { useBookmark } from '@/hooks/useCommunity';
import { useLocation } from 'wouter';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';

interface PostCardProps {
  post: any;
  onDelete?: (id: string) => void;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [, setLocation] = useLocation();
  const { isLiked, toggleLike } = useLike(post.id);
  const { isBookmarked, toggleBookmark } = useBookmark(post.id);

  const handlePostClick = () => {
    setLocation(`/community/${post.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/50 transition-colors cursor-pointer backdrop-blur-sm"
      onClick={handlePostClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <img
            src={post.users?.avatar_url || 'https://via.placeholder.com/40'}
            alt={post.users?.full_name}
            className="w-10 h-10 rounded-full border border-cyan-500/30"
          />
          <div className="flex-1">
            <p className="font-semibold text-white">{post.users?.full_name}</p>
            <p className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(post.created_at), { locale: th, addSuffix: true })}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="bg-purple-500/20 border-purple-500/50 text-purple-200">
          {post.categories?.name}
        </Badge>
      </div>

      {/* Featured Image */}
      {post.featured_image_url && (
        <img
          src={post.featured_image_url}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-4 border border-cyan-500/20"
        />
      )}

      {/* Title & Excerpt */}
      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt || post.content}</p>

      {/* Tags */}
      {post.post_tags && post.post_tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.post_tags.slice(0, 3).map((tag: any) => (
            <Badge key={tag.tags?.id} variant="secondary" className="text-xs">
              #{tag.tags?.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-gray-400 text-sm mb-4 pb-4 border-b border-cyan-500/10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Eye size={16} />
            {post.view_count || 0}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={16} />
            {post.comment_count || 0}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={16} />
            {post.like_count || 0}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
          onClick={toggleLike}
        >
          <Heart size={16} className="mr-2" fill={isLiked ? 'currentColor' : 'none'} />
          Like
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-gray-400 hover:text-cyan-400"
          onClick={() => handlePostClick()}
        >
          <MessageCircle size={16} className="mr-2" />
          Comment
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 ${isBookmarked ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
          onClick={toggleBookmark}
        >
          <Bookmark size={16} className="mr-2" fill={isBookmarked ? 'currentColor' : 'none'} />
          Save
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 text-gray-400 hover:text-green-400">
          <Share2 size={16} className="mr-2" />
          Share
        </Button>
      </div>
    </motion.div>
  );
};
