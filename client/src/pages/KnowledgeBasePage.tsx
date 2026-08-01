import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Code, Lightbulb, HelpCircle, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { useState } from 'react';

interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  articles: number;
}

const knowledgeItems: KnowledgeItem[] = [
  {
    id: '1',
    title: 'พื้นฐาน AI',
    description: 'เรียนรู้พื้นฐานของ Artificial Intelligence และวิธีการทำงาน',
    icon: <Lightbulb className="w-8 h-8" />,
    category: 'Fundamentals',
    difficulty: 'beginner',
    articles: 15,
  },
  {
    id: '2',
    title: 'Machine Learning',
    description: 'สำรวจอัลกอริทึม Machine Learning และการประยุกต์ใช้',
    icon: <Code className="w-8 h-8" />,
    category: 'Machine Learning',
    difficulty: 'intermediate',
    articles: 24,
  },
  {
    id: '3',
    title: 'Deep Learning',
    description: 'เข้าใจ Neural Networks และ Deep Learning Architectures',
    icon: <Code className="w-8 h-8" />,
    category: 'Deep Learning',
    difficulty: 'advanced',
    articles: 18,
  },
  {
    id: '4',
    title: 'Natural Language Processing',
    description: 'เรียนรู้เกี่ยวกับการประมวลผลภาษาธรรมชาติ',
    icon: <BookOpen className="w-8 h-8" />,
    category: 'NLP',
    difficulty: 'intermediate',
    articles: 12,
  },
  {
    id: '5',
    title: 'Computer Vision',
    description: 'สำรวจเทคนิค Computer Vision และการจดจำภาพ',
    icon: <Code className="w-8 h-8" />,
    category: 'Computer Vision',
    difficulty: 'advanced',
    articles: 14,
  },
  {
    id: '6',
    title: 'AI Ethics',
    description: 'ทำความเข้าใจเกี่ยวกับจริยธรรมและความรับผิดชอบใน AI',
    icon: <HelpCircle className="w-8 h-8" />,
    category: 'Ethics',
    difficulty: 'intermediate',
    articles: 8,
  },
];

const faqs = [
  {
    question: 'AI คืออะไร?',
    answer: 'Artificial Intelligence (AI) คือการสร้างระบบคอมพิวเตอร์ที่สามารถทำงานที่ต้องใช้สติปัญญาของมนุษย์',
  },
  {
    question: 'ฉันจะเริ่มต้นกับ Machine Learning ได้อย่างไร?',
    answer: 'เริ่มต้นด้วยการเรียนรู้พื้นฐาน Python จากนั้นศึกษา libraries เช่น scikit-learn และ TensorFlow',
  },
  {
    question: 'Deep Learning แตกต่างจาก Machine Learning อย่างไร?',
    answer: 'Deep Learning เป็นสาขาหนึ่งของ Machine Learning ที่ใช้ Neural Networks กับหลายชั้น',
  },
  {
    question: 'ฉันต้องมีพื้นฐานคณิตศาสตร์มากแค่ไหน?',
    answer: 'ความเข้าใจพื้นฐานเกี่ยวกับ Linear Algebra, Calculus และ Statistics จะช่วยได้มาก',
  },
];

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  let filteredItems = knowledgeItems;

  if (searchQuery) {
    filteredItems = filteredItems.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedDifficulty) {
    filteredItems = filteredItems.filter(item => item.difficulty === selectedDifficulty);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <MainLayout>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">ฐานความรู้</h1>
        <p className="text-muted-foreground text-lg">
          ศูนย์รวมทรัพยากรการเรียนรู้เกี่ยวกับ AI และเทคโนโลยี
        </p>
      </motion.section>

      {/* Search and Filter */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="glass rounded-lg border border-white/10 p-6 mb-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ค้นหาในฐานความรู้..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-white/10 focus:border-accent focus:ring-accent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty(null)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                selectedDifficulty === null
                  ? 'bg-accent text-accent-foreground neon-glow'
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10'
              }`}
            >
              ทั้งหมด
            </button>
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium capitalize ${
                  selectedDifficulty === level
                    ? 'bg-accent text-accent-foreground neon-glow'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                }`}
              >
                {level === 'beginner' ? 'ผู้เริ่มต้น' : level === 'intermediate' ? 'ระดับกลาง' : 'ขั้นสูง'}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Knowledge Items */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-foreground mb-8">หมวดหมู่การเรียนรู้</h2>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Card className="glass border-accent/20 p-6 h-full hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 group cursor-pointer">
                  {/* Icon */}
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.difficulty === 'beginner'
                            ? 'bg-green-500/10 text-green-400'
                            : item.difficulty === 'intermediate'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {item.difficulty === 'beginner'
                          ? 'ผู้เริ่มต้น'
                          : item.difficulty === 'intermediate'
                            ? 'ระดับกลาง'
                            : 'ขั้นสูง'}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.articles} บทความ</span>
                  </div>

                  {/* Action */}
                  <Button className="w-full mt-4 bg-accent/20 hover:bg-accent/30 text-accent border border-accent/50">
                    เรียนรู้เพิ่มเติม
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg mb-4">ไม่พบหมวดหมู่ที่ตรงกับการค้นหา</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty(null);
              }}
              variant="outline"
              className="border-accent/50 hover:border-accent hover:bg-accent/10"
            >
              ล้างตัวกรอง
            </Button>
          </motion.div>
        )}
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-16 pt-12 border-t border-white/10"
      >
        <h2 className="text-2xl font-bold text-foreground mb-8">คำถามที่พบบ่อย</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="glass border-accent/20 p-6 hover:border-accent/50 transition-all duration-300">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index.toString() ? null : index.toString())}
                  className="w-full flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-foreground text-left">{faq.question}</h3>
                  <motion.span
                    animate={{ rotate: expandedFaq === index.toString() ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-accent"
                  >
                    ▼
                  </motion.span>
                </button>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedFaq === index.toString() ? 1 : 0,
                    height: expandedFaq === index.toString() ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground mt-4 pt-4 border-t border-white/10">{faq.answer}</p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Resources CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="glass rounded-lg border border-secondary/20 p-12 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">ต้องการความช่วยเหลือเพิ่มเติม?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            ไม่พบสิ่งที่คุณกำลังมองหา? ลองค้นหาในชุมชนหรือติดต่อทีมสนับสนุนของเรา
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-secondary to-accent hover:shadow-lg hover:shadow-secondary/50 neon-glow">
              ค้นหาในชุมชน
            </Button>
            <Button variant="outline" className="border-accent/50 hover:border-accent hover:bg-accent/10">
              ติดต่อสนับสนุน
            </Button>
          </div>
        </div>
      </motion.section>
    </MainLayout>
  );
}
