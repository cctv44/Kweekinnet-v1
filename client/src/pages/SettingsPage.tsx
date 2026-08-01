import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import MainLayout from '@/components/MainLayout';
import { Bell, Lock, Globe, Palette, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

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
        <h1 className="text-4xl font-bold text-foreground mb-4">ตั้งค่า</h1>
        <p className="text-muted-foreground text-lg">จัดการการตั้งค่าบัญชีและการตั้งค่าแอปพลิเคชัน</p>
      </motion.section>

      {/* Settings Tabs */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="glass border-b border-white/10 rounded-none mb-8 flex flex-wrap">
            <TabsTrigger value="general" className="data-[state=active]:border-b-2 data-[state=active]:border-accent">
              <Globe className="w-4 h-4 mr-2" />
              ทั่วไป
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:border-b-2 data-[state=active]:border-accent">
              <Bell className="w-4 h-4 mr-2" />
              การแจ้งเตือน
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:border-b-2 data-[state=active]:border-accent">
              <Lock className="w-4 h-4 mr-2" />
              ความเป็นส่วนตัว
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:border-b-2 data-[state=active]:border-accent">
              <Palette className="w-4 h-4 mr-2" />
              ลักษณะ
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:border-b-2 data-[state=active]:border-accent">
              <Shield className="w-4 h-4 mr-2" />
              ความปลอดภัย
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Card className="glass border-accent/20 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">ตั้งค่าทั่วไป</h2>
                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label className="text-sm font-medium text-foreground mb-2 block">ภาษา</label>
                    <select className="w-full px-4 py-2 rounded-lg bg-input border border-white/10 text-foreground">
                      <option>ไทย</option>
                      <option>English</option>
                      <option>中文</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="text-sm font-medium text-foreground mb-2 block">โซนเวลา</label>
                    <select className="w-full px-4 py-2 rounded-lg bg-input border border-white/10 text-foreground">
                      <option>Asia/Bangkok (GMT+7)</option>
                      <option>UTC</option>
                      <option>Asia/Tokyo (GMT+9)</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="text-sm font-medium text-foreground mb-2 block">วันที่และเวลา</label>
                    <select className="w-full px-4 py-2 rounded-lg bg-input border border-white/10 text-foreground">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Card className="glass border-accent/20 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">การแจ้งเตือน</h2>
                <div className="space-y-6">
                  {[
                    { label: 'การแจ้งเตือนทั่วไป', description: 'รับการแจ้งเตือนเกี่ยวกับกิจกรรมสำคัญ' },
                    { label: 'ข้อความใหม่', description: 'รับการแจ้งเตือนเมื่อมีข้อความใหม่' },
                    { label: 'การตอบสนองต่อบทความ', description: 'รับการแจ้งเตือนเมื่อมีคนตอบสนองต่อบทความของคุณ' },
                    { label: 'ข่าวสารและอัปเดต', description: 'รับข่าวสารและอัปเดตล่าสุด' },
                  ].map((item, index) => (
                    <motion.div key={index} variants={itemVariants} className="flex items-center justify-between pb-6 border-b border-white/10 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      <Switch defaultChecked className="ml-4" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Card className="glass border-accent/20 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">ความเป็นส่วนตัว</h2>
                <div className="space-y-6">
                  {[
                    { label: 'โปรไฟล์สาธารณะ', description: 'อนุญาตให้ผู้อื่นดูโปรไฟล์ของคุณ' },
                    { label: 'แสดงสถานะออนไลน์', description: 'แสดงให้ผู้อื่นเห็นว่าคุณออนไลน์หรือไม่' },
                    { label: 'อนุญาตข้อความส่วนตัว', description: 'อนุญาตให้ผู้อื่นส่งข้อความส่วนตัวถึงคุณ' },
                    { label: 'แสดงกิจกรรม', description: 'แสดงกิจกรรมของคุณให้ผู้อื่นเห็น' },
                  ].map((item, index) => (
                    <motion.div key={index} variants={itemVariants} className="flex items-center justify-between pb-6 border-b border-white/10 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      <Switch defaultChecked className="ml-4" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Card className="glass border-accent/20 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">ลักษณะ</h2>
                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center justify-between pb-6 border-b border-white/10">
                      <div>
                        <p className="font-medium text-foreground">โหมดมืด</p>
                        <p className="text-sm text-muted-foreground mt-1">ใช้โหมดมืดสำหรับการมองเห็นที่ดีขึ้น</p>
                      </div>
                      <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} className="ml-4" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="text-sm font-medium text-foreground mb-2 block">ขนาดฟอนต์</label>
                    <select className="w-full px-4 py-2 rounded-lg bg-input border border-white/10 text-foreground">
                      <option>เล็ก</option>
                      <option selected>ปกติ</option>
                      <option>ใหญ่</option>
                      <option>ใหญ่มาก</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="text-sm font-medium text-foreground mb-2 block">สีเน้น</label>
                    <div className="flex gap-3">
                      {[
                        { name: 'cyan', color: '#00ffc8' },
                        { name: 'blue', color: '#64c8ff' },
                        { name: 'purple', color: '#c864ff' },
                        { name: 'pink', color: '#ff64c8' },
                      ].map((color) => (
                        <button
                          key={color.name}
                          className={`w-10 h-10 rounded-lg transition-all ${color.name === 'cyan' ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : 'hover:scale-110'}`}
                          style={{ backgroundColor: color.color }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Card className="glass border-accent/20 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">ความปลอดภัย</h2>
                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <div className="pb-6 border-b border-white/10">
                      <p className="font-medium text-foreground mb-2">รหัสผ่าน</p>
                      <p className="text-sm text-muted-foreground mb-4">เปลี่ยนรหัสผ่านของคุณเป็นประจำเพื่อความปลอดภัย</p>
                      <Button variant="outline" className="border-accent/50 hover:border-accent hover:bg-accent/10">
                        เปลี่ยนรหัสผ่าน
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="pb-6 border-b border-white/10">
                      <p className="font-medium text-foreground mb-2">การยืนยันสองขั้น</p>
                      <p className="text-sm text-muted-foreground mb-4">เพิ่มชั้นความปลอดภัยเพิ่มเติมให้กับบัญชีของคุณ</p>
                      <Button variant="outline" className="border-accent/50 hover:border-accent hover:bg-accent/10">
                        เปิดใช้งาน
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div>
                      <p className="font-medium text-foreground mb-2">เซสชันที่ใช้งานอยู่</p>
                      <p className="text-sm text-muted-foreground mb-4">จัดการอุปกรณ์ที่เข้าสู่ระบบ</p>
                      <Button variant="outline" className="border-accent/50 hover:border-accent hover:bg-accent/10">
                        ดูเซสชัน
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.section>
    </MainLayout>
  );
}
