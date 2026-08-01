import { motion } from 'framer-motion';
import { Home, Users, BookOpen, Newspaper, MessageCircle, BarChart3, Globe, User, Shield, Settings, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { cn } from '@/lib/utils';

export default function Sidebar({ isOpen = true, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const [location] = useLocation();
  const { user } = useSupabaseAuth();
  
  // ตรวจสอบว่าเป็น Admin หรือไม่ (เช็คจาก email หรือ metadata)
  const isAdmin = user?.email === 'admin@kweekinnet.com' || user?.user_metadata?.role === 'admin';

  const menuItems = [
    { label: 'หน้าหลัก', href: '/', icon: <Home size={20} /> },
    { label: 'ชุมชน', href: '/community', icon: <Users size={20} /> },
    { label: 'ฐานความรู้', href: '/knowledge-base', icon: <BookOpen size={20} /> },
    { label: 'AI Chat', href: '/ai-chat', icon: <MessageCircle size={20} /> },
    { label: 'แผนที่โลก', href: '/world-map', icon: <Globe size={20} /> },
    { label: 'โปรไฟล์', href: '/profile', icon: <User size={20} />, protected: true },
    { label: 'แอดมิน', href: '/admin', icon: <Shield size={20} />, adminOnly: true },
    { label: 'ตั้งค่า', href: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      animate={{ x: isOpen ? 0 : -260 }}
      className="glass fixed left-0 top-16 bottom-0 w-64 border-r border-white/10 overflow-y-auto pt-4 z-40 lg:relative lg:top-0 lg:translate-x-0"
    >
      <div className="px-4 space-y-1">
        {menuItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          if (item.protected && !user) return null;

          const active = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a onClick={onClose} className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                active ? "bg-accent/20 text-accent neon-border" : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}>
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
}
