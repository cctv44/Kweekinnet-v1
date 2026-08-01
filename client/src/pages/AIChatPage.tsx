import { motion } from 'framer-motion';
import { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { AIChatBox } from '@/components/AIChatBox';

export default function AIChatPage() {
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([]);

  const handleSendMessage = (message: string) => {
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
    };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: 'ขอบคุณสำหรับคำถาม! ฉันกำลังประมวลผลคำขอของคุณ...',
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  return (
    <MainLayout>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">AI Chat</h1>
        <p className="text-muted-foreground text-lg">สนทนากับ AI ของกวีกินเน็ต เพื่อขอความช่วยเหลือและคำแนะนำ</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="h-[600px]"
      >
        <AIChatBox messages={messages} onSendMessage={handleSendMessage} />
      </motion.section>
    </MainLayout>
  );
}
