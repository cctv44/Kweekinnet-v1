import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorUIProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export default function ErrorUI({
  title = 'เกิดข้อผิดพลาด',
  message = 'ขออภัย มีบางอย่างผิดพลาด โปรดลองอีกครั้ง',
  onRetry,
  fullScreen = false,
}: ErrorUIProps) {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center py-12';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={containerClass}
    >
      <div className="glass rounded-lg border border-destructive/20 p-8 max-w-md w-full mx-4">
        {/* Error Icon */}
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          className="flex justify-center mb-4"
        >
          <div className="p-3 bg-destructive/10 rounded-full">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-center text-foreground mb-2">{title}</h3>

        {/* Message */}
        <p className="text-sm text-center text-muted-foreground mb-6">{message}</p>

        {/* Retry Button */}
        {onRetry && (
          <Button
            onClick={onRetry}
            className="w-full bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            ลองอีกครั้ง
          </Button>
        )}

        {/* Error Details */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-muted-foreground text-center">
            หากปัญหาคงอยู่ โปรดติดต่อ{' '}
            <a href="mailto:support@kweekinnet.com" className="text-accent hover:underline">
              ทีมสนับสนุน
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
