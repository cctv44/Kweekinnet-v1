import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Eye, Share2 } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { mockNews } from '@/lib/mockData';
import { useState } from 'react';

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Technology', 'Healthcare', 'Policy', 'Business'];

  let filteredNews = mockNews;

  if (searchQuery) {
    filteredNews = filteredNews.filter(
      n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory) {
    filteredNews = filteredNews.filter(n => n.category === selectedCategory);
  }

  const sortedNews = [...filteredNews].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

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
        <h1 className="text-4xl font-bold text-foreground mb-4">ข่าวสาร</h1>
        <p className="text-muted-foreground text-lg">
          ติดตามข่าวสารและอัปเดตล่าสุดเกี่ยวกับ AI และเทคโนโลยี
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
              placeholder="ค้นหาข่าวสาร..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-white/10 focus:border-accent focus:ring-accent"
            />
          </div>

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
      </motion.section>

      {/* News Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedNews.map((news) => (
              <motion.div key={news.id} variants={itemVariants}>
                <Card className="glass border-accent/20 h-full hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 group overflow-hidden cursor-pointer">
                  {/* Image */}
                  <div className="relative h-40 bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl group-hover:scale-110 transition-transform duration-300"
                    >
                      {news.image}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                        {news.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {news.publishedAt.toLocaleDateString('th-TH')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {news.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {news.description}
                    </p>

                    {/* Footer */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {news.views}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{news.source}</span>
                        <button className="p-1 hover:bg-white/5 rounded transition-colors">
                          <Share2 className="w-4 h-4 text-muted-foreground hover:text-accent" />
                        </button>
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
            <p className="text-muted-foreground text-lg mb-4">ไม่พบข่าวสารที่ตรงกับการค้นหา</p>
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

      {/* Newsletter Signup */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 pt-12 border-t border-white/10"
      >
        <div className="glass rounded-lg border border-secondary/20 p-12 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">สมัครรับข่าวสาร</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            รับข่าวสารและอัปเดตล่าสุดเกี่ยวกับ AI และเทคโนโลยีโดยตรงในกล่องจดหมายของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="ป้อนอีเมลของคุณ"
              className="flex-1 px-4 py-2 rounded-lg bg-input border border-white/10 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-accent"
            />
            <Button className="bg-gradient-to-r from-secondary to-accent hover:shadow-lg hover:shadow-secondary/50 neon-glow">
              สมัครสมาชิก
            </Button>
          </div>
        </div>
      </motion.section>
    </MainLayout>
  );
}
