import { motion } from 'framer-motion';
import MainLayout from '@/components/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Search } from 'lucide-react';
import { useState } from 'react';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [messageInput, setMessageInput] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Somchai Developer',
      avatar: '👨‍💻',
      lastMessage: 'ขอบคุณสำหรับความช่วยเหลือ!',
      timestamp: '2 นาทีที่แล้ว',
      unread: 2,
    },
    {
      id: 2,
      name: 'Niran Designer',
      avatar: '🎨',
      lastMessage: 'ดีไซน์ใหม่ดูดีมากเลย',
      timestamp: '1 ชั่วโมงที่แล้ว',
      unread: 0,
    },
    {
      id: 3,
      name: 'Kweekinnet Team',
      avatar: '🤖',
      lastMessage: 'ยินดีต้อนรับสู่กวีกินเน็ต',
      timestamp: '1 วันที่แล้ว',
      unread: 0,
    },
  ];

  const messages = [
    { id: 1, sender: 'other', text: 'สวัสดี! คุณสบายดีไหม?', timestamp: '10:30' },
    { id: 2, sender: 'user', text: 'สบายดี ขอบคุณ!', timestamp: '10:31' },
    { id: 3, sender: 'other', text: 'ขอบคุณสำหรับความช่วยเหลือ!', timestamp: '10:32' },
  ];

  return (
    <MainLayout>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">ข้อความ</h1>
        <p className="text-muted-foreground text-lg">สนทนากับสมาชิกชุมชน</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]"
      >
        {/* Conversations List */}
        <Card className="glass border-accent/20 p-4 flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาข้อความ..."
                className="pl-10 bg-input border-white/10"
              />
            </div>
          </div>

          <div className="space-y-2 overflow-y-auto flex-1">
            {conversations.map((conv, index) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(index)}
                className={`w-full p-3 rounded-lg transition-all text-left ${
                  selectedConversation === index
                    ? 'bg-accent/20 border border-accent'
                    : 'hover:bg-muted/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-2xl">{conv.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">{conv.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="glass border-accent/20 lg:col-span-2 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{conversations[selectedConversation].avatar}</span>
              <div>
                <h2 className="font-bold text-foreground">{conversations[selectedConversation].name}</h2>
                <p className="text-xs text-muted-foreground">ออนไลน์</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted/30 text-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="พิมพ์ข้อความ..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="bg-input border-white/10"
            />
            <Button
              size="icon"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </motion.section>
    </MainLayout>
  );
}
