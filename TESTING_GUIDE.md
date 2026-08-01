# Kweekinnet - Testing Guide

## 🧪 Testing Overview

This guide covers all testing aspects of Kweekinnet, including unit tests, integration tests, and end-to-end tests.

---

## 📋 Test Types

### Unit Tests
Test individual functions and components in isolation.

### Integration Tests
Test how multiple components work together.

### End-to-End Tests
Test complete user workflows.

### Performance Tests
Test application performance and load capacity.

---

## 🛠️ Setup

### Install Testing Dependencies

```bash
pnpm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

### Configure Vitest

The project includes `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
```

---

## 🧬 Unit Tests

### Writing Unit Tests

Create test files with `.test.ts` or `.test.tsx` extension:

```typescript
import { describe, it, expect } from 'vitest';
import { validateEmail } from '@/lib/validators';

describe('validateEmail', () => {
  it('should validate correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should reject invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });

  it('should reject empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});
```

### Testing React Components

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler', async () => {
    const handleClick = vitest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Testing API Calls

```typescript
import { describe, it, expect, vi } from 'vitest';
import { fetchUser } from '@/lib/api';

describe('fetchUser', () => {
  it('should fetch user data', async () => {
    const mockData = { id: '1', name: 'John' };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await fetchUser('1');
    expect(result).toEqual(mockData);
  });

  it('should handle errors', async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );

    await expect(fetchUser('1')).rejects.toThrow('Network error');
  });
});
```

---

## 🔗 Integration Tests

### Testing Component Integration

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '@/components/LoginForm';

describe('LoginForm Integration', () => {
  it('should submit form with valid data', async () => {
    const handleSubmit = vitest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Login'));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should show validation errors', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});
```

### Testing API Integration

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { trpc } from '@/lib/trpc';

describe('Community API Integration', () => {
  beforeEach(() => {
    // Setup test data
  });

  it('should create and fetch post', async () => {
    const post = await trpc.community.posts.create.mutate({
      title: 'Test Post',
      content: 'Test content',
      categoryId: 'cat-1',
    });

    const fetched = await trpc.community.posts.getById.query({
      id: post.id,
    });

    expect(fetched.title).toBe('Test Post');
  });
});
```

---

## 🎯 End-to-End Tests

### Using Playwright

Install Playwright:

```bash
pnpm install --save-dev @playwright/test
```

Create test file `tests/e2e/login.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should login successfully', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:3000/login');

    // Fill login form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for redirect
    await page.waitForURL('http://localhost:3000/');

    // Verify logged in
    expect(await page.isVisible('text=Logout')).toBeTruthy();
  });

  it('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    expect(await page.isVisible('text=Invalid credentials')).toBeTruthy();
  });
});
```

### Running E2E Tests

```bash
# Run all E2E tests
pnpm exec playwright test

# Run specific test file
pnpm exec playwright test tests/e2e/login.spec.ts

# Run in headed mode (see browser)
pnpm exec playwright test --headed

# Debug mode
pnpm exec playwright test --debug
```

---

## 📊 Performance Tests

### Load Testing with k6

Install k6:

```bash
# macOS
brew install k6

# Ubuntu
sudo apt install k6
```

Create performance test `tests/performance/load.js`:

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  // Test homepage
  let res = http.get('http://localhost:3000/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Test API endpoint
  res = http.get('http://localhost:3000/api/trpc/community.posts.list');
  check(res, {
    'API status is 200': (r) => r.status === 200,
    'API response time < 1000ms': (r) => r.timings.duration < 1000,
  });
}
```

Run performance test:

```bash
k6 run tests/performance/load.js
```

---

## 🚀 Running Tests

### Run All Tests

```bash
pnpm test
```

### Run Specific Test File

```bash
pnpm test server/auth.logout.test.ts
```

### Watch Mode

```bash
pnpm test --watch
```

### Coverage Report

```bash
pnpm test --coverage
```

### Debug Tests

```bash
pnpm test --inspect-brk
```

---

## 📝 Test Examples

### Testing Authentication

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { createClient } from '@supabase/supabase-js';

describe('Authentication', () => {
  let supabase;

  beforeEach(() => {
    supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );
  });

  it('should sign up user', async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(error).toBeNull();
    expect(data.user).toBeDefined();
  });

  it('should sign in user', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(error).toBeNull();
    expect(data.session).toBeDefined();
  });
});
```

### Testing Database Operations

```typescript
import { describe, it, expect } from 'vitest';
import { db } from '@/server/db';

describe('Database Operations', () => {
  it('should create post', async () => {
    const post = await db.posts.create({
      title: 'Test Post',
      content: 'Test content',
      authorId: 'user-1',
      categoryId: 'cat-1',
    });

    expect(post.id).toBeDefined();
    expect(post.title).toBe('Test Post');
  });

  it('should fetch posts', async () => {
    const posts = await db.posts.findMany({
      limit: 10,
    });

    expect(Array.isArray(posts)).toBe(true);
  });
});
```

---

## 🔍 Debugging Tests

### Using Console Logs

```typescript
it('should debug test', () => {
  console.log('Debug info:', data);
  expect(data).toBeDefined();
});
```

### Using Debugger

```typescript
it('should debug with debugger', () => {
  debugger; // Execution pauses here
  expect(data).toBeDefined();
});
```

### Using screen.debug()

```typescript
import { render, screen } from '@testing-library/react';

it('should debug component', () => {
  render(<MyComponent />);
  screen.debug(); // Prints DOM
});
```

---

## 📈 Test Coverage

### Generate Coverage Report

```bash
pnpm test --coverage
```

### View Coverage

```bash
# Open coverage report
open coverage/index.html
```

### Coverage Targets

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

---

## 🔄 CI/CD Integration

### GitHub Actions

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:e2e
```

---

## 🐛 Common Testing Issues

### Issue: Tests Timeout

**Solution:**
```typescript
it('should handle async operation', async () => {
  // Increase timeout
}, { timeout: 10000 });
```

### Issue: Module Not Found

**Solution:**
```typescript
// Configure path aliases in vitest.config.ts
resolve: {
  alias: {
    '@': '/src',
  },
}
```

### Issue: Async/Await Not Working

**Solution:**
```typescript
// Always return promise from async tests
it('should work with async', async () => {
  const result = await fetchData();
  expect(result).toBeDefined();
});
```

---

## 📚 Resources

- **Vitest Docs**: [vitest.dev](https://vitest.dev)
- **Testing Library**: [testing-library.com](https://testing-library.com)
- **Playwright**: [playwright.dev](https://playwright.dev)
- **k6 Performance**: [k6.io](https://k6.io)

---

**Last Updated**: January 28, 2024  
**Version**: 5.0.0
