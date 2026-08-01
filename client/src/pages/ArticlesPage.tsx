import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Heart, MessageCircle, Eye } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { mockArticles, searchArticles } from '@/lib/mockData';
import { useState } from 'react';

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  const categories = ['Tutorial', 'Deep Dive', 'Best Practices', 'News'];

  let filteredArticles = searchQuery ? searchArticles(searchQuery) : mockArticles;

  if (selectedCategory) {
    filteredArticles = filteredArticles.filter(a => a.category === selectedCategory);
  }

  // Sort articles
  if (sortBy === 'popular') {
    filteredArticles = [...filteredArticles].sort((a, b) => b.likes - a.likes);
  } else if (sortBy === 'trending') {
    filteredArticles = [...filteredArticles].sort((a, b) => b.views - a.views);
  } else {
    filteredArticles = [...filteredArticles].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

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
        <h1 className="text-4xl font-bold text-foreground mb-4">บทความ</h1>
        <p className="text-muted-foreground text-lg">
          อ่านบทความที่เขียนโดยสมาชิกชุมชน Kweekinnet
        </p>
      </motion.section>

      {/* Search and Filter */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="glass rounded-lg border border-white/10 p-6 mb-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ค้นหาบทความ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-white/10 focus:border-accent focus:ring-accent"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-2">หมวดหมู่</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                    selectedCategory === null
                      ? 'bg-accent text-accent-foreground neon-glow'
                      : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                  }`}
                >
                  ทั้งหมด
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      selectedCategory === category
                        ? 'bg-accent text-accent-foreground neon-glow'
                        : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">เรียงลำดับ</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <option value="recent">ล่าสุด</option>
                <option value="popular">ยอดนิยม</option>
                <option value="trending">ขาดหายไป</option>
              </select>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Articles List */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredArticles.length > 0 ? (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Card className="glass border-accent/20 p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 group cursor-pointer">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Content */}
                    <div className="flex-1">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {article.publishedAt.toLocaleDateString('th-TH')}
                        </span>
                        {article.featured && (
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                            ⭐ แนะนำ
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {article.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Author and Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{article.author.avatar}</span>
                          <div>
                            <p className="text-xs font-medium text-foreground">{article.author.name}</p>
                            <p className="text-xs text-muted-foreground">{article.author.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {article.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {article.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {article.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg mb-4">ไม่พบบทความที่ตรงกับการค้นหา</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              variant="outline"
              className="border-accent/50 hover:border-accent hover:bg-accent/10"
            >
              ล้างตัวกรอง
            </Button>
          </motion.div>
        )}
      </motion.section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 pt-12 border-t border-white/10"
      >
        <h2 className="text-2xl font-bold text-foreground mb-8">สถิติบทความ</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass border-accent/20 p-6">
            <p className="text-sm text-muted-foreground mb-1">บทความทั้งหมด</p>
            <p className="text-3xl font-bold text-foreground">{mockArticles.length}</p>
          </Card>
          <Card className="glass border-accent/20 p-6">
            <p className="text-sm text-muted-foreground mb-1">ผู้เขียน</p>
            <p className="text-3xl font-bold text-foreground">{new Set(mockArticles.map(a => a.author.id)).size}</p>
          </Card>
          <Card className="glass border-accent/20 p-6">
            <p className="text-sm text-muted-foreground mb-1">มุมมองทั้งหมด</p>
            <p className="text-3xl font-bold text-foreground">
              {mockArticles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
            </p>
          </Card>
          <Card className="glass border-accent/20 p-6">
            <p className="text-sm text-muted-foreground mb-1">ถูกใจทั้งหมด</p>
            <p className="text-3xl font-bold text-foreground">
              {mockArticles.reduce((sum, a) => sum + a.likes, 0).toLocaleString()}
            </p>
          </Card>
        </div>
      </motion.section>
    </MainLayout>
  );
}
