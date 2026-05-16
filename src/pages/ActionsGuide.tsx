import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, KeyRound, Play, Shield, Workflow, Zap } from 'lucide-react';
import Layout from '../components/Layout';

const topicWorkflow = `name: Update topic data

on:
  schedule:
    - cron: "0 */6 * * *"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run crawl

      - name: Commit data changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(data): update Just-DDL items"
          file_pattern: data/items.json

      - name: Notify Just-DDL hub
        env:
          HUB_DISPATCH_TOKEN: \${{ secrets.HUB_DISPATCH_TOKEN }}
        run: |
          curl -fsSL -X POST \\
            -H "Accept: application/vnd.github+json" \\
            -H "Authorization: Bearer $HUB_DISPATCH_TOKEN" \\
            -H "X-GitHub-Api-Version: 2026-03-10" \\
            https://api.github.com/repos/Just-Agent/just-ddl/dispatches \\
            -d '{"event_type":"topic-updated","client_payload":{"topic":"ddl","source_repo":"\${{ github.repository }}","data_file":"data/items.json"}}'`;

const hubWorkflow = `name: Sync topic data

on:
  repository_dispatch:
    types: [topic-updated]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  sync-build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "topic=\${{ github.event.client_payload.topic }}"
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run sync:topics
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4`;

const curlExample = `curl -fsSL -X POST \\
  -H "Accept: application/vnd.github+json" \\
  -H "Authorization: Bearer $HUB_DISPATCH_TOKEN" \\
  -H "X-GitHub-Api-Version: 2026-03-10" \\
  https://api.github.com/repos/Just-Agent/just-ddl/dispatches \\
  -d '{
    "event_type": "topic-updated",
    "client_payload": {
      "topic": "ddl",
      "source_repo": "Just-Agent/just-ddl-topic",
      "data_file": "data/items.json"
    }
  }'`;

const ghExample = `GH_TOKEN="$HUB_DISPATCH_TOKEN" gh api \\
  --method POST \\
  -H "Accept: application/vnd.github+json" \\
  -H "X-GitHub-Api-Version: 2026-03-10" \\
  /repos/Just-Agent/just-ddl/dispatches \\
  -f event_type=topic-updated \\
  -f client_payload[topic]=ddl \\
  -f client_payload[source_repo]=Just-Agent/just-ddl-topic \\
  -f client_payload[data_file]=data/items.json`;

const concepts = [
  ['workflow', '保存在 .github/workflows/*.yml 的自动化流程'],
  ['job', '一组在同一个 runner 上执行的步骤'],
  ['step', 'job 中的单个命令或 action 调用'],
  ['action', '可复用的自动化单元，例如 actions/checkout@v4'],
  ['runner', '执行 job 的机器，例如 ubuntu-latest'],
  ['event', '触发 workflow 的事件，例如 push、schedule、repository_dispatch'],
];

const events = [
  ['push', '代码推送后自动 CI/CD', '适合主分支构建和部署'],
  ['pull_request', 'PR 检查和预览', '来自 fork 的 PR 默认读不到敏感 secrets'],
  ['workflow_dispatch', '人工手动触发', '适合维护任务和带输入参数的刷新'],
  ['schedule', '定时任务', 'cron 使用 UTC'],
  ['repository_dispatch', '外部系统或另一个仓库触发', '跨仓库触发需要目标仓库授权 token'],
];

const troubleshooting = [
  ['返回 204 但 Hub 没跑', '检查 Hub workflow 是否在默认分支，event_type 是否等于 types 中的 topic-updated'],
  ['API 401/403', '检查 fine-grained PAT 是否过期，是否选择 Just-Agent/just-ddl，并授予 Contents write'],
  ['secrets 读不到', '确认 secret 配在运行 workflow 的仓库，不要在不可信 fork PR 中依赖 secret'],
  ['Pages 没部署', '检查 pages: write、id-token: write、dist 路径和 Actions 部署日志'],
  ['GITHUB_TOKEN 提交后没有触发二次 workflow', '这是 GitHub 的递归触发限制；把构建部署放同一 workflow 或显式 dispatch'],
];

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden', background: 'rgba(0,0,0,0.24)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
        <span>{label}</span>
        <span>copy-ready</span>
      </div>
      <pre style={{ margin: 0, padding: '16px', overflowX: 'auto', fontSize: '0.78rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ActionsGuide() {
  return (
    <Layout>
      <section style={{ padding: '112px 24px 44px', background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(6,182,212,0.08) 55%, rgba(139,92,246,0.1))' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <a href="#/tutorials" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>教程 / GitHub Actions 自动化</a>
            <h1 style={{ marginTop: '18px', fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05, fontWeight: 900 }}>
              GitHub Actions 与 repository_dispatch 实战
            </h1>
            <p style={{ maxWidth: '760px', marginTop: '18px', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
              从 workflow、job、step、runner 到跨仓库 dispatch、token、secrets 和 Pages 部署排障。页面使用 Just-DDL 作为真实案例：子专题更新 data/items.json 后通知 Hub 仓库同步、构建并发布站点。
            </p>
          </motion.div>
        </div>
      </section>

      <main style={{ maxWidth: '1180px', margin: '0 auto', padding: '42px 24px 84px' }}>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '14px', marginBottom: '42px' }}>
          {[
            { icon: Workflow, title: 'Actions 基础', desc: 'workflow / job / step / action / runner / event' },
            { icon: Play, title: '触发事件', desc: 'push、PR、schedule、workflow_dispatch、repository_dispatch' },
            { icon: KeyRound, title: '跨仓库权限', desc: 'GITHUB_TOKEN、PAT、fine-grained PAT 与 secrets' },
            { icon: Zap, title: 'Just-DDL 案例', desc: '子专题 crawler 更新数据，Hub 汇总并部署 Pages' },
          ].map((item) => (
            <div key={item.title} style={{ padding: '20px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <item.icon size={22} style={{ color: 'var(--accent-amber)', marginBottom: '12px' }} />
              <h2 style={{ fontSize: '1rem', marginBottom: '6px' }}>{item.title}</h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '34px' }}>
          <article>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>核心概念</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '10px' }}>
              {concepts.map(([name, desc]) => (
                <div key={name} style={{ padding: '14px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}>{name}</strong>
                  <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>触发事件怎么选</h2>
            <div style={{ display: 'grid', gap: '10px' }}>
              {events.map(([event, scene, note]) => (
                <div key={event} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1.2fr', gap: '14px', padding: '14px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <code style={{ color: 'var(--accent-amber)' }}>{event}</code>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>{scene}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{note}</span>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>repository_dispatch 原理</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              `repository_dispatch` 是目标仓库接收自定义事件的 REST API。调用方发送 `POST /repos/Just-Agent/just-ddl/dispatches`，请求体中的 `event_type` 必须和 Hub workflow 的 `types` 匹配。跨仓库调用会写目标仓库事件，所以源仓库需要保存一个对 Hub 仓库有写权限的 fine-grained PAT。
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '12px', marginTop: '16px' }}>
              {['子专题 update-data.yml 定时或手动运行', 'crawler 更新 data/items.json 并提交', '调用 Just-Agent/just-ddl dispatches API', 'Hub sync-topic-data.yml 监听 topic-updated', 'Hub 同步所有子专题数据并部署 Pages'].map((step, index) => (
                <div key={step} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
                  <span style={{ color: 'var(--accent-amber)', fontWeight: 800 }}>{index + 1}</span>
                  <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.6 }}>{step}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>可复制 YAML 示例</h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <CodeBlock label="子专题仓库 .github/workflows/update-data.yml" code={topicWorkflow} />
              <CodeBlock label="Hub 仓库 .github/workflows/sync-topic-data.yml" code={hubWorkflow} />
              <CodeBlock label="curl repository_dispatch" code={curlExample} />
              <CodeBlock label="gh api repository_dispatch" code={ghExample} />
            </div>
          </article>

          <article>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>权限与排障</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '12px' }}>
              <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Shield size={20} style={{ color: 'var(--accent-emerald)', marginBottom: '10px' }} />
                <h3 style={{ marginBottom: '8px' }}>token 与 secrets</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.7 }}>
                  当前仓库内自动化优先用 `GITHUB_TOKEN`。跨仓库 dispatch 推荐 fine-grained PAT，只授权 `Just-Agent/just-ddl`，并保存为子仓库 secret `HUB_DISPATCH_TOKEN`。
                </p>
              </div>
              <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <GitBranch size={20} style={{ color: 'var(--accent-cyan)', marginBottom: '10px' }} />
                <h3 style={{ marginBottom: '8px' }}>workflow 不触发</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.7 }}>
                  确认 workflow 在默认分支，`event_type` 和 `types` 一致；如果 `GITHUB_TOKEN` 提交没有触发二次 workflow，应改用同一 workflow 串联或显式 dispatch。
                </p>
              </div>
            </div>
            <div style={{ marginTop: '16px', display: 'grid', gap: '10px' }}>
              {troubleshooting.map(([problem, fix]) => (
                <div key={problem} style={{ padding: '14px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{problem}</strong>
                  <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>{fix}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>仓库文档与官方参考</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '12px' }}>
              {[
                ['完整 Markdown 教程', 'docs/github-actions-repository-dispatch.md', 'https://github.com/Harzva/everything-in-github/blob/main/docs/github-actions-repository-dispatch.md'],
                ['工作流基础文档', 'docs/github-actions-workflows.md', 'https://github.com/Harzva/everything-in-github/blob/main/docs/github-actions-workflows.md'],
                ['Just-DDL 示例目录', 'examples/just-ddl-repository-dispatch', 'https://github.com/Harzva/everything-in-github/tree/main/examples/just-ddl-repository-dispatch'],
                ['GitHub Actions Docs', 'docs.github.com/en/actions', 'https://docs.github.com/en/actions'],
                ['repository_dispatch API', 'REST create dispatch event', 'https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event'],
                ['GitHub Skills', 'skills.github.com', 'https://skills.github.com/'],
              ].map(([title, desc, href]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  <span>
                    <strong style={{ display: 'block', marginBottom: '5px' }}>{title}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{desc}</span>
                  </span>
                  <ExternalLink size={15} style={{ color: 'var(--accent)' }} />
                </a>
              ))}
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}
