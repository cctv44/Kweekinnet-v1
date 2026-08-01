# Kweekinnet - Supabase Guide

## 🚀 Getting Started with Supabase

Supabase is an open-source Firebase alternative providing PostgreSQL database, authentication, real-time subscriptions, and storage.

---

## 📋 Prerequisites

- Supabase account ([Sign up free](https://supabase.com))
- GitHub account (optional, for OAuth)
- Credit card (optional, for production)

---

## 🔧 Initial Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New project"
3. Fill in project details:
   - **Name**: kweekinnet
   - **Database Password**: Strong password
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free (for development)
4. Click "Create new project"
5. Wait for project to initialize (2-5 minutes)

### Step 2: Get API Keys

1. Go to Settings → API
2. Copy the following:
   - **Project URL**: `https://your-project.supabase.co`
   - **Anon Key**: Public key for frontend
   - **Service Role Key**: Private key for backend

### Step 3: Configure Environment Variables

Update `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 🗄️ Database Setup

### Create Tables

1. Go to SQL Editor
2. Create new query
3. Run migration scripts:

```sql
-- Users table (Supabase auth_users is built-in)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Likes table
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, post_id),
  UNIQUE(user_id, comment_id)
);

-- Bookmarks table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Followers table
CREATE TABLE followers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);
```

### Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE followers ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update own
CREATE POLICY "Users can read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Posts: Anyone can read, authenticated can create, users can update own
CREATE POLICY "Anyone can read posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = author_id);

-- Comments: Similar to posts
CREATE POLICY "Anyone can read comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = author_id);

-- Likes: Users can manage own likes
CREATE POLICY "Users can read likes" ON likes FOR SELECT USING (true);
CREATE POLICY "Users can create likes" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own likes" ON likes FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks: Users can manage own bookmarks
CREATE POLICY "Users can read own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Followers: Users can manage own follows
CREATE POLICY "Users can read followers" ON followers FOR SELECT USING (true);
CREATE POLICY "Users can create follows" ON followers FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete own follows" ON followers FOR DELETE USING (auth.uid() = follower_id);
```

---

## 🔐 Authentication

### Enable Email/Password Auth

1. Go to Authentication → Providers
2. Enable "Email"
3. Configure email settings:
   - **Confirm email**: On (recommended)
   - **Double confirm change**: On (recommended)

### Email Templates

1. Go to Authentication → Email Templates
2. Customize templates:
   - Confirmation email
   - Password reset email
   - Magic link email

### Test Authentication

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'password123',
});

// Sign out
await supabase.auth.signOut();
```

---

## 💾 Storage

### Create Storage Bucket

1. Go to Storage
2. Click "New bucket"
3. Name: `avatars` (or any name)
4. Make public (if needed)

### Upload Files

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.jpg`, file);

// Get public URL
const { data: urlData } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.jpg`);

console.log(urlData.publicUrl);
```

### Storage Policies

```sql
-- Allow users to upload to their own folder
CREATE POLICY "Users can upload avatars" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public read
CREATE POLICY "Public can read avatars" ON storage.objects FOR SELECT USING (
  bucket_id = 'avatars'
);
```

---

## 🔄 Real-time Subscriptions

### Subscribe to Changes

```typescript
import { RealtimeChannel } from '@supabase/supabase-js';

// Subscribe to posts changes
const channel = supabase
  .channel('posts')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'posts'
  }, (payload) => {
    console.log('Change received!', payload);
  })
  .subscribe();

// Unsubscribe
channel.unsubscribe();
```

### Real-time Presence

```typescript
// Track user presence
const channel = supabase
  .channel('online-users')
  .on('presence', { event: 'sync' }, () => {
    const newPresenceState = channel.presenceState();
    console.log('Online users:', newPresenceState);
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({
        user: 'user-id',
        online_at: new Date(),
      });
    }
  });
```

---

## 🔍 Querying Data

### Basic Queries

```typescript
// Select all
const { data, error } = await supabase
  .from('posts')
  .select();

// Select with filter
const { data } = await supabase
  .from('posts')
  .select()
  .eq('author_id', userId);

// Select with ordering
const { data } = await supabase
  .from('posts')
  .select()
  .order('created_at', { ascending: false });

// Select with pagination
const { data } = await supabase
  .from('posts')
  .select()
  .range(0, 9);

// Select with joins
const { data } = await supabase
  .from('posts')
  .select(`
    id,
    title,
    profiles (
      id,
      name,
      avatar_url
    )
  `);
```

### Insert Data

```typescript
const { data, error } = await supabase
  .from('posts')
  .insert([
    {
      title: 'My Post',
      content: 'Post content',
      author_id: userId,
    }
  ])
  .select();
```

### Update Data

```typescript
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', postId)
  .select();
```

### Delete Data

```typescript
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId);
```

---

## 📊 Database Backups

### Automatic Backups

Supabase automatically backs up your database:
- Daily backups (7 days retention)
- Weekly backups (30 days retention)

### Manual Backup

1. Go to Settings → Backups
2. Click "Create backup"
3. Name the backup
4. Click "Create"

### Restore from Backup

1. Go to Settings → Backups
2. Select backup
3. Click "Restore"
4. Confirm restoration

---

## 🔒 Security Best Practices

### API Key Security

- **Anon Key**: Public, use in frontend
- **Service Role Key**: Private, use in backend only
- **Never commit keys** to version control

### Row Level Security

- Always enable RLS on tables
- Define policies for each table
- Test policies before production

### Password Security

- Enforce strong passwords
- Use password reset emails
- Implement rate limiting

---

## 🐛 Troubleshooting

### Issue: "Invalid API Key"

**Solution:**
- Verify API key in `.env.local`
- Check key hasn't been revoked
- Regenerate key if needed

### Issue: "RLS policy violation"

**Solution:**
- Check RLS policies are correct
- Verify user ID matches
- Ensure auth.uid() is available

### Issue: "Bucket not found"

**Solution:**
- Verify bucket name is correct
- Check bucket exists in Storage
- Verify bucket permissions

### Issue: "Connection timeout"

**Solution:**
- Check internet connection
- Verify Supabase project is running
- Try different region

---

## 📈 Monitoring

### View Metrics

1. Go to Monitoring
2. View:
   - Database connections
   - Query performance
   - Storage usage
   - Auth activity

### Set Alerts

1. Go to Settings → Alerts
2. Create alert for:
   - High database connections
   - High storage usage
   - Auth failures

---

## 💰 Pricing

### Free Plan
- 500 MB database
- 1 GB file storage
- 50,000 monthly active users
- Perfect for development

### Pro Plan
- $25/month
- 8 GB database
- 100 GB file storage
- Unlimited users
- Priority support

### Enterprise
- Custom pricing
- Dedicated support
- Advanced features

---

## 📚 Resources

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **API Reference**: [supabase.com/docs/reference](https://supabase.com/docs/reference)
- **Supabase CLI**: [supabase.com/docs/guides/cli](https://supabase.com/docs/guides/cli)
- **Community**: [discord.gg/supabase](https://discord.gg/supabase)

---

**Last Updated**: January 28, 2024  
**Version**: 5.0.0
