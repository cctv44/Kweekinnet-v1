# Kweekinnet - Deployment Guide

คู่มืออย่างละเอียดสำหรับการปรับใช้ Kweekinnet ไปยังสภาพแวดล้อมต่างๆ

## 📋 สารบัญ

1. [Vercel Deployment](#vercel-deployment)
2. [GitHub Pages](#github-pages)
3. [Docker Deployment](#docker-deployment)
4. [Self-Hosted (VPS)](#self-hosted-vps)
5. [Environment Setup](#environment-setup)
6. [Database Setup](#database-setup)
7. [Troubleshooting](#troubleshooting)

## 🚀 Vercel Deployment

Vercel เป็นตัวเลือกที่ดีที่สุดสำหรับการปรับใช้ Next.js

### ขั้นตอน

1. **สร้างบัญชี Vercel**
   - ไปที่ [vercel.com](https://vercel.com)
   - สมัครสมาชิกด้วยบัญชี GitHub

2. **เชื่อมต่อ Repository**
   - คลิก "New Project"
   - เลือก GitHub repository `kweekinnet`
   - Vercel จะตรวจพบว่าเป็นโปรเจกต์ Next.js

3. **ตั้งค่า Environment Variables**
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   VITE_APP_ID=your_app_id
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://portal.manus.im
   OWNER_NAME=Your Name
   OWNER_OPEN_ID=your_open_id
   BUILT_IN_FORGE_API_URL=https://api.manus.im
   BUILT_IN_FORGE_API_KEY=your_api_key
   VITE_FRONTEND_FORGE_API_KEY=your_frontend_api_key
   VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
   VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
   VITE_ANALYTICS_WEBSITE_ID=your_website_id
   VITE_APP_TITLE=Kweekinnet - AI Community Platform
   VITE_APP_LOGO=https://example.com/logo.png
   ```

4. **Deploy**
   - คลิก "Deploy"
   - Vercel จะสร้างและปรับใช้แอปพลิเคชัน

5. **ตั้งค่า Custom Domain** (Optional)
   - ไปที่ Settings > Domains
   - เพิ่มโดเมนของคุณ
   - ตั้งค่า DNS records

### ข้อดี
- ✅ Deployment อัตโนมัติจาก GitHub
- ✅ SSL/TLS ฟรี
- ✅ CDN ทั่วโลก
- ✅ Serverless functions
- ✅ Analytics built-in

### ข้อเสีย
- ❌ ต้องจ่ายสำหรับ Pro plan สำหรับฟีเจอร์ขั้นสูง

---

## 📄 GitHub Pages

สำหรับการปรับใช้เว็บไซต์แบบ static (หากไม่ต้องการ backend)

### ขั้นตอน

1. **ตั้งค่า Repository**
   ```bash
   git clone https://github.com/yourusername/kweekinnet.git
   cd kweekinnet
   ```

2. **ตั้งค่า GitHub Pages**
   - ไปที่ Settings > Pages
   - เลือก "Deploy from a branch"
   - เลือก `gh-pages` branch

3. **Build และ Deploy**
   ```bash
   pnpm build
   pnpm export  # สำหรับ static export
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

4. **ตั้งค่า Custom Domain** (Optional)
   - ใน Settings > Pages
   - ป้อน custom domain

### ข้อดี
- ✅ ฟรี
- ✅ Hosting บน GitHub
- ✅ SSL/TLS ฟรี

### ข้อเสีย
- ❌ ไม่รองรับ backend
- ❌ ต้องเป็น public repository

---

## 🐳 Docker Deployment

สำหรับการปรับใช้ที่ยืดหยุ่นและสามารถปรับขนาดได้

### ขั้นตอน

1. **สร้าง Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package.json pnpm-lock.yaml ./
   RUN npm install -g pnpm && pnpm install --frozen-lockfile
   
   COPY . .
   
   RUN pnpm build
   
   EXPOSE 3000
   
   CMD ["pnpm", "start"]
   ```

2. **สร้าง Docker Image**
   ```bash
   docker build -t kweekinnet:latest .
   ```

3. **รัน Container**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL=your_database_url \
     -e JWT_SECRET=your_jwt_secret \
     kweekinnet:latest
   ```

4. **Push ไป Docker Hub** (Optional)
   ```bash
   docker tag kweekinnet:latest yourusername/kweekinnet:latest
   docker push yourusername/kweekinnet:latest
   ```

### ข้อดี
- ✅ สามารถปรับขนาดได้
- ✅ สภาพแวดล้อมที่สอดคล้องกัน
- ✅ ใช้ได้กับ Kubernetes

### ข้อเสีย
- ❌ ต้องมีความรู้เกี่ยวกับ Docker
- ❌ ต้องจัดการ infrastructure

---

## 🖥️ Self-Hosted (VPS)

สำหรับการปรับใช้บนเซิร์ฟเวอร์ของคุณเอง

### ขั้นตอน

1. **ตั้งค่า VPS**
   - เลือก VPS provider (AWS, DigitalOcean, Linode, etc.)
   - เลือก Ubuntu 22.04 LTS
   - ตั้งค่า SSH keys

2. **ติดตั้ง Dependencies**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   sudo apt install -y nodejs npm git
   
   # ติดตั้ง pnpm
   npm install -g pnpm
   
   # ติดตั้ง PM2 (process manager)
   npm install -g pm2
   ```

3. **Clone Repository**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/kweekinnet.git
   cd kweekinnet
   ```

4. **ติดตั้ง Dependencies**
   ```bash
   pnpm install
   ```

5. **ตั้งค่า Environment Variables**
   ```bash
   cp .env.example .env.local
   nano .env.local  # แก้ไขตัวแปร
   ```

6. **Build Application**
   ```bash
   pnpm build
   ```

7. **เรียกใช้ด้วย PM2**
   ```bash
   pm2 start "pnpm start" --name kweekinnet
   pm2 save
   pm2 startup
   ```

8. **ตั้งค่า Nginx**
   ```bash
   sudo apt install -y nginx
   
   # สร้าง config file
   sudo nano /etc/nginx/sites-available/kweekinnet
   ```

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/kweekinnet /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **ตั้งค่า SSL (Let's Encrypt)**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### ข้อดี
- ✅ ควบคุมเต็มที่
- ✅ ไม่มีข้อ จำกัด
- ✅ ราคาถูก

### ข้อเสีย
- ❌ ต้องจัดการ infrastructure
- ❌ ต้องมีความรู้เกี่ยวกับ DevOps

---

## 🔧 Environment Setup

### ตัวแปร Environment ที่จำเป็น

| ตัวแปร | คำอธิบาย | ตัวอย่าง |
|------|----------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@localhost:3306/db` |
| `JWT_SECRET` | Secret key for JWT | `your-secret-key` |
| `VITE_APP_ID` | OAuth app ID | `your-app-id` |
| `OAUTH_SERVER_URL` | OAuth server URL | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | OAuth portal URL | `https://portal.manus.im` |
| `OWNER_NAME` | Owner name | `Your Name` |
| `OWNER_OPEN_ID` | Owner OpenID | `your-open-id` |
| `BUILT_IN_FORGE_API_URL` | Forge API URL | `https://api.manus.im` |
| `BUILT_IN_FORGE_API_KEY` | Forge API key | `your-api-key` |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend Forge API key | `your-frontend-key` |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend Forge API URL | `https://api.manus.im` |
| `VITE_ANALYTICS_ENDPOINT` | Analytics endpoint | `https://analytics.example.com` |
| `VITE_ANALYTICS_WEBSITE_ID` | Analytics website ID | `your-website-id` |
| `VITE_APP_TITLE` | App title | `Kweekinnet` |
| `VITE_APP_LOGO` | App logo URL | `https://example.com/logo.png` |

---

## 🗄️ Database Setup

### MySQL Setup

1. **สร้างฐานข้อมูล**
   ```sql
   CREATE DATABASE kweekinnet;
   CREATE USER 'kweekinnet'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON kweekinnet.* TO 'kweekinnet'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **รัน Migrations**
   ```bash
   pnpm db:push
   ```

### Supabase Setup

1. **สร้างโปรเจกต์ Supabase**
   - ไปที่ [supabase.com](https://supabase.com)
   - สร้างโปรเจกต์ใหม่

2. **ตั้งค่า Environment Variables**
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **สร้างตารางและสคีมา**
   - ใช้ Supabase SQL editor
   - รัน migration scripts

---

## 🐛 Troubleshooting

### ปัญหา: Build ล้มเหลว

**วิธีแก้:**
```bash
# ล้าง cache
rm -rf .next node_modules pnpm-lock.yaml

# ติดตั้งใหม่
pnpm install

# Build ใหม่
pnpm build
```

### ปัญหา: Database connection ล้มเหลว

**วิธีแก้:**
```bash
# ตรวจสอบ DATABASE_URL
echo $DATABASE_URL

# ทดสอบการเชื่อมต่อ
mysql -u user -p -h host database_name
```

### ปัญหา: Port 3000 ถูกใช้งาน

**วิธีแก้:**
```bash
# ค้นหา process ที่ใช้ port 3000
lsof -i :3000

# ฆ่า process
kill -9 <PID>

# หรือใช้ port อื่น
PORT=3001 pnpm start
```

### ปัญหา: Memory leak

**วิธีแก้:**
```bash
# ตรวจสอบ memory usage
pm2 monit

# รีสตาร์ท application
pm2 restart kweekinnet

# ตั้งค่า max memory
pm2 start "pnpm start" --max-memory-restart 500M
```

---

## 📊 Monitoring

### ด้วย PM2

```bash
# ดูสถานะ
pm2 status

# ดู logs
pm2 logs kweekinnet

# ดู real-time monitoring
pm2 monit
```

### ด้วย Vercel

- ไปที่ Vercel Dashboard
- ดู Analytics และ Logs
- ตั้งค่า Alerts

---

## 🔒 Security Checklist

- [ ] ตั้งค่า HTTPS/SSL
- [ ] ตั้งค่า Firewall
- [ ] ปิดใช้งาน SSH password authentication
- [ ] ตั้งค่า Rate limiting
- [ ] ตั้งค่า CORS
- [ ] ใช้ environment variables สำหรับ secrets
- [ ] ตั้งค่า Database backups
- [ ] ตั้งค่า Monitoring และ Alerts
- [ ] ตั้งค่า WAF (Web Application Firewall)
- [ ] ตั้งค่า DDoS protection

---

## 📞 Support

หากมีปัญหา โปรดติดต่อ:
- Email: support@kweekinnet.com
- GitHub Issues: https://github.com/kweekinnet/kweekinnet/issues

---

**Last Updated:** 2024
