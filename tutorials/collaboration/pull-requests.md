# Pull Request 指南

> Pull Request（PR）是 GitHub 协作开发的核心机制。

## 什么是 Pull Request？

PR 是一种请求将代码从一个分支合并到另一个分支的机制，提供了：
- 代码审查（Code Review）
- 讨论和反馈
- 自动化检查（CI/CD）
- 变更历史记录

## 创建 PR 的流程

### 1. 创建功能分支
```bash
$ git checkout -b feature/new-feature
```

### 2. 开发和提交
```bash
$ git add .
$ git commit -m "feat: 添加新功能"
$ git push -u origin feature/new-feature
```

### 3. 在 GitHub 上创建 PR
1. 访问仓库页面
2. 点击 **Compare & pull request**
3. 填写标题和描述
4. 选择 Reviewer
5. 点击 **Create pull request**

## PR 描述模板

```markdown
## 描述
简要描述这个 PR 做了什么

## 变更类型
- [ ] 修复 Bug
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构

## 测试
- [ ] 单元测试通过
- [ ] 手动测试通过

## 截图
（如适用，添加截图）

## 相关 Issue
Closes #123
```

## 代码审查最佳实践

### 作为提交者
- 保持 PR 小而专注
- 写清晰的描述
- 及时响应反馈
- 确保 CI 通过

### 作为审查者
- 审查代码逻辑
- 检查命名规范
- 验证测试覆盖
- 提供建设性反馈

## PR 与 Issue 关联

```markdown
# 在 PR 描述中使用关键词自动关闭 Issue
Closes #123        # 合并时关闭 Issue
Fixes #123         # 同上
Resolves #123      # 同上
Related to #123    # 关联但不关闭
```

## Draft PR

 Draft PR 用于分享未完成的工作：
- 标记为 **Draft** 表示还在开发中
- 完成后点击 **Ready for review**
- 适合早期获取反馈

---

> [← 仓库管理](../basics/repository-management.md) | [→ Issues 管理](issues.md)
