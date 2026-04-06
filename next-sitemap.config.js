// モデルの順序（generateStaticParams と同じ順番）
const MODEL_ORDER = ['claude', 'chatgpt', 'grok', 'perplexity', 'gemini'];

// compareスラグがcanonical方向かどうか判定（インデックス順で a < b のもののみ残す）
function isCanonicalCompare(slug) {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return true;
  const [, a, b] = match;
  const ai = MODEL_ORDER.indexOf(a);
  const bi = MODEL_ORDER.indexOf(b);
  if (ai === -1 || bi === -1) return true; // 未知モデルは残す
  return ai < bi;
}

module.exports = {
  siteUrl: 'https://www.aierabi.jp',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  transform: async (config, path) => {
    // /category（単数形）はsitemapから除外（/categories/ 複数形のみ残す）
    if (path === '/category' || path.startsWith('/category/')) {
      return null;
    }
    // compareは正方向のみ（逆順URLを除外）
    if (path.startsWith('/compare/')) {
      const slug = path.slice('/compare/'.length);
      if (slug && !isCanonicalCompare(slug)) {
        return null;
      }
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
