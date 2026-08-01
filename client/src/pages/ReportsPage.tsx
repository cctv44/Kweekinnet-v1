import { motion } from 'framer-motion';
import MainLayout from '@/components/MainLayout';
import { Card } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from 'lucide-react';

export default function ReportsPage() {
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
        <h1 className="text-4xl font-bold text-foreground mb-4">รายงาน</h1>
        <p className="text-muted-foreground text-lg">ดูสถิติและการวิเคราะห์ของชุมชน</p>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {[
          { title: 'ผู้ใช้ทั้งหมด', value: '12,459', icon: BarChart, color: 'text-cyan-400' },
          { title: 'บทความ', value: '2,891', icon: LineChart, color: 'text-blue-400' },
          { title: 'ชุมชน', value: '45+', icon: PieChart, color: 'text-purple-400' },
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

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="glass border-accent/20 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">กิจกรรมรายเดือน</h2>
            <div className="h-64 bg-gradient-neon rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">กราฟการวิเคราะห์จะแสดงที่นี่</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass border-accent/20 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">หมวดหมู่ยอดนิยม</h2>
            <div className="space-y-4">
              {[
                { name: 'Machine Learning', count: 2345, percentage: 35 },
                { name: 'Web Development', count: 1890, percentage: 28 },
                { name: 'Data Science', count: 1456, percentage: 22 },
                { name: 'Cloud Computing', count: 987, percentage: 15 },
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-2">{category.name}</p>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-foreground font-bold">{category.percentage}%</p>
                    <p className="text-muted-foreground text-sm">{category.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.section>
    </MainLayout>
  );
}
