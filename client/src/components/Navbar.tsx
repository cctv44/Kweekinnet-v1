import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, MessageSquare, Moon, Search, Sun, Menu } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/_core/hooks/useAuth';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { startLogin } from '@/const';

interface NavbarProps {
  onMenuToggle?: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/10"
    >
      <div className="px-4 md:px-6 flex items-center justify-between h-16 max-w-full">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <span className="text-xl md:text-2xl">🤖</span>
            <span className="font-mono font-bold text-sm md:text-lg text-glow hidden sm:inline">Kweekinnet</span>
          </a>
        </Link>

        {/* Search Bar - Hidden on mobile, visible on md and up */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาบทความ, ชุมชน, ผู้ใช้..."
              className="pl-10 bg-input border-white/10 focus:border-accent focus:ring-accent text-sm"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors group">
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </button>

          {/* Messages */}
          <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors group">
            <MessageSquare className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            )}
          </button>

          {/* Auth Button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/profile">
                <a className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm">
                  <span className="text-muted-foreground">{user.name}</span>
                </a>
              </Link>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="text-xs md:text-sm"
              >
                ออกจากระบบ
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => startLogin()}
              size="sm"
              className="text-xs md:text-sm"
            >
              ลงชื่อเข้า / สมัครสมาชิก
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar - Visible only on mobile */}
      <div className="md:hidden px-4 pb-3 border-t border-white/10">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหา..."
            className="pl-10 bg-input border-white/10 focus:border-accent focus:ring-accent text-sm"
          />
        </div>
      </div>
    </motion.nav>
  );
}
