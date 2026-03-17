# AI Developer Agent: GitHub Issues & Project Management Guide

## 🎯 Core Directive
As an AI developer agent working on this project, your **primary administrative responsibility** is to maintain perfect synchrony between the codebase and our GitHub Issues/Milestones. Every piece of work must be tracked, documented, and properly linked in GitHub.

**Before writing code, during development, and after completing a task, you MUST interact with GitHub Issues.**

## 📋 The Standard Workflow

Every time you begin a new session or take on a new task, follow this strict workflow:

### 1. Discovery (Before Coding)
- **Query Existing Issues:** Search for existing issues related to the user's request using the GitHub MCP search tools.
- **Check Milestones:** Identify which milestone the current work belongs to. 
- **Create Issue (If Missing):** If the user asks for a new feature, bug fix, or refactor that does not have an open issue, **create one immediately** before writing code.
  - Include a clear title and a descriptive body with tangible Acceptance Criteria.
  - Assign relevant labels (e.g., `enhancement`, `bug`, `documentation`, `in-progress`).
  - Assign the issue to the current active milestone.

### 2. Execution (During Coding)
- **Branch Naming:** Create sub-branches linking to the issue number (e.g., `feature/12-add-login-screen` or `fix/34-header-alignment`).
- **Commit Messages:** Reference the issue number in commit messages (e.g., `Add user authentication (#12)`).

### 3. Closure & Updates (After Coding)
- **Log Progress:** As you make progress, add comments to the issue summarizing technical decisions, challenges, or partial completions. Never leave an active issue silent.
- **Pull Requests:** When creating a PR, include closing keywords in the PR description (e.g., `Closes #12` or `Resolves #34`) so the issue automatically closes upon merge.
- **Milestone Tracking:** Keep an eye on the milestone's completion rate.

## 🛠️ Required MCP Tool Usage
You must proactively utilize your GitHub MCP tools:
- `mcp_github-mcp-server_list_issues` & `mcp_github-mcp-server_search_issues`: To find relevant existing work context.
- `mcp_github-mcp-server_issue_write`: To create new issues or update existing ones (change state, add labels).
- `mcp_github-mcp-server_add_issue_comment`: To log progress, decisions, and outcomes directly on the issue thread.

## 📝 Issue Template Standard
When creating a new issue automatically, format the body as follows:

```markdown
### Description
[A clear, objective description of the feature, bug, or task and its purpose]

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Technical Context & AI Notes
[Any relevant files, architectural decisions, potential constraints, or notes for the AI agent handling the implementation]
```

## ⚠️ Non-Negotiables
1. **Never work in stealth mode.** If you modify code, there must be a paper trail in GitHub Issues.
2. **Never assume an issue exists.** Always verify first.
3. **Be Proactive.** You do not need to ask permission to create an issue if the user's request clearly dictates new work. Create it, link it, and inform the user.

---
*Note to the AI Agent: Acknowledge these instructions when provided at the start of a session and immediately begin by matching the user's initial request to the current GitHub Issues board.*
