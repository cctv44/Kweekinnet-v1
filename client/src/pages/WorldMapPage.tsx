import { motion } from 'framer-motion';
import MainLayout from '@/components/MainLayout';
// import Map from '@/components/Map'; // Map component for future use
import { Card } from '@/components/ui/card';
import { Globe, Users, MessageSquare } from 'lucide-react';

export default function WorldMapPage() {
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
        <h1 className="text-4xl font-bold text-foreground mb-4">แผนที่โลก</h1>
        <p className="text-muted-foreground text-lg">ดูการกระจายตัวของชุมชนและผู้ใช้ทั่วโลก</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <Card className="glass border-accent/20 p-6 overflow-hidden">
          <div className="h-96 rounded-lg overflow-hidden bg-gradient-neon flex items-center justify-center">
            <p className="text-muted-foreground">แผนที่โลกจะแสดงที่นี่</p>
          </div>
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: 'ประเทศที่มีผู้ใช้',
            value: '120+',
            icon: Globe,
            description: 'ประเทศที่มีสมาชิกชุมชน',
          },
          {
            title: 'ผู้ใช้ทั้งหมด',
            value: '12,459',
            icon: Users,
            description: 'สมาชิกชุมชนทั่วโลก',
          },
          {
            title: 'การสนทนา',
            value: '45K+',
            icon: MessageSquare,
            description: 'ข้อความและการสนทนา',
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="glass border-accent/20 p-6 hover:border-accent/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <p className="text-muted-foreground text-sm mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-xs">{stat.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12"
      >
        <Card className="glass border-accent/20 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">ภูมิภาคยอดนิยม</h2>
          <div className="space-y-4">
            {[
              { region: 'เอเชียตะวันออกเฉียงใต้', users: 4500, percentage: 36 },
              { region: 'เอเชีย', users: 3200, percentage: 26 },
              { region: 'ยุโรป', users: 2800, percentage: 22 },
              { region: 'อเมริกา', users: 1959, percentage: 16 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground mb-2">{item.region}</p>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-foreground font-bold">{item.percentage}%</p>
                  <p className="text-muted-foreground text-sm">{item.users.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.section>
    </MainLayout>
  );
}
