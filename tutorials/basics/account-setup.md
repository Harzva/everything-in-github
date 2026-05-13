# 账户与设置

参考来源：[GitHub Docs 入门](https://docs.github.com/zh/get-started)、[菜鸟教程：Github 简明教程](https://www.runoob.com/w3cnote/git-guide.html)。

## 基础设置

1. 注册 GitHub 账号并验证邮箱。
2. 设置头像、简介、所在地区和个人链接。
3. 开启双因素认证。
4. 添加 SSH Key。

## Git 身份

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global init.defaultBranch main
```

## SSH Key

```bash
ssh-keygen -t ed25519 -C "your@email.com"
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com
```

---

> 相关教程：[Git 基础操作](git-basics.md)
