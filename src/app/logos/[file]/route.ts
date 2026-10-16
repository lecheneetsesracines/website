import fs from 'node:fs/promises'
import path from 'node:path'

import {
  isLogoFile,
  listLogoFiles,
  logoContentType,
  logosDirectory,
} from '@/lib/financeurs'

// Serves content/logos/ (or CONTENT_DIR/logos/) as static files at build
// time, so the funders' logos live next to the content that names them.
export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return (await listLogoFiles()).map((file) => ({ file }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  let { file } = await params

  if (!isLogoFile(file)) {
    return new Response(null, { status: 404 })
  }

  let body = await fs.readFile(path.join(logosDirectory, file))

  return new Response(new Uint8Array(body), {
    headers: { 'Content-Type': logoContentType(file) },
  })
}
