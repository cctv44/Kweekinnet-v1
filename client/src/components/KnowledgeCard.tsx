import { motion } from 'framer-motion';
import { Bookmark, Eye, Share2, FileText, Video, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KnowledgeItem } from '@/lib/ai-service';
import { useState } from 'react';
import { toast } from 'sonner';

interface KnowledgeCardProps {
  item: KnowledgeItem;
  onBookmark?: (item: KnowledgeItem) => void;
  isBookmarked?: boolean;
}

export const KnowledgeCard = ({ item, onBookmark, isBookmarked = false }: KnowledgeCardProps) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const getTypeIcon = () => {
    switch (item.type) {
      case 'article':
        return <FileText size={16} />;
      case 'video':
        return <Video size={16} />;
      case 'news':
        return <Newspaper size={16} />;
      case 'pdf':
        return <FileText size={16} />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'article':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'video':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'news':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'pdf':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark(item);
      setBookmarked(!bookmarked);
      toast.success(bookmarked ? 'Bookmark removed' : 'Bookmarked!');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.summary,
        url: item.url || window.location.href,
      });
    } else {
      navigator.clipboard.writeText(item.url || window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/10 rounded-lg overflow-hidden hover:border-cyan-500/30 transition-all duration-300 group"
    >
      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <Badge className={`${getTypeColor()} border`}>
            <span className="flex items-center gap-1">
              {getTypeIcon()}
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          </Badge>
          {item.relevanceScore && (
            <div className="text-xs text-cyan-400 font-semibold">
              {Math.round(item.relevanceScore * 100)}% match
            </div>
          )}
        </div>

        {/* Title */}
        <a
          href={item.url}
          className="block group/link mb-2"
        >
          <h3 className="text-lg font-semibold text-white group-hover/link:text-cyan-400 transition-colors line-clamp-2">
            {item.title}
          </h3>
        </a>

        {/* Summary */}
        <p className="text-sm text-gray-400 line-clamp-3 mb-4">
          {item.summary || item.content}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-cyan-500/10">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Eye size={14} />
            <span>View</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-cyan-400"
              onClick={handleBookmark}
            >
              <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-cyan-400"
              onClick={handleShare}
            >
              <Share2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Knowledge Grid Component
 */
interface KnowledgeGridProps {
  items: KnowledgeItem[];
  loading?: boolean;
  onBookmark?: (item: KnowledgeItem) => void;
}

export const KnowledgeGrid = ({ items, loading = false, onBookmark }: KnowledgeGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-slate-800/30 border border-cyan-500/10 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No knowledge items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <KnowledgeCard key={`${item.type}-${item.id}`} item={item} onBookmark={onBookmark} />
      ))}
    </div>
  );
};
