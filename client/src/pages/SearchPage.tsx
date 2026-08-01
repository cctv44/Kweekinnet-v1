import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Users, BookOpen, Newspaper, Clock } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { searchArticles, searchCommunities, mockUsers } from '@/lib/mockData';
import { useState, useEffect } from 'react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>({
    articles: [],
    communities: [],
    users: [],
  });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const articles = searchArticles(searchQuery);
      const communities = searchCommunities(searchQuery);
      const users = mockUsers.filter(
        u =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults({ articles, communities, users });

      // Add to recent searches
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]);
      }
    } else {
      setSearchResults({ articles: [], communities: [], users: [] });
    }
  }, [searchQuery]);

  const totalResults = searchResults.articles.length + searchResults.communities.length + searchResults.users.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <MainLayout>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">ค้นหา</h1>
        <p className="text-muted-foreground text-lg">
          ค้นหาบทความ ชุมชน และผู้ใช้ทั่วทั้ง Kweekinnet
        </p>
      </motion.section>

      {/* Search Bar */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="ค้นหาบทความ ชุมชน ผู้ใช้..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="pl-12 py-3 bg-input border-white/10 focus:border-accent focus:ring-accent text-lg"
          />
        </div>
      </motion.section>

      {/* Results or Recent Searches */}
      {searchQuery.trim() ? (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {totalResults > 0 ? (
            <div className="space-y-12">
              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground"
              >
                พบ {totalResults} ผลลัพธ์สำหรับ "{searchQuery}"
              </motion.div>

              {/* Articles */}
              {searchResults.articles.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    บทความ ({searchResults.articles.length})
                  </h2>
                  <div className="space-y-4">
                    {searchResults.articles.map((article: any) => (
                      <Card key={article.id} className="glass border-accent/20 p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground hover:text-accent transition-colors cursor-pointer">
                            {article.title}
                          </h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                            {article.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {article.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>โดย {article.author.name}</span>
                          <span>{article.publishedAt.toLocaleDateString('th-TH')}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Communities */}
              {searchResults.communities.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    ชุมชน ({searchResults.communities.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.communities.map((community: any) => (
                      <Card key={community.id} className="glass border-accent/20 p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                        <div className="text-4xl mb-4">{community.icon}</div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-accent transition-colors cursor-pointer">
                          {community.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {community.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-muted-foreground">
                          <span>👥 {community.members}</span>
                          <span>📝 {community.posts}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Users */}
              {searchResults.users.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    ผู้ใช้ ({searchResults.users.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.users.map((user: any) => (
                      <Card key={user.id} className="glass border-accent/20 p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-4xl">{user.avatar}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground hover:text-accent transition-colors cursor-pointer">
                              {user.name}
                            </h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                              {user.role}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{user.bio}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-muted-foreground">
                          <span>👥 {user.followers} followers</span>
                          <Button size="sm" variant="outline" className="border-accent/50 hover:border-accent hover:bg-accent/10">
                            ติดตาม
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg mb-4">ไม่พบผลลัพธ์สำหรับ "{searchQuery}"</p>
              <p className="text-sm text-muted-foreground mb-6">
                ลองค้นหาด้วยคำอื่นหรือตรวจสอบการสะกดคำ
              </p>
              <Button
                onClick={() => setSearchQuery('')}
                variant="outline"
                className="border-accent/50 hover:border-accent hover:bg-accent/10"
              >
                ล้างการค้นหา
              </Button>
            </motion.div>
          )}
        </motion.section>
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                ค้นหาล่าสุด
              </h2>
              <div className="flex flex-wrap gap-3">
                {recentSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSearchQuery(search)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-200 border border-white/10 hover:border-accent/50"
                  >
                    {search}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">ค้นหายอดนิยม</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Machine Learning', 'Neural Networks', 'Natural Language Processing', 'Computer Vision', 'AI Ethics', 'Deep Learning'].map((term, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSearchQuery(term)}
                  className="p-4 rounded-lg glass border border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 text-left group"
                >
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {term}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">ค้นหา "{term}"</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </MainLayout>
  );
}
