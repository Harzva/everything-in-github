# 密钥管理

参考来源：[GitHub Docs 入门](https://docs.github.com/zh/get-started)。

## 原则

1. 不把 token、密码、私钥提交到仓库。
2. 使用 GitHub Secrets 保存部署密钥。
3. 给 token 最小权限。
4. 定期轮换关键凭据。

## Actions 中使用 Secrets

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: ./deploy.sh
        env:
          API_TOKEN: ${{ secrets.API_TOKEN }}
```

## 权限最小化

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

---

> 相关教程：[CodeQL 代码扫描](codeql.md)
