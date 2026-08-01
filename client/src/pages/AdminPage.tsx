import { motion } from 'framer-motion';
import MainLayout from '@/components/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, MessageSquare, TrendingUp, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

export default function AdminPage() {
  const [users] = useState([
    { id: 1, name: 'Somchai Developer', email: 'somchai@example.com', role: 'user', status: 'active' },
    { id: 2, name: 'Niran Designer', email: 'niran@example.com', role: 'user', status: 'active' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
  ]);

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
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">แดชบอร์ดผู้ดูแล</h1>
        <p className="text-muted-foreground text-lg">จัดการผู้ใช้และเนื้อหา</p>
      </motion.section>

      {/* Stats */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {[
          { title: 'ผู้ใช้ทั้งหมด', value: '12,459', icon: Users, color: 'text-cyan-400' },
          { title: 'บทความ', value: '2,891', icon: FileText, color: 'text-blue-400' },
          { title: 'ความเห็น', value: '45K+', icon: MessageSquare, color: 'text-purple-400' },
          { title: 'การเติบโต', value: '+28%', icon: TrendingUp, color: 'text-green-400' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass border-accent/20 p-6 hover:border-accent/50 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <Icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.section>

      {/* User Management */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <Card className="glass border-accent/20 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">จัดการผู้ใช้</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">ชื่อ</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">อีเมล</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">บทบาท</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">สถานะ</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">การกระทำ</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-foreground">{user.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-red-400/20 text-red-400'
                            : 'bg-blue-400/20 text-blue-400'
                        }`}
                      >
                        {user.role === 'admin' ? 'ผู้ดูแล' : 'ผู้ใช้'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-400/20 text-green-400'
                            : 'bg-gray-400/20 text-gray-400'
                        }`}
                      >
                        {user.status === 'active' ? 'ออนไลน์' : 'ออฟไลน์'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded transition-colors">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-red-400/10 rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Analytics */}
        <Card className="glass border-accent/20 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">การวิเคราะห์</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-4">กิจกรรมรายสัปดาห์</h3>
              <div className="h-48 bg-gradient-neon rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">กราฟจะแสดงที่นี่</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-4">การแจกแจงบทบาท</h3>
              <div className="h-48 bg-gradient-neon rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">กราฟจะแสดงที่นี่</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>
    </MainLayout>
  );
}
