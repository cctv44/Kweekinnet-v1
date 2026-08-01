# Kweekinnet - AI Community Platform v1.0

**กวีกินเน็ต** เป็นแพลตฟอร์มชุมชน AI ที่ผลิตมาแล้วสำหรับการแบ่งปันความรู้ การทำงานร่วมกัน และการเรียนรู้ด้วยกัน สร้างด้วย Next.js 15, TypeScript, Tailwind CSS, และ shadcn/ui โดยมีดีไซน์สไตล์ Cyberpunk/Neon/Glassmorphism

## ✨ คุณสมบัติหลัก

### 🎨 ดีไซน์และ UI
- **Cyberpunk/Glassmorphism Design** - ดีไซน์สไตล์ Cyberpunk ที่ทันสมัยพร้อมเอฟเฟกต์ Glassmorphism
- **Dark Mode** - โหมดมืดเป็นค่าเริ่มต้นพร้อมการสลับธีมแบบเรียลไทม์
- **Responsive UI** - ตอบสนองต่อทุกขนาดหน้าจอ (Mobile, Tablet, Desktop)
- **Framer Motion Animations** - แอนิเมชันที่ราบรื่นและน่าดู
- **Neon Glow Effects** - เอฟเฟกต์เรืองแสงแบบ Neon ที่สวยงาม

### 📱 หน้าและฟีเจอร์
- **Home Page** - หน้าแรกที่แสดงสถิติชุมชน บทความแนะนำ และข่าวสารล่าสุด
- **Community** - รายชุมชนพร้อมการค้นหาและการกรองตามหมวดหมู่
- **Articles** - บทความจากสมาชิกชุมชนพร้อมการค้นหา การกรอง และการเรียงลำดับ
- **News** - ข่าวสารล่าสุดเกี่ยวกับ AI และเทคโนโลยี
- **Knowledge Base** - ฐานความรู้ที่จัดระเบียบตามระดับความยากและหมวดหมู่
- **Search** - ค้นหาทั่วโลกสำหรับบทความ ชุมชน และผู้ใช้
- **Profile** - หน้าโปรไฟล์ผู้ใช้พร้อมสถิติและการแก้ไข
- **Settings** - ตั้งค่าทั่วไป การแจ้งเตือน ความเป็นส่วนตัว ลักษณะ และความปลอดภัย
- **404 Page** - หน้าข้อผิดพลาด 404 ที่ออกแบบมาอย่างสวยงาม

### 🧩 Components
- **Navbar** - แถบนำทางด้านบนพร้อมค้นหา การแจ้งเตือน ข้อความ และการเข้าสู่ระบบ
- **Sidebar** - เมนูนำทางด้านข้างพร้อมรายการเมนูทั้งหมด
- **Footer** - ส่วนท้ายพร้อมลิงก์และข้อมูลสำคัญ
- **Main Layout** - เลย์เอาต์หลักที่รวม Navbar, Sidebar, และ Footer
- **Loading UI** - UI สำหรับสถานะการโหลด
- **Error UI** - UI สำหรับการแสดงข้อผิดพลาด

### 🎯 Architecture
- **Next.js 15 with App Router** - ใช้ App Router ล่าสุด
- **TypeScript** - ความปลอดภัยของประเภท
- **Tailwind CSS 4** - ยูทิลิตี CSS ที่ทรงพลัง
- **shadcn/ui** - ส่วนประกอบ UI ที่สวยงาม
- **Framer Motion** - ไลบรารีแอนิเมชัน
- **Lucide Icons** - ไอคอนที่สวยงาม
- **Mock Data** - ข้อมูลจำลองสำหรับการพัฒนา
- **Supabase Integration Ready** - เตรียมพร้อมสำหรับการรวม Supabase

## 🚀 เริ่มต้น

### ข้อกำหนดเบื้องต้น
- Node.js 18.17 หรือสูงกว่า
- pnpm 10.4.1 หรือสูงกว่า

### การติดตั้ง

```bash
# Clone repository
git clone https://github.com/yourusername/kweekinnet.git
cd kweekinnet

# ติดตั้ง dependencies
pnpm install

# สร้างไฟล์ .env.local
cp .env.example .env.local

# เรียกใช้ development server
pnpm dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์ของคุณเพื่อดูผลลัพธ์

## 📁 โครงสร้างโปรเจกต์

```
kweekinnet/
├── client/
│   ├── public/              # ไฟล์สถิตย์
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   ├── LoadingUI.tsx
│   │   │   ├── ErrorUI.tsx
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── pages/           # หน้าต่างๆ
│   │   │   ├── HomePage.tsx
│   │   │   ├── CommunityPage.tsx
│   │   │   ├── ArticlesPage.tsx
│   │   │   ├── NewsPage.tsx
│   │   │   ├── KnowledgeBasePage.tsx
│   │   │   ├── SearchPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── lib/
│   │   │   ├── mockData.ts  # ข้อมูลจำลอง
│   │   │   └── utils.ts
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── App.tsx          # แอปพลิเคชันหลัก
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   └── index.html
├── server/                  # Backend (tRPC + Express)
├── drizzle/                 # Database schema
├── shared/                  # Shared types
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 ตัวเลือกการปรับแต่ง

### เปลี่ยนสีเน้น
แก้ไข `client/src/index.css` และเปลี่ยนตัวแปร CSS:

```css
--accent: 0 255 200;           /* Cyan */
--secondary: 200 100 255;      /* Purple */
--primary: 100 200 255;        /* Blue */
```

### เปลี่ยนฟอนต์
แก้ไข `client/index.html` และเพิ่ม Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap" rel="stylesheet" />
```

จากนั้นแก้ไข `client/src/index.css`:

```css
body {
  font-family: 'YourFont', sans-serif;
}
```

## 🔧 การพัฒนา

### เรียกใช้ Development Server
```bash
pnpm dev
```

### Build สำหรับ Production
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

### ตรวจสอบ TypeScript
```bash
pnpm check
```

### Format Code
```bash
pnpm format
```

### Run Tests
```bash
pnpm test
```

## 📦 Dependencies หลัก

- **next** - React framework
- **react** - UI library
- **typescript** - Type safety
- **tailwindcss** - Utility CSS
- **shadcn/ui** - Component library
- **framer-motion** - Animation library
- **lucide-react** - Icon library
- **wouter** - Routing library
- **zod** - Schema validation

## 🚀 Deployment

### Vercel
```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### GitHub Pages
```bash
# Build
pnpm build

# Deploy to GitHub Pages
# Push to gh-pages branch
```

### Docker
```bash
# Build Docker image
docker build -t kweekinnet .

# Run container
docker run -p 3000:3000 kweekinnet
```

## 🔐 Environment Variables

สร้างไฟล์ `.env.local` และเพิ่มตัวแปรต่อไปนี้:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API
VITE_API_URL=http://localhost:3000/api

# OAuth (if needed)
VITE_OAUTH_CLIENT_ID=your_oauth_client_id
VITE_OAUTH_CLIENT_SECRET=your_oauth_client_secret
```

## 📝 Mock Data

ข้อมูลจำลองถูกเก็บไว้ใน `client/src/lib/mockData.ts` และรวมถึง:
- ผู้ใช้ 3 คน
- ชุมชน 4 ชุม
- บทความ 3 บทความ
- ข่าวสาร 3 ข่าว
- ข้อความ 3 ข้อความ
- การแจ้งเตือน 3 การแจ้งเตือน
- รายงาน 3 รายงาน

## 🔄 Supabase Integration

ปัจจุบันโปรเจกต์ใช้ข้อมูลจำลอง แต่เตรียมพร้อมสำหรับการรวม Supabase:

1. สร้างโปรเจกต์ Supabase
2. ตั้งค่าตัวแปร environment
3. สร้างตารางในฐานข้อมูล
4. เปลี่ยนจาก mock data ไปยัง Supabase queries

## 🎓 หน้าที่ของแต่ละหน้า

| หน้า | คำอธิบาย |
|------|----------|
| Home | หน้าแรกที่แสดงสถิติ บทความแนะนำ ข่าวสาร และชุมชน |
| Community | รายชุมชนพร้อมการค้นหาและการกรอง |
| Articles | บทความจากสมาชิกพร้อมการค้นหาและการเรียงลำดับ |
| News | ข่าวสารล่าสุดเกี่ยวกับ AI |
| Knowledge Base | ฐานความรู้พร้อม FAQ |
| Search | ค้นหาทั่วโลก |
| Profile | โปรไฟล์ผู้ใช้ |
| Settings | ตั้งค่าแอปพลิเคชัน |

## 🐛 Known Issues

- ฟีเจอร์ AI Chat, Reports, World Map, Messages, Notifications, Admin Dashboard ยังเป็นตัวยึดไว้ (placeholders)
- ข้อมูลทั้งหมดเป็นข้อมูลจำลอง ยังไม่เชื่อมต่อกับฐานข้อมูล

## 📋 Roadmap

- [ ] รวม Supabase สำหรับฐานข้อมูล
- [ ] สร้าง AI Chat feature
- [ ] สร้าง Reports feature
- [ ] สร้าง World Map feature
- [ ] สร้าง Real-time Messaging
- [ ] สร้าง Admin Dashboard
- [ ] เพิ่มการยืนยันอีเมล
- [ ] เพิ่มการอัปโหลดรูปภาพ
- [ ] เพิ่มการแชร์บนโซเชียลมีเดีย
- [ ] เพิ่มการแปลภาษา

## 🤝 Contributing

ยินดีต้อนรับการมีส่วนร่วม! โปรดทำตามขั้นตอนต่อไปนี้:

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

โปรเจกต์นี้ได้รับอนุญาตภายใต้ MIT License - ดู [LICENSE](LICENSE) ไฟล์สำหรับรายละเอียด

## 👥 Authors

- **Kweekinnet Team** - ทีมพัฒนา Kweekinnet

## 📞 Support

สำหรับการสนับสนุน โปรดติดต่อ:
- Email: support@kweekinnet.com
- Website: https://kweekinnet.com
- GitHub Issues: https://github.com/kweekinnet/kweekinnet/issues

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

**Kweekinnet v1.0** - สร้างด้วย ❤️ สำหรับชุมชน AI
