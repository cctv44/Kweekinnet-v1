import { motion } from 'framer-motion';
import { Spinner } from '@/components/ui/spinner';

interface LoadingUIProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingUI({ message = 'กำลังโหลด...', fullScreen = false }: LoadingUIProps) {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center py-12';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClass}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="relative w-12 h-12"
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent neon-glow" />
        </motion.div>

        {/* Loading text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-muted-foreground text-glow"
        >
          {message}
        </motion.p>

        {/* Loading dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-2 h-2 rounded-full bg-accent"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
