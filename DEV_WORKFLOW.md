# 🔒 Private Development Branch Workflow

## Branch Strategy Overview

Tony's Toolbox uses a **Private Development Branch** strategy to separate production code from internal development artifacts.

### Branch Structure

```
main (production)           dev-docs (private)
├── .env.example           ├── claude/
├── .gitignore             │   ├── strategy.md
├── CLAUDE.md              │   ├── handoff-context.md
├── /docs/                 │   ├── TODO.md
├── /.github/              │   ├── CHANGELOG.md
└── [app code]             │   ├── review/
                           │   └── supabase_schema.sql
                           ├── .gitignore.dev
                           └── [all main branch files]
```

## 🔑 Key Principles

**Main Branch (Public):**
- ✅ Production-ready code only
- ✅ Public documentation (/docs/v1/, /docs/analytics/)
- ✅ Safe configuration templates (.env.example)
- ✅ CI/CD workflows
- ❌ NO internal strategy documents
- ❌ NO development session files
- ❌ NO sensitive planning materials

**Dev-Docs Branch (Private):**
- ✅ All development artifacts
- ✅ Claude session files
- ✅ Internal strategy documents
- ✅ Prototypes and experiments
- ✅ Development schemas
- 🔒 NEVER merges to main

## 🚀 Development Workflow

### Daily Development
```bash
# Work on dev-docs branch
git checkout dev-docs

# Make development changes
git add claude/ && git commit -m "dev: update strategy docs"

# Switch to main for production code
git checkout main
# [implement features based on dev-docs planning]
```

### Feature Implementation
```bash
# 1. Plan on dev-docs
git checkout dev-docs
# Update claude/strategy.md, TODO.md, etc.
git commit -m "dev: plan new feature X"

# 2. Implement on main
git checkout main
# Create actual application code
git commit -m "feat: implement feature X"

# 3. Update development docs
git checkout dev-docs
git commit -m "dev: mark feature X complete"
```

### Never Do This ❌
```bash
# NEVER merge dev-docs into main
git checkout main
git merge dev-docs  # ❌ DON'T DO THIS

# NEVER push dev-docs to public repo
git push origin dev-docs  # ❌ KEEP PRIVATE
```

## 🔐 Security Benefits

**Credential Protection:**
- API keys stay in local .env files
- Development strategies remain private
- Internal discussions never leak

**Professional Appearance:**
- Clean public repository
- No development clutter in main branch
- Clear separation of concerns

**Collaboration Ready:**
- Team members see only production code
- Documentation is public and useful
- No confusion about what's ready for production

## 📁 File Disposition

### Public Files (Main Branch)
```
tonystoolbox/
├── .env.example          # Safe configuration template
├── .gitignore            # Security-focused ignore rules
├── CLAUDE.md             # AI assistant guidance
├── DEV_WORKFLOW.md       # This file
├── /docs/v1/             # Technical documentation
├── /docs/analytics/      # Analytics setup guides
├── /.github/workflows/   # CI/CD pipelines
└── [application code]    # Next.js application
```

### Private Files (Dev-Docs Branch Only)
```
claude/
├── strategy.md           # Product strategy decisions
├── handoff-context.md    # Project context for AI
├── TODO.md               # Development tasks
├── CHANGELOG.md          # Development changelog
├── review/               # Review materials
│   ├── REVIEW_PROMPT.md
│   ├── supabase_schema.sql
│   └── ui/
└── .env.example          # Development-specific template
```

## 🛠️ Setup Instructions

### First Time Setup
```bash
# Clone or initialize repository
git init && git checkout -b main

# Set up main branch with production files
git add .env.example .gitignore CLAUDE.md docs/ .github/
git commit -m "feat: initial production setup"

# Create development branch
git checkout -b dev-docs

# Copy development gitignore and add private files
cp .gitignore.dev .gitignore
git add claude/ .gitignore
git commit -m "dev: initialize private development branch"
```

### Branch Switching
```bash
# To work on production features
git checkout main

# To work on planning/strategy
git checkout dev-docs

# Check which branch you're on
git branch --show-current
```

## 🔄 Maintenance

**Weekly:**
- Review both branches for consistency
- Update documentation as features are completed
- Clean up old development notes

**Before Production:**
- Ensure main branch has no development artifacts
- Verify .gitignore is working correctly
- Run security audit checklist

This workflow ensures Tony's Toolbox maintains professional appearance while providing rich development context for AI assistance and strategic planning.