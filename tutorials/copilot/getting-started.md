# GitHub Copilot 入门指南

> GitHub Copilot 是你的 AI 编程助手，能够根据上下文自动生成代码建议。

## 什么是 Copilot？

Copilot 是由 GitHub 和 OpenAI 联合开发的 AI 代码补全工具：
- **代码补全** — 根据注释和上下文生成代码
- **Copilot Chat** — 交互式 AI 编程助手
- **多语言支持** — Python、JavaScript、TypeScript、Go 等
- **IDE 集成** — VS Code、JetBrains、Vim、Neovim

## 订阅计划

| 计划 | 价格 | 适用对象 |
|------|------|---------|
| **Copilot Individual** | $10/月 或 $100/年 | 个人开发者 |
| **Copilot Business** | $19/用户/月 | 团队和组织 |
| **Copilot Enterprise** | $39/用户/月 | 大型企业 |
| **学生免费** | $0 | 认证学生 |

## 安装配置

### VS Code
1. 打开 Extensions 面板
2. 搜索 "GitHub Copilot"
3. 点击 Install
4. 登录 GitHub 账号

### JetBrains IDE
1. 打开 Settings → Plugins
2. 搜索 "GitHub Copilot"
3. 重启 IDE
4. 点击工具栏 Copilot 图标登录

## 基础使用

### 代码补全
```python
# 输入注释，按 Tab 接受建议
# 计算两个数的和
def add_numbers(a, b):  # Copilot 会自动补全函数体
    return a + b
```

### Copilot Chat
1. 打开侧边栏的 Copilot Chat
2. 输入自然语言问题
3. 获得代码建议和解释

**示例对话：**
```
你: 如何写一个快速排序？
Copilot: （生成完整代码 + 解释）

你: 解释这段代码
Copilot: （逐行解释代码逻辑）

你: 优化这个函数的性能
Copilot: （提供优化方案）
```

## 快捷键

| 操作 | 快捷键 |
|------|--------|
| 接受建议 | Tab |
| 拒绝建议 | Esc |
| 查看下一个建议 | Alt + ] |
| 查看上一个建议 | Alt + [ |
| 打开 Copilot Chat | Ctrl + Shift + I |
| 内联聊天 | Ctrl + I |

## 最佳实践

### ✅ 好的用法
- 写清晰的注释描述意图
- 审查生成的代码
- 将复杂任务分解为小步骤
- 使用 Copilot 学习新语言

### ❌ 避免的做法
- 盲目接受所有建议
- 在敏感代码中使用（密码、密钥）
- 不测试生成的代码
- 提交包含个人信息的提示

## 隐私和安全

- Copilot 不会使用私有代码训练
- Business/Enterprise 计划有更好的隐私保护
- 避免在提示中包含敏感信息

---

> [← 安全教程](../security/dependabot.md) | [→ 认证体系](../certifications/README.md)
