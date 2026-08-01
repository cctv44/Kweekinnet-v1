import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useCreateComment } from '@/hooks/useCommunity';
import { Send, X } from 'lucide-react';
import { toast } from 'sonner';

interface CommentFormProps {
  postId: string;
  parentCommentId?: string;
  onCommentCreated?: (comment: any) => void;
  onCancel?: () => void;
}

export const CommentForm = ({ postId, parentCommentId, onCommentCreated, onCancel }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const { user } = useSupabaseAuth();
  const { createComment, loading } = useCreateComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to comment');
      return;
    }

    if (!content.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    try {
      const comment = await createComment(postId, content, parentCommentId);
      setContent('');
      toast.success('Comment posted successfully');
      onCommentCreated?.(comment);
    } catch (error) {
      toast.error('Failed to post comment');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="bg-slate-900/30 border border-cyan-500/10 rounded-lg p-4 backdrop-blur-sm"
    >
      <div className="flex items-start gap-3 mb-3">
        <img
          src={user?.user_metadata?.avatar_url || 'https://via.placeholder.com/32'}
          alt={user?.user_metadata?.full_name}
          className="w-8 h-8 rounded-full border border-cyan-500/20"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={parentCommentId ? 'Write a reply...' : 'Write a comment...'}
          className="flex-1 bg-slate-800/50 border-cyan-500/20 text-white placeholder:text-gray-500 resize-none"
          rows={3}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <X size={16} className="mr-1" />
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={loading || !content.trim()}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
        >
          <Send size={16} className="mr-2" />
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </div>
    </motion.form>
  );
};
