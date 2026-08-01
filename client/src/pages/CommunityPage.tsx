import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostCard } from '@/components/PostCard';
import { usePosts } from '@/hooks/useCommunity';
import { categoriesService } from '@/lib/supabase-services';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useLocation } from 'wouter';
import MainLayout from '@/components/MainLayout';

export default function CommunityPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string>();
  const [categories, setCategories] = useState<any[]>([]);
  const [, setLocation] = useLocation();
  const { user } = useSupabaseAuth();
  const { posts, loading, error, total } = usePosts(page, 10, categoryId, search);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await categoriesService.getCategories();
      setCategories(data || []);
    };
    fetchCategories();
  }, []);

  const totalPages = Math.ceil((total || 0) / 10);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  Community
                </h1>
                <p className="text-gray-400">Discover and share knowledge with the community</p>
              </div>
              {user && (
                <Button
                  onClick={() => setLocation('/create-post')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                  <Plus size={20} className="mr-2" />
                  New Post
                </Button>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-10 bg-slate-800/50 border-cyan-500/20 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Button
                variant={!categoryId ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setCategoryId(undefined);
                  setPage(1);
                }}
                className={!categoryId ? 'bg-cyan-500 text-white' : 'border-gray-600 text-gray-300'}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={categoryId === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setCategoryId(category.id);
                    setPage(1);
                  }}
                  className={
                    categoryId === category.id
                      ? 'bg-cyan-500 text-white'
                      : 'border-gray-600 text-gray-300 hover:border-cyan-500/50'
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-64 bg-slate-800/30 border border-cyan-500/10 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-400">Error loading posts: {error}</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No posts found. Be the first to create one!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(Math.max(1, page - 1))}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Previous
                      </Button>
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={page === i + 1 ? 'default' : 'outline'}
                          onClick={() => setPage(i + 1)}
                          className={
                            page === i + 1
                              ? 'bg-cyan-500 text-white'
                              : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                          }
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-white mb-4">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Posts</span>
                    <span className="text-cyan-400 font-bold">{total || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active Members</span>
                    <span className="text-cyan-400 font-bold">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Comments</span>
                    <span className="text-cyan-400 font-bold">5,678</span>
                  </div>
                </div>
              </motion.div>

              {/* Guidelines */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-white mb-4">Community Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Be respectful and constructive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>No spam or self-promotion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Search before posting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Use appropriate categories</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
