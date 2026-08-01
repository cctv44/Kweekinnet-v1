import { motion } from 'framer-motion';
import MainLayout from '@/components/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Heart, MessageSquare, Share2, X } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      user: 'Somchai Developer',
      action: 'ชอบบทความของคุณ',
      article: 'Machine Learning: ผู้เริ่มต้น',
      timestamp: '2 นาทีที่แล้ว',
      read: false,
    },
    {
      id: 2,
      type: 'comment',
      user: 'Niran Designer',
      action: 'แสดงความเห็นในบทความของคุณ',
      article: 'Web Development Best Practices',
      timestamp: '1 ชั่วโมงที่แล้ว',
      read: false,
    },
    {
      id: 3,
      type: 'share',
      user: 'Kweekinnet Team',
      action: 'แบ่งปันบทความของคุณ',
      article: 'Introduction to AI',
      timestamp: '1 วันที่แล้ว',
      read: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-400" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'share':
        return <Share2 className="w-5 h-5 text-purple-400" />;
      default:
        return <Bell className="w-5 h-5 text-cyan-400" />;
    }
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <MainLayout>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">การแจ้งเตือน</h1>
            <p className="text-muted-foreground text-lg">ติดตามกิจกรรมและการอัปเดตล่าสุด</p>
          </div>
          {notifications.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setNotifications([])}
              className="border-white/10"
            >
              ล้างทั้งหมด
            </Button>
          )}
        </div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <motion.div key={notification.id} variants={itemVariants}>
              <Card
                className={`glass border-accent/20 p-6 hover:border-accent/50 transition-all ${
                  !notification.read ? 'bg-accent/5 border-accent/40' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">
                        <span className="text-accent">{notification.user}</span> {notification.action}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{notification.article}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">ไม่มีการแจ้งเตือน</p>
            <p className="text-muted-foreground text-sm mt-2">
              คุณได้ติดตามทั้งหมดแล้ว!
            </p>
          </motion.div>
        )}
      </motion.section>
    </MainLayout>
  );
}
