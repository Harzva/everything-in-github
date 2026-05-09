# 仓库管理指南

> 学习如何创建、配置和管理 GitHub 仓库。

## 创建仓库

### 通过网页创建
1. 点击右上角 **+** → **New repository**
2. 填写仓库名称和描述
3. 选择公开(Public)或私有(Private)
4. 可选：添加 README、.gitignore、LICENSE

### 通过命令行创建
```bash
# 本地创建并推送到 GitHub
$ mkdir my-project && cd my-project
$ git init
$ echo "# My Project" > README.md
$ git add README.md
$ git commit -m "Initial commit"
$ gh repo create my-project --public --source=. --push
```

## 仓库设置

### 重要配置项

| 设置 | 推荐值 | 说明 |
|------|--------|------|
| **Branch protection** | 启用 | 保护 main 分支 |
| **Require PR reviews** | 1人 | 至少1人审查 |
| **Require status checks** | 启用 | CI 必须通过 |
| **Delete branch on merge** | 启用 | 自动删除已合并分支 |

### 分支保护规则设置
```
Settings → Branches → Add rule → Branch name pattern: main
☑️ Restrict deletions
☑️ Require a pull request before merging
☑️ Require status checks to pass
☑️ Require branches to be up to date before merging
```

## README 模板

```markdown
# 项目名称

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> 项目一句话描述

## 功能特性

- 特性一
- 特性二
- 特性三

## 安装

```bash
npm install
```

## 使用

```bash
npm start
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

[MIT](LICENSE)
```

## SSH 配置

```bash
# 生成 SSH 密钥
$ ssh-keygen -t ed25519 -C "your@email.com"

# 复制公钥到剪贴板
$ cat ~/.ssh/id_ed25519.pub

# 在 GitHub → Settings → SSH and GPG keys → New SSH key 中添加

# 测试连接
$ ssh -T git@github.com
```

## 许可证选择

| 许可证 | 适用场景 |
|--------|---------|
| **MIT** | 最宽松，允许商业使用 |
| **Apache-2.0** | 保留专利授权 |
| **GPL-3.0** | 开源传染性强 |
| **BSD-3-Clause** | 简洁宽松 |

---

> [← Git 基础](git-basics.md) | [→ 协作工作流](../collaboration/pull-requests.md)
