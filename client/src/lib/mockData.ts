export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  bio: string;
  followers: number;
  following: number;
  joinedAt: Date;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  members: number;
  posts: number;
  category: string;
  isJoined: boolean;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: User;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  publishedAt: Date;
  updatedAt: Date;
  featured: boolean;
}

export interface News {
  id: string;
  title: string;
  description: string;
  image: string;
  source: string;
  category: string;
  publishedAt: Date;
  views: number;
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'mention';
  title: string;
  description: string;
  user: User;
  timestamp: Date;
  read: boolean;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  data: number[];
  labels: string[];
  type: 'line' | 'bar' | 'pie';
  period: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Kweekinnet AI',
    email: 'ai@kweekinnet.com',
    avatar: '🤖',
    role: 'admin',
    bio: 'The official Kweekinnet AI Assistant',
    followers: 5234,
    following: 128,
    joinedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Somchai Developer',
    email: 'somchai@example.com',
    avatar: '👨‍💻',
    role: 'moderator',
    bio: 'Full-stack developer and AI enthusiast',
    followers: 1234,
    following: 456,
    joinedAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    name: 'Niran Designer',
    email: 'niran@example.com',
    avatar: '🎨',
    role: 'user',
    bio: 'UI/UX Designer passionate about AI',
    followers: 892,
    following: 234,
    joinedAt: new Date('2024-03-10'),
  },
];

// Mock Communities
export const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'สัญญาณทั่วไป',
    description: 'สำหรับการสนทนาทั่วไปเกี่ยวกับ AI และเทคโนโลยี',
    icon: '💬',
    members: 12459,
    posts: 24891,
    category: 'General',
    isJoined: true,
  },
  {
    id: '2',
    name: 'ศูนย์เรียนรู้ AI',
    description: 'แหล่งเรียนรู้เกี่ยวกับ AI, Machine Learning และ Deep Learning',
    icon: '📚',
    members: 8234,
    posts: 15678,
    category: 'Learning',
    isJoined: true,
  },
  {
    id: '3',
    name: 'โครงการและการทดลอง',
    description: 'แชร์โครงการ AI และการทดลองของคุณ',
    icon: '🔬',
    members: 5123,
    posts: 9876,
    category: 'Projects',
    isJoined: false,
  },
  {
    id: '4',
    name: 'ความช่วยเหลือและการสนับสนุน',
    description: 'ขอความช่วยเหลือและให้คำแนะนำแก่ผู้อื่น',
    icon: '🆘',
    members: 3456,
    posts: 7234,
    category: 'Support',
    isJoined: true,
  },
];

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'เริ่มต้นกับ Machine Learning: คู่มือสำหรับผู้เริ่มต้น',
    description: 'บทความที่ครอบคลุมพื้นฐานของ Machine Learning และวิธีเริ่มต้น',
    content: 'Machine Learning เป็นสาขาของ AI ที่เน้นการสร้างระบบที่สามารถเรียนรู้จากข้อมูล...',
    author: mockUsers[1],
    category: 'Tutorial',
    tags: ['machine-learning', 'ai', 'beginner'],
    views: 3456,
    likes: 234,
    comments: 45,
    publishedAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-07-25'),
    featured: true,
  },
  {
    id: '2',
    title: 'ความเข้าใจเกี่ยวกับ Neural Networks',
    description: 'การสำรวจเชิงลึกเกี่ยวกับโครงสร้างและการทำงานของ Neural Networks',
    content: 'Neural Networks เป็นแบบจำลองการคำนวณที่ได้รับแรงบันดาลใจจากสมองของมนุษย์...',
    author: mockUsers[2],
    category: 'Deep Dive',
    tags: ['neural-networks', 'deep-learning'],
    views: 2134,
    likes: 156,
    comments: 32,
    publishedAt: new Date('2024-07-18'),
    updatedAt: new Date('2024-07-22'),
    featured: true,
  },
  {
    id: '3',
    title: 'Best Practices สำหรับการพัฒนา AI Models',
    description: 'เคล็ดลับและแนวปฏิบัติที่ดีที่สุดสำหรับการพัฒนาโมเดล AI ที่มีประสิทธิภาพ',
    content: 'การพัฒนาโมเดล AI ที่มีประสิทธิภาพต้องการความเข้าใจอย่างลึกซึ้ง...',
    author: mockUsers[0],
    category: 'Best Practices',
    tags: ['ai', 'development', 'best-practices'],
    views: 1876,
    likes: 123,
    comments: 28,
    publishedAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-07-20'),
    featured: false,
  },
];

// Mock News
export const mockNews: News[] = [
  {
    id: '1',
    title: 'ความก้าวหน้าใหม่ในด้าน AI ทำให้เกิดการเปลี่ยนแปลงในอุตสาหกรรม',
    description: 'เทคโนโลยี AI ล่าสุดกำลังเปลี่ยนแปลงวิธีการทำงานของบริษัท',
    image: '🔮',
    source: 'Tech News Daily',
    category: 'Technology',
    publishedAt: new Date('2024-07-28'),
    views: 5234,
  },
  {
    id: '2',
    title: 'AI ช่วยแพทย์วินิจฉัยโรคได้แม่นยำยิ่งขึ้น',
    description: 'การประยุกต์ใช้ AI ในสาขาการแพทย์แสดงผลลัพธ์ที่น่ากังวล',
    image: '⚕️',
    source: 'Medical Innovation',
    category: 'Healthcare',
    publishedAt: new Date('2024-07-27'),
    views: 3456,
  },
  {
    id: '3',
    title: 'ประเทศไทยเตรียมกฎหมายควบคุม AI',
    description: 'รัฐบาลเตรียมออกกฎหมายเพื่อควบคุมการใช้งาน AI ในประเทศ',
    image: '⚖️',
    source: 'Government News',
    category: 'Policy',
    publishedAt: new Date('2024-07-26'),
    views: 2345,
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    sender: mockUsers[1],
    content: 'สวัสดี! คุณสนใจเรียนรู้เกี่ยวกับ AI หรือไม่?',
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
  {
    id: '2',
    sender: mockUsers[2],
    content: 'ใช่ครับ! ฉันอยากเรียนรู้เกี่ยวกับ Machine Learning',
    timestamp: new Date(Date.now() - 1800000),
    read: true,
  },
  {
    id: '3',
    sender: mockUsers[1],
    content: 'ยอดเยี่ยม! เรามีหลักสูตรที่ดีสำหรับผู้เริ่มต้น',
    timestamp: new Date(Date.now() - 900000),
    read: false,
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'Somchai Developer ชอบบทความของคุณ',
    description: 'เขาชอบบทความ "เริ่มต้นกับ Machine Learning"',
    user: mockUsers[1],
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    title: 'Niran Designer ได้แสดงความเห็นในบทความของคุณ',
    description: 'เขาได้แสดงความเห็นในบทความ "Neural Networks"',
    user: mockUsers[2],
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    title: 'Kweekinnet AI เริ่มติดตามคุณ',
    description: 'Kweekinnet AI เริ่มติดตามโปรไฟล์ของคุณ',
    user: mockUsers[0],
    timestamp: new Date(Date.now() - 10800000),
    read: true,
  },
];

// Mock Reports
export const mockReports: Report[] = [
  {
    id: '1',
    title: 'จำนวนผู้ใช้ในแต่ละเดือน',
    description: 'สถิติการเติบโตของผู้ใช้ในช่วง 6 เดือนที่ผ่านมา',
    data: [1200, 1900, 1500, 2200, 2800, 3200],
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน'],
    type: 'line',
    period: '6 months',
  },
  {
    id: '2',
    title: 'ประเภทของบทความ',
    description: 'การกระจายตัวของบทความตามประเภท',
    data: [30, 25, 20, 15, 10],
    labels: ['Tutorial', 'Deep Dive', 'News', 'Best Practices', 'Other'],
    type: 'pie',
    period: 'current',
  },
  {
    id: '3',
    title: 'ความเป็นไปได้ของการมีส่วนร่วม',
    description: 'สถิติการมีส่วนร่วมของชุมชน',
    data: [45, 52, 48, 61, 55, 67],
    labels: ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5', 'สัปดาห์ 6'],
    type: 'bar',
    period: '6 weeks',
  },
];

// Helper functions
export const getMockUserById = (id: string): User | undefined => {
  return mockUsers.find(u => u.id === id);
};

export const getMockCommunityById = (id: string): Community | undefined => {
  return mockCommunities.find(c => c.id === id);
};

export const getMockArticleById = (id: string): Article | undefined => {
  return mockArticles.find(a => a.id === id);
};

export const getMockNewsById = (id: string): News | undefined => {
  return mockNews.find(n => n.id === id);
};

export const getFeaturedArticles = (): Article[] => {
  return mockArticles.filter(a => a.featured);
};

export const getRecentArticles = (limit: number = 5): Article[] => {
  return mockArticles
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
};

export const getRecentNews = (limit: number = 5): News[] => {
  return mockNews
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
};

export const searchArticles = (query: string): Article[] => {
  const lowerQuery = query.toLowerCase();
  return mockArticles.filter(
    a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.description.toLowerCase().includes(lowerQuery) ||
      a.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
};

export const searchCommunities = (query: string): Community[] => {
  const lowerQuery = query.toLowerCase();
  return mockCommunities.filter(
    c =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery)
  );
};
