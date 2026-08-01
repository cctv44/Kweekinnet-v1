import { motion } from 'framer-motion';
import {
  Home,
  Users,
  BookOpen,
  Newspaper,
  MessageCircle,
  BarChart3,
  Globe,
  Mail,
  Bell,
  User,
  Search,
  Settings,
  Shield,
  LogOut,
  X,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  adminOnly?: boolean;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems: NavItem[] = [
  { label: 'หน้าหลัก', href: '/', icon: <Home className="w-5 h-5" /> },
  { label: 'ชุมชน', href: '/community', icon: <Users className="w-5 h-5" /> },
  { label: 'ฐานความรู้', href: '/knowledge-base', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'บทความ', href: '/articles', icon: <Newspaper className="w-5 h-5" /> },
  { label: 'ข่าวสาร', href: '/news', icon: <Newspaper className="w-5 h-5" /> },
  { label: 'AI Chat', href: '/ai-chat', icon: <MessageCircle className="w-5 h-5" /> },
  { label: 'รายงาน', href: '/reports', icon: <BarChart3 className="w-5 h-5" /> },
  { label: 'แผนที่โลก', href: '/world-map', icon: <Globe className="w-5 h-5" /> },
  { label: 'ข้อความ', href: '/messages', icon: <Mail className="w-5 h-5" />, badge: 3 },
  { label: 'การแจ้งเตือน', href: '/notifications', icon: <Bell className="w-5 h-5" />, badge: 2 },
  { label: 'ค้นหา', href: '/search', icon: <Search className="w-5 h-5" /> },
  { label: 'โปรไฟล์', href: '/profile', icon: <User className="w-5 h-5" /> },
  { label: 'แอดมิน', href: '/admin', icon: <Shield className="w-5 h-5" />, adminOnly: true },
  { label: 'ตั้งค่า', href: '/settings', icon: <Settings className="w-5 h-5" /> },
];

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const filteredItems = navItems.filter(item => !item.adminOnly || user?.role === 'admin');

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
    closed: {
      x: -256,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      className="glass fixed left-0 top-16 bottom-0 w-64 border-r border-white/10 overflow-y-auto pt-4 z-50 lg:z-auto lg:relative lg:top-0 lg:translate-x-0"
    >
      {/* Close button for mobile */}
      <div className="lg:hidden px-4 pb-4 flex justify-end">
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="px-4 space-y-1">
        {filteredItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden',
                location === item.href
                  ? 'bg-accent/20 text-accent neon-border'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              {/* Animated background */}
              {location === item.href && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent -z-10"
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                />
              )}

              {/* Icon */}
              <span className="flex-shrink-0">{item.icon}</span>

              {/* Label */}
              <span className="flex-1 text-sm font-medium truncate">{item.label}</span>

              {/* Badge */}
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0 px-2 py-0.5 bg-accent/20 text-accent text-xs font-bold rounded-full"
                >
                  {item.badge}
                </motion.span>
              )}
            </a>
          </Link>
        ))}
      </div>

      {/* User Info Section */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4 bg-gradient-to-t from-black/40 to-transparent">
        {user ? (
          <div className="space-y-3">
            <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        ) : (
          <div className="px-4 py-3 rounded-lg bg-accent/20 border border-accent/50 text-center">
            <p className="text-sm font-medium text-accent">ลงชื่อเข้า / สมัครสมาชิก</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
