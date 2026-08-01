import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* 404 Number */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <h1 className="text-9xl font-mono font-bold text-glow">404</h1>
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-foreground mb-4">หน้าไม่พบ</h2>

        {/* Description */}
        <p className="text-muted-foreground mb-8">
          ขออภัย หน้าที่คุณค้นหาไม่มีอยู่ หรือเคยถูกย้ายไปที่อื่น
        </p>

        {/* Illustration */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-12 text-6xl"
        >
          🔍
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <a>
              <Button className="bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:shadow-accent/50 neon-glow w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                กลับไปหน้าหลัก
              </Button>
            </a>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 rounded-lg border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all duration-200 text-accent font-medium flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            ย้อนกลับ
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-muted-foreground mb-4">ลิงก์ที่มีประโยชน์</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/community">
              <a className="text-xs text-accent hover:underline">ชุมชน</a>
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/articles">
              <a className="text-xs text-accent hover:underline">บทความ</a>
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/knowledge-base">
              <a className="text-xs text-accent hover:underline">ฐานความรู้</a>
            </Link>
            <span className="text-muted-foreground">•</span>
            <a href="mailto:support@kweekinnet.com" className="text-xs text-accent hover:underline">
              ติดต่อสนับสนุน
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
