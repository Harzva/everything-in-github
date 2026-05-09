# Git 基础操作

> Git 是分布式版本控制系统，是 GitHub 的核心基础。

## 安装 Git

```bash
# macOS
$ brew install git

# Ubuntu/Debian
$ sudo apt-get install git

# Windows
# 下载 https://git-scm.com/download/win
```

## 基础配置

```bash
$ git config --global user.name "你的名字"
$ git config --global user.email "your@email.com"
$ git config --global init.defaultBranch main
```

## 核心工作流程

```
工作目录 → git add → 暂存区 → git commit → 本地仓库 → git push → 远程仓库
```

## 常用命令

### 仓库操作
```bash
$ git init                      # 初始化仓库
$ git clone <url>               # 克隆远程仓库
$ git remote -v                 # 查看远程仓库
$ git remote add origin <url>   # 添加远程仓库
```

### 提交操作
```bash
$ git add <file>                # 添加指定文件
$ git add .                     # 添加所有更改
$ git commit -m "描述"          # 提交更改
$ git commit -am "描述"         # 添加并提交
```

### 分支管理
```bash
$ git branch                    # 列出分支
$ git branch <name>             # 创建分支
$ git checkout <name>           # 切换分支
$ git checkout -b <name>        # 创建并切换
$ git merge <name>              # 合并分支
$ git branch -d <name>          # 删除分支
```

### 查看状态
```bash
$ git status                    # 查看当前状态
$ git log                       # 查看提交历史
$ git log --oneline             # 简洁历史
$ git diff                      # 查看更改差异
```

## .gitignore 模板

```gitignore
# 依赖
node_modules/
vendor/

# 构建输出
dist/
build/
*.min.js

# 环境变量
.env
.env.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

## GitHub Flow 工作流

1. 从 main 创建功能分支
2. 在分支上开发和提交
3. 推送到远程仓库
4. 创建 Pull Request
5. 代码审查和讨论
6. 合并到 main

```bash
# 完整示例
$ git checkout -b feature/login
$ git add .
$ git commit -m "feat: 添加登录功能"
$ git push -u origin feature/login
# 然后在 GitHub 上创建 Pull Request
```

---

> [← 返回入门教程](getting-started.md) | [→ 仓库管理](repository-management.md)
