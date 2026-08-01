import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAIMessages } from '@/hooks/useAI';
import { toast } from 'sonner';
import { AIMessage } from '@/lib/ai-service';

interface AIChatUIProps {
  conversationId: string;
}

export const AIChatUI = ({ conversationId }: AIChatUIProps) => {
  const { messages, sending, fetchMessages } = useAIMessages(conversationId);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useAIMessages(conversationId);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, [conversationId, fetchMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userInput = input;
    setInput('');

    try {
      await sendMessage(userInput);
    } catch (error) {
      setInput(userInput); // Restore input on error
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-2xl font-bold text-white mb-2">กวีกินเน็ต AI</h2>
              <p className="text-gray-400 max-w-md">
                สวัสดี! ฉันคือผู้ช่วย AI ของคุณ พร้อมที่จะตอบคำถามและช่วยค้นหาความรู้จากฐานข้อมูลของเรา
              </p>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg rounded-tr-none'
                      : 'bg-slate-800 border border-cyan-500/20 text-gray-100 rounded-lg rounded-tl-none'
                  } p-4 shadow-lg`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>

                  {/* Message Actions */}
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-cyan-400"
                        onClick={() => copyToClipboard(message.content)}
                      >
                        <Copy size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-green-400"
                      >
                        <ThumbsUp size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                      >
                        <ThumbsDown size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {sending && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800 border border-cyan-500/20 text-gray-100 rounded-lg rounded-tl-none p-4">
              <div className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-cyan-400" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-cyan-500/10 p-4 bg-slate-900/50 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e as any);
              }
            }}
            placeholder="Type your message... (Shift+Enter for new line)"
            className="flex-1 bg-slate-800/50 border-cyan-500/20 text-white placeholder:text-gray-500 resize-none max-h-24"
            rows={3}
            disabled={sending}
          />
          <Button
            type="submit"
            disabled={sending || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white self-end"
          >
            {sending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </Button>
        </form>

        {/* Suggested Prompts */}
        {messages.length === 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'ช่วยฉันค้นหาบทความเกี่ยวกับ AI',
              'มีข่าวล่าสุดเกี่ยวกับเทคโนโลยีไหม',
              'แนะนำวิดีโอเกี่ยวกับการเรียนรู้',
              'ฉันต้องการเรียนรู้เพิ่มเติมเกี่ยวกับ Machine Learning',
            ].map((prompt, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(prompt);
                }}
                className="text-left text-xs p-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 text-gray-300 hover:bg-slate-700/50 hover:border-cyan-500/50 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
