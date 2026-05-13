# GitHub Pages 自定义域名

参考来源：[GitHub Docs 入门](https://docs.github.com/zh/get-started)。

## 准备工作

你需要拥有一个域名，并能修改 DNS 记录。GitHub Pages 支持 apex domain 和子域名。

## 子域名示例

如果要绑定 `docs.example.com`：

1. 在 DNS 服务商添加 CNAME 记录：

```text
docs.example.com -> USERNAME.github.io
```

2. 在仓库 **Settings -> Pages -> Custom domain** 填入：

```text
docs.example.com
```

3. 等待 DNS 生效后勾选 **Enforce HTTPS**。

## 仓库中的 CNAME 文件

```text
docs.example.com
```

## 常见问题

| 问题 | 排查 |
| --- | --- |
| 域名打不开 | 检查 DNS 是否生效 |
| HTTPS 不能勾选 | 等待证书签发，或确认 DNS 指向正确 |
| 访问到旧页面 | 清理浏览器缓存，等待 CDN 更新 |

---

> 相关教程：[快速部署个人网站](quickstart.md)
