# GitHub 入门教程

> 作为一名开发者，GitHub 上面有很多东西值得关注学习。本教程面向刚刚接触 GitHub 的用户，一步步学习如何使用 GitHub。

## 什么是 GitHub？

GitHub 是全球最大的代码托管平台，基于 Git 版本控制系统，提供：
- **代码托管** — 存储、管理和分享代码
- **协作开发** — 多人协作、代码审查
- **项目管理** — Issues、Projects、Milestones
- **CI/CD** — GitHub Actions 自动化工作流
- **社区** — 开源项目、技术交流

## 第一步：创建账号

1. 访问 [github.com](https://github.com)
2. 点击 **Sign up** 按钮
3. 输入邮箱、设置密码、选择用户名
4. 完成邮箱验证

## 第二步：了解界面

| 区域 | 说明 |
|------|------|
| **Dashboard** | 首页动态流，显示关注项目的更新 |
| **Repositories** | 你的代码仓库列表 |
| **Explore** | 发现热门项目和主题 |
| **Profile** | 个人主页，展示你的贡献 |

## 第三步：创建第一个仓库

```bash
# 在网页上创建仓库后，在本地初始化
$ git init
$ git add .
$ git commit -m "first commit"
$ git branch -M main
$ git remote add origin https://github.com/你的用户名/仓库名.git
$ git push -u origin main
```

## 第四步：Fork 与 Clone

| 操作 | 说明 | 命令 |
|------|------|------|
| **Fork** | 复制别人的仓库到自己的账号 | 网页上点击 Fork 按钮 |
| **Clone** | 下载仓库到本地 | `git clone 仓库地址` |
| **Pull** | 拉取最新代码 | `git pull origin main` |

## 第五步：提交更改

```bash
# 修改文件后
$ git add .                    # 添加所有更改
$ git commit -m "描述信息"      # 提交更改
$ git push origin main         # 推送到远程
```

## 常用 Git 命令速查

| 命令 | 说明 |
|------|------|
| `git status` | 查看当前状态 |
| `git log` | 查看提交历史 |
| `git branch` | 查看/创建分支 |
| `git checkout -b 分支名` | 创建并切换分支 |
| `git merge 分支名` | 合并分支 |
| `git stash` | 暂存更改 |

## 延伸阅读

- [GitHub 官方入门指南](https://docs.github.com/zh/get-started)
- [GitHub Skills 交互式学习](https://skills.github.com/)
- [Git 基础教程](git-basics.md)
- [仓库管理指南](repository-management.md)
- [xirong 的 GitHub 使用指南](https://github.com/xirong/my-git/blob/master/how-to-use-github.md)
