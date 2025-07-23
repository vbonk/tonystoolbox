# Tony's Toolbox Internal Repository 🔒

**PRIVATE REPOSITORY - CONFIDENTIAL BUSINESS INFORMATION**

This repository contains sensitive business information, strategic documents, development context, and proprietary data for Tony's Toolbox. Access is restricted to authorized team members only.

---

## 🎯 Dual Repository Strategy

Tony's Toolbox operates on a **dual repository model** for optimal security and transparency:

### 🌐 **Public Repository** - `tonystoolbox`
**URL**: https://github.com/vbonk/tonystoolbox  
**Purpose**: Community-facing development, open-source components, public documentation

**Contains:**
- ✅ Application source code (Next.js, React components)
- ✅ Public API documentation
- ✅ Community contribution guidelines
- ✅ General technical architecture
- ✅ Open-source AI patterns and examples
- ✅ CI/CD pipelines for deployment
- ✅ Issue tracking and feature requests

### 🔒 **Private Repository** - `tonystoolbox-internal` (THIS REPO)
**URL**: https://github.com/vbonk/tonystoolbox-internal  
**Purpose**: Business strategy, confidential planning, development context

**Contains:**
- 🔐 Business strategy and financial planning
- 🔐 Market analysis and competitive intelligence
- 🔐 Customer research and proprietary insights
- 🔐 Claude Code development sessions and context
- 🔐 Internal roadmaps and feature planning
- 🔐 Environment configurations and deployment secrets
- 🔐 Team-only documentation and processes

---

## 🧭 **Decision Framework: Public vs Private**

Use this decision tree to determine where content belongs:

### ⚡ **QUICK TEST**
Ask yourself: *"Would I be comfortable with competitors, customers, and the general public seeing this?"*
- **YES** → Public repository
- **NO** → Private repository  
- **UNSURE** → Default to private (can always move to public later)

### 📊 **DETAILED EVALUATION**

#### **BUSINESS CONTENT**
| Content Type | Public | Private | Reasoning |
|-------------|--------|---------|-----------|
| Feature announcements | ✅ | | Marketing benefit |
| Technical architecture | ✅ | | Community value |
| Revenue models | | 🔐 | Competitive advantage |
| Customer data | | 🔐 | Privacy/legal requirements |
| Pricing strategies | | 🔐 | Business strategy |
| Market research | | 🔐 | Competitive intelligence |

#### **DEVELOPMENT CONTENT**
| Content Type | Public | Private | Reasoning |
|-------------|--------|---------|-----------|
| Bug reports | ✅ | | Community collaboration |
| Feature requests | ✅ | | Transparency |
| Code implementation | ✅ | | Open source value |
| Internal architecture decisions | | 🔐 | Strategic context |
| Claude Code sessions | | 🔐 | Development process |
| Performance metrics | | 🔐 | Business intelligence |

---

## 🚀 **Workflow Guidelines**

### **Claude Code Integration**

#### **Decision Framework for Claude Code Sessions**
When working with Claude Code, use this framework to determine repository usage:

**✅ PUBLIC REPOSITORY** (`tonystoolbox`)
- Feature implementation and bug fixes
- Component development and styling
- Public documentation updates
- Community-facing README improvements
- Open-source patterns and examples
- General technical architecture decisions

**🔐 PRIVATE REPOSITORY** (`tonystoolbox-internal`)
- Business requirements and strategic context
- Competitive analysis and market research
- Financial projections and revenue models
- Customer research and user insights
- Internal roadmap and priority decisions
- Development session logs and context
- Team processes and procedures
- Partnership strategies and negotiations

#### **Session Context Management**
1. **Before Each Session**: Review current project status in `claude/development-context/`
2. **During Session**: Reference both repositories as needed for complete context
3. **After Session**: Update session logs and project status in private repository

### **Daily Development Workflow**

1. **Start Work Session**
   ```bash
   # Development work in public repo
   cd /path/to/tonystoolbox
   
   # Strategy and context in private repo
   cd /path/to/tonystoolbox-internal
   ```

2. **Development Process**
   - **Code changes** → Public repository
   - **Decision rationale** → Private repository
   - **Context preservation** → Private repository

3. **End of Session**
   - Commit public changes with conventional commits
   - Document session context in private repository
   - Update relevant internal documentation

---

## 📁 Repository Structure

```
tonystoolbox-internal/
├── README.md                          # This comprehensive guide
├── .gitignore                         # Security-focused ignore patterns
│
├── business/                          # 💼 BUSINESS INTELLIGENCE
│   ├── financials/                    # Financial projections, revenue models
│   ├── market-analysis/               # Market research, opportunity assessment
│   ├── customer-research/             # User interviews, behavioral analysis
│   └── competitive-intelligence/      # Competitor analysis, positioning
│
├── claude/                           # 🤖 CLAUDE CODE DEVELOPMENT CONTEXT
│   ├── session-logs/                 # Development session histories
│   ├── development-context/          # Project context and requirements
│   ├── prompting-strategies/         # Effective prompts and workflows
│   └── ai-instructions/              # Custom AI instructions and context
│
├── internal-docs/                    # 📋 INTERNAL DOCUMENTATION
│   ├── roadmap-internal.md           # Detailed internal roadmap
│   ├── monetization-strategy.md      # Revenue and pricing strategies
│   ├── partnership-plans.md          # Strategic partnership opportunities
│   ├── team-processes.md             # Internal workflows and procedures
│   └── decision-log.md               # Major decisions and rationale
│
├── configs/                          # ⚙️ CONFIGURATION MANAGEMENT
│   ├── environment-templates/        # Environment setup templates
│   ├── deployment-secrets/           # Secure deployment configurations
│   └── api-configurations/           # Internal API configs and keys
│
└── tools/                            # 🛠️ INTERNAL TOOLING
    ├── internal-automation/          # Business process automation
    └── admin-scripts/                # Management and maintenance scripts
```

---

## 🛡️ **Security Best Practices**

### **Access Control**
- **Repository Access**: Restricted to core team only
- **Branch Protection**: Require reviews for sensitive changes
- **Audit Trail**: Monitor all access and changes

### **Content Security**
- **No API Keys**: Even in private repo - use environment variables
- **Customer Data**: Anonymize all customer information
- **Financial Data**: Encrypt sensitive financial documents

### **Information Classification**
- **🟢 PUBLIC**: Can be shared openly
- **🟡 INTERNAL**: Team-only, non-sensitive
- **🔴 CONFIDENTIAL**: Sensitive business information
- **⚫ RESTRICTED**: Highly sensitive, need-to-know basis

---

## 🎯 **Success Metrics**

This dual-repository strategy is successful when:

- ✅ **Clear Separation**: No confusion about where content belongs
- ✅ **Security Maintained**: No sensitive data in public repository  
- ✅ **Community Growth**: Public repo attracts contributors and users
- ✅ **Business Efficiency**: Internal processes run smoothly
- ✅ **Development Velocity**: Workflow enhances rather than hinders development
- ✅ **Strategic Advantage**: Private insights inform competitive positioning

---

**Remember: When in doubt, keep it private. It's easier to make private content public than to recover from accidentally exposing sensitive information.**

*Last updated: July 2025*

---

*This document is confidential and proprietary to Tony's Toolbox. Distribution outside the authorized team is strictly prohibited.*