// Vercel's preview toolbar loads from vercel.live. VERCEL_ENV is read at
// build time, so only preview deployments allow it.
const previewToolbar =
  process.env.VERCEL_ENV === 'preview' ? ' https://vercel.live' : ''

// Enforced, not report-only: nothing collects the reports. Scripts need
// 'unsafe-inline' because Next's RSC payload and next-themes are inline
// scripts, and nonces would render every static page dynamically.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${previewToolbar}`,
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
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  outputFileTracingIncludes: {
    '/sections/*': ['./src/app/sections/**/*.tsx'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
