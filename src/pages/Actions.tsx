import Layout from '../components/Layout'

export default function Actions() {
  return (
    <Layout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-24">
        <h1 className="mb-4 text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>自动化</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>GitHub Actions 工作流 - 即将推出</p>
      </div>
    </Layout>
  )
}
