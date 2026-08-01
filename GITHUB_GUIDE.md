# Kweekinnet - GitHub Guide

## 📚 Overview

This guide explains how to use GitHub for version control, collaboration, and deployment of Kweekinnet.

---

## 🔧 Initial Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/kweekinnet.git
cd kweekinnet
```

### Configure Git

```bash
# Set your name
git config user.name "Your Name"

# Set your email
git config user.email "your.email@example.com"

# Set globally (optional)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Verify Configuration

```bash
git config --list
```

---

## 🌿 Branch Strategy

### Main Branches

- **`main`**: Production-ready code
- **`develop`**: Development branch for integration

### Feature Branches

Create feature branches from `develop`:

```bash
# Create and switch to feature branch
git checkout -b feature/feature-name

# Or using newer syntax
git switch -c feature/feature-name
```

### Naming Convention

- `feature/add-admin-dashboard`
- `fix/login-bug`
- `docs/update-readme`
- `refactor/optimize-queries`

---

## 📝 Commit Workflow

### Make Changes

```bash
# Check status
git status

# Stage changes
git add .

# Or stage specific files
git add client/src/pages/NewPage.tsx
```

### Commit Changes

```bash
# Commit with message
git commit -m "Add admin dashboard"

# Or interactive commit
git commit

# Amend last commit
git commit --amend
```

### Commit Message Format

Follow conventional commits:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test addition
- `chore`: Maintenance

**Examples:**
```
feat(admin): add user management dashboard
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
refactor(api): optimize database queries
```

---

## 🔄 Pushing Changes

### Push to Remote

```bash
# Push current branch
git push origin feature/feature-name

# Push and set upstream
git push -u origin feature/feature-name

# Push all branches
git push origin --all
```

### Force Push (Use Carefully!)

```bash
# Force push (only if you know what you're doing)
git push -f origin feature/feature-name

# Safer alternative: force with lease
git push --force-with-lease origin feature/feature-name
```

---

## 🔀 Pull Requests

### Create Pull Request

1. Push your branch to GitHub
2. Go to GitHub repository
3. Click "Compare & pull request"
4. Fill in PR details:
   - **Title**: Clear, descriptive title
   - **Description**: What changes? Why?
   - **Reviewers**: Assign reviewers
   - **Labels**: Add relevant labels
   - **Projects**: Link to project board

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing Done
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Code Review

- Request review from team members
- Address feedback and comments
- Push additional commits to update PR
- Once approved, merge PR

---

## 🔗 Merging

### Merge Strategies

**Squash and Merge** (Recommended for features):
```bash
git merge --squash feature/feature-name
```

**Rebase and Merge**:
```bash
git rebase main
git merge --ff-only feature/feature-name
```

**Create Merge Commit**:
```bash
git merge --no-ff feature/feature-name
```

### Merge via GitHub

1. Click "Merge pull request"
2. Choose merge strategy
3. Click "Confirm merge"
4. Delete branch (optional)

### Delete Branch

```bash
# Delete local branch
git branch -d feature/feature-name

# Delete remote branch
git push origin --delete feature/feature-name

# Or via GitHub UI
```

---

## 📦 Releases

### Create Release

1. Go to GitHub → Releases
2. Click "Draft a new release"
3. Fill in details:
   - **Tag version**: v1.0.0
   - **Release title**: Version 1.0.0
   - **Description**: What's new?
   - **Attachments**: Add build artifacts

### Semantic Versioning

Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

Examples:
- `v1.0.0`: Initial release
- `v1.1.0`: New features added
- `v1.1.1`: Bug fix
- `v2.0.0`: Breaking changes

---

## 🔍 Viewing History

### View Commits

```bash
# View commit log
git log

# View with graph
git log --graph --oneline --all

# View commits for file
git log -- filename

# View specific commit
git show commit-hash
```

### View Changes

```bash
# View unstaged changes
git diff

# View staged changes
git diff --staged

# View changes between branches
git diff main feature/feature-name

# View changes in commit
git show commit-hash
```

---

## 🔙 Undoing Changes

### Undo Uncommitted Changes

```bash
# Discard changes in working directory
git checkout -- filename

# Or using newer syntax
git restore filename

# Discard all changes
git checkout -- .
```

### Undo Staged Changes

```bash
# Unstage file
git reset HEAD filename

# Or using newer syntax
git restore --staged filename
```

### Undo Commits

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert commit (create new commit)
git revert commit-hash
```

---

## 🔗 Syncing with Remote

### Fetch Updates

```bash
# Fetch from remote
git fetch origin

# Fetch from all remotes
git fetch --all
```

### Pull Updates

```bash
# Pull from remote
git pull origin main

# Pull with rebase
git pull --rebase origin main
```

### Keep Fork Updated

```bash
# Add upstream remote
git remote add upstream https://github.com/original/repo.git

# Fetch from upstream
git fetch upstream

# Rebase on upstream
git rebase upstream/main
```

---

## 🤝 Collaboration

### Working with Others

1. **Create feature branch**: `git checkout -b feature/name`
2. **Make changes**: Edit files
3. **Commit changes**: `git commit -m "message"`
4. **Push branch**: `git push -u origin feature/name`
5. **Create PR**: Open pull request on GitHub
6. **Code review**: Get feedback
7. **Merge**: Merge to main

### Handling Conflicts

```bash
# When pulling/merging causes conflicts
git status  # See conflicted files

# Edit conflicted files manually
# Then stage and commit
git add .
git commit -m "Resolve merge conflicts"
```

---

## 🔐 Security

### SSH Setup

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Copy public key to GitHub
cat ~/.ssh/id_ed25519.pub
# Go to GitHub → Settings → SSH Keys → Add key
```

### Protect Main Branch

1. Go to Settings → Branches
2. Add branch protection rule for `main`
3. Enable:
   - Require pull request reviews
   - Require status checks
   - Require branches to be up to date
   - Include administrators

---

## 🚀 CI/CD Integration

### GitHub Actions

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

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
      - run: pnpm check
      - run: pnpm test
      - run: pnpm build
```

### Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📊 GitHub Issues

### Create Issue

1. Go to Issues tab
2. Click "New issue"
3. Fill in:
   - **Title**: Clear, descriptive
   - **Description**: Details about issue
   - **Labels**: Categorize issue
   - **Assignee**: Who will work on it
   - **Project**: Link to project board

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature request
- `documentation`: Docs improvement
- `good first issue`: Good for beginners
- `help wanted`: Need assistance
- `wontfix`: Won't be fixed

---

## 📋 Project Board

### Setup Project Board

1. Go to Projects tab
2. Click "New project"
3. Choose template (Kanban, Table, etc.)
4. Add columns: To do, In progress, Done

### Link Issues to Project

1. Open issue
2. Click "Projects" on right sidebar
3. Select project
4. Drag issue between columns

---

## 🔧 Useful Commands

```bash
# Show remote URLs
git remote -v

# Add remote
git remote add origin https://github.com/user/repo.git

# Change remote URL
git remote set-url origin https://github.com/user/newrepo.git

# View branch info
git branch -v

# Delete merged branches
git branch -d $(git branch --merged)

# Stash changes
git stash

# Apply stashed changes
git stash pop

# Cherry-pick commit
git cherry-pick commit-hash

# Rebase interactive
git rebase -i HEAD~3
```

---

## 📚 Resources

- **GitHub Docs**: [docs.github.com](https://docs.github.com)
- **Git Documentation**: [git-scm.com](https://git-scm.com)
- **GitHub Flow Guide**: [guides.github.com/introduction/flow](https://guides.github.com/introduction/flow)
- **Conventional Commits**: [conventionalcommits.org](https://www.conventionalcommits.org)

---

## 🆘 Troubleshooting

### Issue: "Permission denied (publickey)"

**Solution:**
```bash
# Check SSH key
ssh -T git@github.com

# Add SSH key to agent
ssh-add ~/.ssh/id_ed25519
```

### Issue: "Detached HEAD"

**Solution:**
```bash
# Go back to branch
git checkout main

# Or create new branch from detached state
git checkout -b new-branch
```

### Issue: "Your branch is ahead of origin/main"

**Solution:**
```bash
# Push your changes
git push origin main
```

---

**Last Updated**: January 28, 2024  
**Version**: 5.0.0
