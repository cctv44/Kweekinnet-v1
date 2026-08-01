import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass border-t border-white/10 mt-12"
    >
      <div className="px-4 md:px-6 py-8 md:py-12 max-w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl md:text-2xl">🤖</span>
              <span className="font-mono font-bold text-glow text-sm md:text-base">Kweekinnet</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              แพลตฟอร์มชุมชน AI สำหรับการแบ่งปันความรู้และการทำงานร่วมกัน
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm md:text-base">ลิงก์อย่างรวดเร็ว</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  หน้าหลัก
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  เกี่ยวกับเรา
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  ชุมชน
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  ติดต่อเรา
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm md:text-base">ทรัพยากร</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  เอกสารประกอบ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  API Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  บล็อก
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm md:text-base">กฎหมาย</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  นโยบายความเป็นส่วนตัว
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  ข้อกำหนดการใช้งาน
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  นโยบายคุกกี้
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  ติดต่อ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6 md:my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} Kweekinnet - ศูนย์เพื่อการยุคดิจิตอลประเทศไทย
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted-foreground hover:text-accent"
            >
              <Github className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted-foreground hover:text-accent"
            >
              <Twitter className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted-foreground hover:text-accent"
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted-foreground hover:text-accent"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
