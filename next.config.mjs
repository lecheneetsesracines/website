// Vercel's preview toolbar loads from vercel.live. VERCEL_ENV is read at
// build time, so only preview deployments allow it.
const previewToolbar =
  process.env.VERCEL_ENV === 'preview' ? ' https://vercel.live' : ''

// `next dev` only: React uses eval in development to rebuild server error
// stacks in the browser. `next build` and `next start` run in production
// mode, so the deployed policy never carries it.
const devEval = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''

// Enforced, not report-only: nothing collects the reports. Scripts need
// 'unsafe-inline' because Next's RSC payload and next-themes are inline
// scripts, and nonces would render every static page dynamically.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devEval}${previewToolbar}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${previewToolbar}`,
  // The Google Maps embed on /contact.
  `frame-src https://www.google.com${previewToolbar}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 16's `next dev` writes its own block into AGENTS.md and CLAUDE.md
  // when an AI coding agent runs it; here both files are the project's agent
  // roster and instructions, maintained by hand.
  agentRules: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  outputFileTracingIncludes: {
    '/sections/*': ['./src/app/sections/**/*.tsx'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
