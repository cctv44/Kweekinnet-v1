import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/_core/hooks/useAuth';
import { Edit2, Mail, MapPin, Link as LinkIcon, Users, BookOpen, Heart, MessageSquare } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { mockArticles, mockUsers } from '@/lib/mockData';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Full-stack developer and AI enthusiast',
    location: 'Bangkok, Thailand',
    website: 'https://example.com',
  });

  const userStats = [
    { label: 'ผลงาน', value: '12', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'ผู้ติดตาม', value: '1.2K', icon: <Users className="w-6 h-6" /> },
    { label: 'กำลังติดตาม', value: '456', icon: <Users className="w-6 h-6" /> },
    { label: 'ถูกใจ', value: '890', icon: <Heart className="w-6 h-6" /> },
  ];

  const userArticles = mockArticles.slice(0, 3);

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
      {/* Profile Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Card className="glass border-accent/20 p-8 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl"
            >
              {user?.name?.charAt(0) === 'S' ? '👨‍💻' : user?.name?.charAt(0) === 'N' ? '🎨' : '🤖'}
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{user?.name || 'User'}</h1>
                  <p className="text-accent text-sm font-medium capitalize">{user?.role}</p>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="border-accent/50 hover:border-accent hover:bg-accent/10"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {isEditing ? 'ยกเลิก' : 'แก้ไข'}
                </Button>
              </div>

              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Bangkok, Thailand
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  <a href="#" className="text-accent hover:underline">
                    https://example.com
                  </a>
                </div>
              </div>

              <p className="text-foreground mt-4">Full-stack developer and AI enthusiast</p>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* Stats */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {userStats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass border-accent/20 p-6 text-center hover:border-accent/50 transition-all duration-300">
                <div className="text-accent mb-2 flex justify-center">{stat.icon}</div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tabs */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="glass border-b border-white/10 rounded-none mb-8">
            <TabsTrigger value="articles" className="data-[state=active]:border-b-2 data-[state=active]:border-accent">
              ผลงาน
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:border-b-2 data-[state=active]:border-accent">
              เกี่ยวกับ
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:border-b-2 data-[state=active]:border-accent">
              ตั้งค่า
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            {userArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass border-accent/20 p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground hover:text-accent transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                      {article.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-muted-foreground">
                    <span>{article.publishedAt.toLocaleDateString('th-TH')}</span>
                    <div className="flex gap-4">
                      <span>👁 {article.views}</span>
                      <span>❤️ {article.likes}</span>
                      <span>💬 {article.comments}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card className="glass border-accent/20 p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">เกี่ยวกับ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">ประวัติ</h3>
                  <p className="text-muted-foreground">
                    ฉันเป็นนักพัฒนาซอฟต์แวร์ที่มีความหลงใหลในเทคโนโลยี AI และ Machine Learning
                    ฉันชอบแบ่งปันความรู้และเรียนรู้จากชุมชน
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">ทักษะ</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'JavaScript', 'React', 'Machine Learning', 'Deep Learning', 'NLP'].map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="glass border-accent/20 p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">ตั้งค่าโปรไฟล์</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">ชื่อ</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-input border-white/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">อีเมล</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-input border-white/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">ประวัติ</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-white/10 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-accent disabled:opacity-50"
                  />
                </div>

                <div className="pt-6 border-t border-white/10 flex gap-4">
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:shadow-accent/50 neon-glow"
                  >
                    บันทึกการเปลี่ยนแปลง
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border-accent/50 hover:border-accent hover:bg-accent/10"
                  >
                    ยกเลิก
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.section>
    </MainLayout>
  );
}
