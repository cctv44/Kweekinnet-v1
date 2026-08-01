import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'wouter';
import { ArrowRight, Users, BookOpen, Zap, Globe, Search, Eye, MessageCircle, Shield, Heart, Activity } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import {
  getFeaturedArticles,
  getRecentArticles,
  getRecentNews,
  mockCommunities,
} from '@/lib/mockData';

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(3);
  const recentNews = getRecentNews(3);

  const stats = [
    { label: 'สมาชิกชุมชน', value: '12,459', icon: Users, color: 'text-purple-400' },
    { label: 'การทำงาน', value: '24,891', icon: BookOpen, color: 'text-blue-400' },
    { label: 'รายงานแนวทาง', value: '1,284', icon: Zap, color: 'text-cyan-400' },
    { label: 'ออนไลน์ออนนี้', value: '355', icon: Globe, color: 'text-green-400' },
  ];

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
      {/* Hero Section with AI Robot */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="glass rounded-2xl border border-accent/20 p-6 md:p-8 lg:p-12 overflow-hidden relative">
          {/* Background glow */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10 rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
            {/* Left: AI Robot Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center relative"
            >
              <img
                src="/manus-storage/kweekinnet-ai-bot-optimized_80f075a7.png"
                alt="Kweekinnet AI Bot"
                className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-[0_0_20px_rgba(0,255,255,0.5)] relative z-10"
              />
              {/* Animated glow pulse effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                    '0 0 50px rgba(0, 255, 255, 0.6)',
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-lg pointer-events-none"
              />
              {/* Rotating circles around image */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-cyan-400/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 border-2 border-blue-400/10 rounded-full"
              />

              {/* Animated data flow lines - Top */}
              <motion.div
                animate={{
                  x: [0, -50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-16 left-1/2 w-16 h-1 bg-gradient-to-r from-lime-400 to-transparent"
              />

              {/* Animated data flow lines - Bottom */}
              <motion.div
                animate={{
                  x: [0, 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="absolute -bottom-16 left-1/2 w-16 h-1 bg-gradient-to-l from-purple-400 to-transparent"
              />

              {/* Animated data flow lines - Left */}
              <motion.div
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                className="absolute -left-16 top-1/2 w-1 h-16 bg-gradient-to-b from-cyan-400 to-transparent"
              />

              {/* Animated data flow lines - Right */}
              <motion.div
                animate={{
                  y: [0, 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                className="absolute -right-16 top-1/2 w-1 h-16 bg-gradient-to-b from-blue-400 to-transparent"
              />
            </motion.div>

            {/* Right: Content */}
            <motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-glow mb-3 md:mb-4"
              >
                กวีกินเน็ต
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm md:text-base lg:text-lg text-muted-foreground mb-2 md:mb-3"
              >
                ศูนย์กลางข้อมูลอุตสาหะและได้รับหลากหลายกลุ่มสัญญาณ V2K
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6"
              >
                แบบไม่ประสบการณ์ • แสดงเสียงความว่า • ข่าวเหตุสิ่งที่แสดงให้เห็น
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6"
              >
                กันการอื่นๆ, ข้อเสนอ, งานวิจัย, ประสบการณ์...
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex gap-2 md:gap-3"
              >
                <div className="flex-1 bg-input border border-accent/30 rounded-lg px-3 md:px-4 py-2 flex items-center gap-2">
                  <Search className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="ค้นหา..."
                    className="bg-transparent flex-1 outline-none text-xs md:text-sm text-foreground placeholder-muted-foreground"
                  />
                </div>
                <Button className="bg-accent hover:bg-accent/90 text-black px-3 md:px-4">
                  <Search className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8 md:mb-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass border-accent/20 p-4 text-center hover:border-accent/50 transition-all">
                <div className="flex items-center justify-center mb-3">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-muted-foreground text-xs mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-accent">{stat.value}</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        {/* Left Column: Featured & News */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Articles */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-lg md:text-2xl font-bold text-foreground">กระทู้ยอดนิยม</h2>
              <Link href="/articles">
                <a className="text-accent hover:text-accent/80 text-sm flex items-center gap-1">
                  ดูทั้งหมด <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
            <div className="space-y-3">
              {recentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="glass border-accent/20 p-4 hover:border-accent/50 transition-all cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{article.title}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span>{typeof article.author === 'string' ? article.author : article.author.name}</span>
                          <span>•</span>
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                          <span>•</span>
                          <MessageCircle className="w-3 h-3" />
                          <span>{article.comments}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* News Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-lg md:text-2xl font-bold text-foreground">กระดู้สำสุด</h2>
              <Link href="/news">
                <a className="text-accent hover:text-accent/80 text-sm flex items-center gap-1">
                  ดูทั้งหมด <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
            <div className="space-y-3">
              {recentNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="glass border-accent/20 p-4 hover:border-accent/50 transition-all cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="w-6 h-6 text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{news.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{news.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right Column: World Map & AI Panel */}
        <div className="space-y-6">
          {/* World Map Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-bold text-foreground mb-3">แผนที่เหล่าการด้วยโลก</h2>
            <Card className="glass border-accent/20 p-4 h-48 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-12 h-12 text-accent mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground text-sm">แผนที่โลกจะแสดงที่นี่</p>
              </div>
            </Card>
          </motion.section>

          {/* AI Panel */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass border-accent/20 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">AI</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">AI กวีกินเน็ต</p>
                  <p className="text-xs text-accent">BETA</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                ศูนย์ศึกษา ผ่มกวีกินเน็ต ฟอร์มหนึ่ง สตรี และวิธีการข้อมูลเพิ่มเติมเกี่ยวกับ
              </p>
              <Button className="w-full bg-accent/20 hover:bg-accent/30 text-accent border border-accent/50">
                เริ่มสนทนา AI
              </Button>
            </Card>
          </motion.section>

          {/* Statistics Panel */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass border-accent/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">สมาชิกในวันนี้</span>
                </div>
                <span className="text-sm font-bold text-accent">+ 28 คน</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-muted-foreground">กระทู้ในวันนี้</span>
                </div>
                <span className="text-sm font-bold text-blue-400">+ 142 กระทู้</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-muted-foreground">ความคิดเห็นในวันนี้</span>
                </div>
                <span className="text-sm font-bold text-purple-400">+ 587 ความคิดเห็น</span>
              </div>
            </Card>
          </motion.section>

          {/* Online Users */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-sm font-bold text-foreground mb-3">สมาชิกออนไลน์</h3>
            <div className="space-y-2">
              {[
                { name: 'Kweekinnet AI', status: 'online' },
                { name: 'MindShield', status: 'online' },
                { name: 'NightWalker', status: 'online' },
                { name: 'FreedomMind', status: 'online' },
                { name: 'Hopeisthekey', status: 'online' },
              ].map((user, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-muted-foreground">{user.name}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Resources Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">คลังความรู้แนะนำ</h2>
          <Link href="/knowledge-base">
            <a className="text-accent hover:text-accent/80 text-sm flex items-center gap-1">
              ดูทั้งหมด <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {[
            { title: 'การเริ่มต้นและการสอน', icon: '📚', size: '2.4 MB' },
            { title: 'ไลบรารี V2K ดีไซน์', icon: '🎨', size: '8 ไฟล์' },
            { title: 'วิธีการสิ่งที่ดีที่สุด', icon: '✓', size: '12.45' },
            { title: 'ความปลอดภัยอื่นๆ', icon: '🔒', size: '1.1 MB' },
          ].map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <Card className="glass border-accent/20 p-4 hover:border-accent/50 transition-all cursor-pointer text-center">
                <div className="text-3xl mb-2">{resource.icon}</div>
                <p className="text-xs font-medium text-foreground mb-2">{resource.title}</p>
                <p className="text-xs text-muted-foreground">{resource.size}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-12 border-t border-accent/20"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4">พร้อมที่จะเริ่มต้นหรือยัง?</h2>
        <p className="text-muted-foreground mb-6">เข้าร่วมชุมชน Kweekinnet วันนี้เพื่อเรียนรู้และแบ่งปันความรู้</p>
        <Link href="/community">
          <a>
            <Button className="bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:shadow-accent/50">
              เข้าร่วมชุมชน
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </Link>
      </motion.section>
    </MainLayout>
  );
}
