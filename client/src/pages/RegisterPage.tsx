import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signUp } = useSupabaseAuth();
  const [, setLocation] = useLocation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword || !fullName) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, { full_name: fullName });
      setSuccess(true);
      setTimeout(() => setLocation('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to register');
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
            <p className="text-center text-slate-400 mb-8">สร้างบัญชีใหม่</p>

            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="text-green-400 text-lg font-semibold mb-2">✓ ลงทะเบียนสำเร็จ!</div>
                <p className="text-slate-400 text-sm">กำลังเปลี่ยนไปหน้าเข้าสู่ระบบ...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
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

                <div>
                  <Label htmlFor="fullName" className="text-slate-300">
                    ชื่อเต็ม
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="ชื่อเต็มของคุณ"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                    disabled={loading}
                  />
                </div>

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

                <div>
                  <Label htmlFor="password" className="text-slate-300">
                    รหัสผ่าน
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 pr-10"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-slate-300">
                    ยืนยันรหัสผ่าน
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      กำลังลงทะเบียน...
                    </>
                  ) : (
                    'สร้างบัญชี'
                  )}
                </Button>

                <p className="text-center text-slate-400 text-sm">
                  มีบัญชีอยู่แล้ว?{' '}
                  <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                    เข้าสู่ระบบ
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
