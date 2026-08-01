import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, MessageSquare, Moon, Search, Sun, Menu, User as UserIcon, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function Navbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const { user, signOut } = useSupabaseAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/10"
    >
      <div className="px-4 md:px-6 flex items-center justify-between h-16 max-w-full">
        <div className="flex items-center gap-4">
          <button onClick={onMenuToggle} className="lg:hidden p-2 hover:bg-white/5 rounded-lg">
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">🤖</span>
              <span className="font-mono font-bold text-lg text-glow hidden sm:inline">Kweekinnet</span>
            </a>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="ค้นหาบทความ, ชุมชน..." className="pl-10 bg-input border-white/10 focus:border-accent" />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={toggleTheme} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-accent">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <a className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent border border-accent/30">
                    <UserIcon size={16} />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-300">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </a>
              </Link>
              <Button onClick={() => signOut()} variant="ghost" size="icon" className="text-muted-foreground hover:text-red-400">
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login"><a className="text-sm text-gray-400 hover:text-white px-3">เข้าสู่ระบบ</a></Link>
              <Link href="/register">
                <a><Button size="sm" className="bg-accent hover:bg-accent/80 text-black font-bold">สมัครสมาชิก</Button></a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
