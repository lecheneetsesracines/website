// Allow-lists for the URLs that content/ supplies to href and src attributes.
// The association edits content/ on main, so a value here is untrusted until
// one of these helpers accepts it. Each helper returns the trimmed value when it
// is accepted (never re-encoded, so today's URLs reach the DOM byte for byte)
// and undefined when it is rejected.
//
// This module is imported by a client component and by `node --test`: it must
// import nothing and use erasable TypeScript only.

// Browsers delete ASCII tab, CR and LF anywhere in a URL ("java\tscript:" is
// "javascript:"), so a value holding any ASCII control character is rejected
// rather than parsed differently from the browser.
const ASCII_CONTROL = /[\u0000-\u001f\u007f]/

// The scheme grammar of the WHATWG URL standard: a letter, then letters,
// digits, "+", "-" or ".", up to the first ":".
const SCHEME = /^([a-z][a-z0-9+.-]*):/i

const HREF_SCHEMES = new Set(['http', 'https', 'mailto', 'tel'])

const MAP_EMBED_HOST = 'www.google.com'
const MAP_EMBED_PATH = '/maps/embed'

function prepare(url: string | null | undefined): string | undefined {
  if (typeof url !== 'string') {
    return undefined
  }

  let trimmed = url.trim()
  if (trimmed === '' || ASCII_CONTROL.test(trimmed)) {
    return undefined
  }

  return trimmed
}

function schemeOf(url: string): string | undefined {
  return SCHEME.exec(url)?.[1].toLowerCase()
}

// A link href: http:, https:, mailto: or tel:. Relative and
// protocol-relative values are rejected too.
export function safeHref(url: string | null | undefined): string | undefined {
  let value = prepare(url)
  if (value === undefined) {
    return undefined
  }

  let scheme = schemeOf(value)
  return scheme !== undefined && HREF_SCHEMES.has(scheme) ? value : undefined
}

// A mailto: link, and nothing else.
export function safeMailto(url: string | null | undefined): string | undefined {
  let value = prepare(url)
  if (value === undefined) {
    return undefined
  }

  return schemeOf(value) === 'mailto' ? value : undefined
}

// A Google Maps embed: https://www.google.com/maps/embed, with its query or a
// sub-path. The value is parsed rather than prefix-matched, so look-alike
// hosts, credentials, ports and "../" segments cannot pass.
export function safeMapEmbed(
  url: string | null | undefined,
): string | undefined {
  let value = prepare(url)
  if (value === undefined) {
    return undefined
  }

  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return undefined
  }

  let isEmbedPath =
    parsed.pathname === MAP_EMBED_PATH ||
    parsed.pathname.startsWith(`${MAP_EMBED_PATH}/`)

  return parsed.protocol === 'https:' &&
    parsed.hostname === MAP_EMBED_HOST &&
    parsed.port === '' &&
    parsed.username === '' &&
    parsed.password === '' &&
    isEmbedPath
    ? value
    : undefined
}
