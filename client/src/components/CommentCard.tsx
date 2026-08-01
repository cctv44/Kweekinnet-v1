import { motion } from 'framer-motion';
import { Heart, Reply, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLike } from '@/hooks/useCommunity';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import { useState } from 'react';

interface CommentCardProps {
  comment: any;
  onReply?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  replies?: any[];
  isReply?: boolean;
}

export const CommentCard = ({ comment, onReply, onDelete, replies, isReply = false }: CommentCardProps) => {
  const { isLiked, toggleLike } = useLike(undefined, comment.id);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isReply ? 20 : 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`${isReply ? 'ml-8 mt-3' : ''}`}
    >
      <div className="bg-slate-900/30 border border-cyan-500/10 rounded-lg p-4 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={comment.users?.avatar_url || 'https://via.placeholder.com/32'}
              alt={comment.users?.full_name}
              className="w-8 h-8 rounded-full border border-cyan-500/20"
            />
            <div>
              <p className="font-semibold text-white text-sm">{comment.users?.full_name}</p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.created_at), { locale: th, addSuffix: true })}
                {comment.is_edited && ' (edited)'}
              </p>
            </div>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-500"
              onClick={() => onDelete(comment.id)}
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>

        {/* Content */}
        {!comment.is_deleted ? (
          <p className="text-gray-300 text-sm mb-3">{comment.content}</p>
        ) : (
          <p className="text-gray-500 text-sm italic mb-3">[Comment deleted]</p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
            onClick={toggleLike}
          >
            <Heart size={12} className="mr-1" fill={isLiked ? 'currentColor' : 'none'} />
            {comment.like_count || 0}
          </Button>
          {onReply && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-400 hover:text-cyan-400"
              onClick={() => onReply(comment.id)}
            >
              <Reply size={12} className="mr-1" />
              Reply
            </Button>
          )}
          {replies && replies.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-400 hover:text-cyan-400"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? 'Hide' : 'Show'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
            </Button>
          )}
        </div>

        {/* Replies */}
        {showReplies && replies && replies.length > 0 && (
          <div className="mt-4 space-y-3">
            {replies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onDelete={onDelete}
                isReply={true}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
