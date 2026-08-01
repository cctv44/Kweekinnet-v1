# Kweekinnet - Vercel Deployment Guide

## 🚀 Deploy to Vercel

Vercel is the easiest way to deploy Kweekinnet with automatic scaling and zero-config deployments.

---

## 📋 Prerequisites

- GitHub account with repository
- Vercel account ([Sign up free](https://vercel.com))
- All environment variables ready

---

## 🔧 Step-by-Step Deployment

### Step 1: Push to GitHub

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### Step 3: Import Project

1. Click "New Project"
2. Select your GitHub repository
3. Click "Import"

Vercel will auto-detect Next.js and configure build settings.

### Step 4: Configure Environment Variables

1. Go to Settings → Environment Variables
2. Add all variables from `.env.local`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
VITE_APP_TITLE=Kweekinnet
VITE_APP_LOGO=https://example.com/logo.png
```

3. Click "Save"

### Step 5: Deploy

1. Click "Deploy"
2. Vercel builds and deploys automatically
3. Wait for deployment to complete
4. Your app is live at `https://your-project.vercel.app`

---

## 🌐 Custom Domain

### Add Custom Domain

1. Go to Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `kweekinnet.com`)
4. Click "Add"

### Configure DNS

Vercel provides DNS records to add to your domain registrar:

1. Go to your domain registrar
2. Add the provided DNS records
3. Wait for DNS propagation (up to 48 hours)
4. Vercel will verify automatically

### SSL Certificate

Vercel automatically provisions SSL certificates for your domain.

---

## 🔄 Continuous Deployment

### Automatic Deployments

Every push to `main` automatically deploys:

1. Push code to GitHub
2. Vercel detects changes
3. Vercel builds and deploys
4. Your app updates automatically

### Preview Deployments

Every pull request gets a preview deployment:

1. Create pull request
2. Vercel builds preview
3. Comment with preview URL
4. Review changes before merging

### Disable Auto-Deploy

1. Go to Settings → Git
2. Disable "Automatic Deployments"
3. Deploy manually when needed

---

## 📊 Monitoring

### View Deployments

1. Go to Deployments tab
2. View all deployments
3. Click deployment for details

### View Logs

1. Click deployment
2. Go to "Logs" tab
3. View build and runtime logs

### Analytics

1. Go to Analytics tab
2. View:
   - Page load times
   - Core Web Vitals
   - Edge network performance
   - Visitor analytics

---

## 🔧 Build Configuration

### Build Settings

Vercel auto-detects build settings. To customize:

1. Go to Settings → Build & Development Settings
2. Modify:
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`

### Environment Variables by Environment

1. Go to Settings → Environment Variables
2. Select environment:
   - **Production**: For main branch
   - **Preview**: For pull requests
   - **Development**: For local development

### Serverless Functions

Vercel automatically converts API routes to serverless functions.

---

## 🚄 Performance Optimization

### Image Optimization

Vercel automatically optimizes images:

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}
/>
```

### Edge Caching

Vercel caches static assets at the edge:

```typescript
// In next.config.js
export default {
  headers: async () => [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

### Code Splitting

Vercel automatically code-splits your application for optimal performance.

---

## 🔐 Security

### Environment Variables

- Never commit `.env.local`
- Use Vercel's environment variable management
- Rotate secrets regularly

### HTTPS

- All Vercel deployments use HTTPS
- SSL certificates are automatic
- Redirects HTTP to HTTPS

### Security Headers

Add security headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Solution:**
```bash
# Check build locally
pnpm build

# Fix errors
# Push to GitHub
git push origin main
```

### Issue: Environment Variables Not Set

**Solution:**
1. Verify variables in Vercel Settings
2. Redeploy after adding variables
3. Check variable names match code

### Issue: Database Connection Error

**Solution:**
1. Verify DATABASE_URL is correct
2. Check Supabase is running
3. Verify firewall allows connections

### Issue: Slow Performance

**Solution:**
1. Check Analytics for bottlenecks
2. Enable image optimization
3. Implement code splitting
4. Use Edge Functions for dynamic content

### Issue: 404 on Refresh

**Solution:**
Add `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

---

## 📈 Scaling

### Automatic Scaling

Vercel automatically scales based on traffic:
- Serverless functions scale to handle load
- Edge network serves content globally
- No configuration needed

### Upgrade Plan

1. Go to Settings → Billing
2. Click "Upgrade to Pro"
3. Choose plan
4. Update payment method

---

## 💾 Backups

### Database Backups

Supabase handles database backups automatically.

### Code Backups

GitHub stores your code. To backup:

```bash
# Clone repository
git clone https://github.com/yourusername/kweekinnet.git

# Create local backup
tar -czf kweekinnet-backup.tar.gz kweekinnet/
```

---

## 🔄 Rollback

### Rollback Deployment

1. Go to Deployments tab
2. Find previous deployment
3. Click "..." menu
4. Select "Promote to Production"

### Rollback Code

```bash
# View commit history
git log --oneline

# Revert to previous commit
git revert commit-hash
git push origin main
```

---

## 🎯 Best Practices

1. **Use Environment Variables**: Never hardcode secrets
2. **Test Locally**: Run `pnpm build` before pushing
3. **Monitor Performance**: Check Analytics regularly
4. **Set Up Alerts**: Get notified of issues
5. **Use Preview Deployments**: Test before merging
6. **Keep Dependencies Updated**: Run `pnpm update`
7. **Optimize Images**: Use Image component
8. **Enable Caching**: Set appropriate cache headers

---

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)

---

## 🎉 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] All environment variables added
- [ ] Build succeeds
- [ ] Deployment successful
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Monitoring set up
- [ ] Team members invited (optional)

---

**Last Updated**: January 28, 2024  
**Version**: 5.0.0
