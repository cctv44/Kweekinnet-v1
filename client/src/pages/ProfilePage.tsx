import { motion } from 'framer-motion';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import MainLayout from '@/components/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Calendar, ShieldCheck, User as UserIcon } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useSupabaseAuth();

  if (!user) return null;

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto py-8">
        <Card className="glass border-accent/20 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-accent/20 to-blue-500/20 border-b border-white/10" />
          <div className="px-8 pb-8">
            <div className="relative -top-12 flex flex-col md:flex-row md:items-end gap-6">
              <div className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-accent neon-glow flex items-center justify-center text-4xl shadow-lg">
                {user.user_metadata?.avatar_url ? <img src={user.user_metadata.avatar_url} className="rounded-xl" /> : '👤'}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white">{user.user_metadata?.full_name || 'สมาชิก Kweekinnet'}</h1>
                <p className="text-accent text-sm">@{user.email?.split('@')[0]}</p>
              </div>
              <Button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white">แก้ไขโปรไฟล์</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-200 border-b border-white/10 pb-2">ข้อมูลพื้นฐาน</h3>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={18} className="text-accent" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Calendar size={18} className="text-accent" />
                  <span>เข้าร่วมเมื่อ: {new Date(user.created_at).toLocaleDateString('th-TH')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <ShieldCheck size={18} className="text-accent" />
                  <span>สถานะ: <span className="text-green-400">ยืนยันตัวตนแล้ว</span></span>
                </div>
              </div>
              
              <Card className="bg-white/5 border-white/10 p-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">สถิติการใช้งาน</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-xs text-gray-500">บทความ</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-xs text-gray-500">คะแนนความรู้</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </motion.div>
    </MainLayout>
  );
}
