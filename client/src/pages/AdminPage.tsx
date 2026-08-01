import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, MessageSquare, TrendingUp, Trash2, ShieldCheck, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalPosts: 0 });

  // ฟังก์ชันดึงข้อมูลผู้ใช้จาก Supabase
  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. ดึงรายชื่อผู้ใช้จากตาราง profiles
      const { data: profiles, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false });

      if (userError) throw userError;
      setUsers(profiles || []);

      // 2. ดึงสถิติจำนวนโพสต์ (สมมติว่าสร้างตาราง posts แล้ว)
      const { count: postsCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: profiles?.length || 0,
        totalPosts: postsCount || 0
      });

    } catch (error: any) {
      toast.error('ไม่สามารถดึงข้อมูลได้: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <MainLayout>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-end"
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">จัดการระบบและตรวจสอบผู้ใช้งาน Kweekinnet</p>
        </div>
        <Button onClick={fetchAdminData} variant="outline" className="border-accent/50 text-accent">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          รีเฟรชข้อมูล
        </Button>
      </motion.section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="glass border-accent/20 p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">ผู้ใช้ทั้งหมด</p>
              <p className="text-3xl font-bold text-accent">{stats.totalUsers}</p>
            </div>
            <Users className="w-10 h-10 text-accent opacity-50" />
          </div>
        </Card>
        <Card className="glass border-blue-400/20 p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">บทความจริง</p>
              <p className="text-3xl font-bold text-blue-400">{stats.totalPosts}</p>
            </div>
            <FileText className="w-10 h-10 text-blue-400 opacity-50" />
          </div>
        </Card>
        {/* เพิ่มสถิติอื่นๆ ได้ตามต้องการ */}
      </div>

      {/* User Management Table */}
      <Card className="glass border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="text-accent" /> รายชื่อผู้ใช้งานในฐานข้อมูล
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/20 text-muted-foreground text-sm">
              <tr>
                <th className="py-4 px-6 text-left">ผู้ใช้งาน</th>
                <th className="py-4 px-6 text-left">UID (ID อ้างอิง)</th>
                <th className="py-4 px-6 text-left">สถานะบทบาท</th>
                <th className="py-4 px-6 text-left">แก้ไขล่าสุด</th>
                <th className="py-4 px-6 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-muted-foreground">กำลังโหลดข้อมูล...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-muted-foreground">ยังไม่มีผู้ใช้งานในระบบ</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-xl">
                          {u.avatar_url ? <img src={u.avatar_url} className="w-full h-full rounded-lg object-cover" /> : '👤'}
                        </div>
                        <div>
                          <p className="font-medium text-white">{u.full_name || 'ไม่ระบุชื่อ'}</p>
                          <p className="text-xs text-gray-500">ID: {u.id.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-mono text-gray-400">{u.id}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-400">
                      {new Date(u.updated_at).toLocaleDateString('th-TH')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:bg-red-400/10">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </MainLayout>
  );
}
