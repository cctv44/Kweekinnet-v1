import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useSupabaseAuth();
  const [, setLocation] = useLocation();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
      setTimeout(() => setLocation('/login'), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border border-cyan-500/30 bg-slate-800/50 backdrop-blur-sm">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              กวีกินเน็ต
            </h1>
            <p className="text-center text-slate-400 mb-8">รีเซ็ตรหัสผ่าน</p>

            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-green-400 text-lg font-semibold mb-2">ส่งอีเมลสำเร็จ!</div>
                <p className="text-slate-400 text-sm mb-4">
                  ตรวจสอบอีเมลของคุณสำหรับลิงก์รีเซ็ตรหัสผ่าน
                </p>
                <p className="text-slate-500 text-xs">กำลังเปลี่ยนไปหน้าเข้าสู่ระบบใน 5 วินาที...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}

                <p className="text-slate-400 text-sm mb-6">
                  ป้อนที่อยู่อีเมลของคุณ และเราจะส่งลิงก์เพื่อรีเซ็ตรหัสผ่านของคุณ
                </p>

                <div>
                  <Label htmlFor="email" className="text-slate-300">
                    อีเมล
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      กำลังส่ง...
                    </>
                  ) : (
                    'ส่งลิงก์รีเซ็ต'
                  )}
                </Button>

                <p className="text-center text-slate-400 text-sm">
                  <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                    กลับไปเข้าสู่ระบบ
                  </a>
                </p>
              </form>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
