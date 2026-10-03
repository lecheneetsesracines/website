import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { safeHref, safeMailto, safeMapEmbed } from './safeUrl.ts'

// The URL values in today's content, copied verbatim on 2026-10-02. They are
// hard-coded on purpose: the association edits content/ on main, and a content
// edit must never fail this suite.
const CONTACT_ADDRESS_HREF =
  'https://www.google.com/maps?rlz=1C5CHFA_enFR977FR977&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQRRgnGDsyDAgCECMYJxiABBiKBTINCAMQLhivARjHARiABDIKCAQQABiABBiiBDIHCAUQABjvBTIKCAYQABiABBiiBDIGCAcQRRg80gEHMjEzajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=fr&sa=X&geocode=KaEvb0Gc-uVHMVYUQ6j61y9N&daddr=5+Pl.+Praslin,+77000+Melun'
const CONTACT_PHONE_HREF = 'tel:+33(0)6-95-60-52-21'
const CONTACT_EMAIL_HREF = 'mailto:lechene77familles@gmail.com'
const CONTACT_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2641.8169636297253!2d2.655250877706947!3d48.53673937129036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5fa9c416f2fa1%3A0x4d2fd7faa8431456!2sLE%20CH%C3%8ANE%20ET%20SES%20RACINES!5e0!3m2!1sfr!2sfr!4v1746603563142!5m2!1sfr!2sfr'
const HOME_PHONE_HREF = 'tel:06-95-60-52-21'
const HOME_EMAIL_HREF = 'mailto:lechene77familles@gmail.com'

// Values every helper must reject: script and data schemes, whatever their
// case or surrounding whitespace, and anything that is not an absolute URL.
const HOSTILE = [
  'javascript:alert(1)',
  'JaVaScRiPt:alert(1)',
  '  javascript:alert(1)',
  '\njavascript:alert(1)',
  'java\tscript:alert(1)',
  'java\nscript:alert(1)',
  'java\rscript:alert(1)',
  '\u0001javascript:alert(1)',
  'data:text/html,<script>alert(1)</script>',
  'DATA:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
  'vbscript:msgbox(1)',
  'VBScript:msgbox(1)',
  'file:///etc/passwd',
  'blob:https://www.google.com/0b6c1c8e',
  '//evil.example',
  '/contact',
  'contact',
  '#',
  '',
  '   ',
]

describe('safeHref', () => {
  test('accepts the hrefs in today’s content, byte for byte', () => {
    assert.equal(safeHref(CONTACT_ADDRESS_HREF), CONTACT_ADDRESS_HREF)
    assert.equal(safeHref(CONTACT_PHONE_HREF), CONTACT_PHONE_HREF)
    assert.equal(safeHref(CONTACT_EMAIL_HREF), CONTACT_EMAIL_HREF)
    assert.equal(safeHref(HOME_PHONE_HREF), HOME_PHONE_HREF)
    assert.equal(safeHref(HOME_EMAIL_HREF), HOME_EMAIL_HREF)
  })

  test('accepts http, https, mailto and tel in any case', () => {
    assert.equal(safeHref('http://example.org/'), 'http://example.org/')
    assert.equal(
      safeHref('HTTPS://example.org/a?b=c'),
      'HTTPS://example.org/a?b=c',
    )
    assert.equal(safeHref('MailTo:a@example.org'), 'MailTo:a@example.org')
    assert.equal(safeHref('TEL:0102030405'), 'TEL:0102030405')
  })

  test('returns the value trimmed, without re-encoding it', () => {
    assert.equal(
      safeHref('  https://example.org/é ?q=a b  '),
      'https://example.org/é ?q=a b',
    )
    assert.equal(safeHref('\ttel:06-95-60-52-21\n'), 'tel:06-95-60-52-21')
  })

  test('rejects every hostile or non-absolute value', () => {
    for (const value of HOSTILE) {
      assert.equal(safeHref(value), undefined, JSON.stringify(value))
    }
  })

  test('rejects an allowed scheme that hides a control character', () => {
    assert.equal(safeHref('https://exa\tmple.org/'), undefined)
    assert.equal(safeHref('mailto:a@example.org\u0000'), undefined)
    assert.equal(safeHref('tel:01\u007f02'), undefined)
  })

  test('rejects schemes outside the allow-list', () => {
    assert.equal(safeHref('ftp://example.org/'), undefined)
    assert.equal(safeHref('sms:0102030405'), undefined)
    assert.equal(safeHref('httpx://example.org/'), undefined)
    assert.equal(safeHref('https-evil:example.org'), undefined)
  })

  test('returns undefined for a missing value', () => {
    assert.equal(safeHref(undefined), undefined)
    assert.equal(safeHref(null), undefined)
  })
})

describe('safeMailto', () => {
  test('accepts the email hrefs in today’s content, byte for byte', () => {
    assert.equal(safeMailto(CONTACT_EMAIL_HREF), CONTACT_EMAIL_HREF)
    assert.equal(safeMailto(HOME_EMAIL_HREF), HOME_EMAIL_HREF)
  })

  test('accepts mailto in any case, trimmed', () => {
    assert.equal(safeMailto('MAILTO:a@example.org'), 'MAILTO:a@example.org')
    assert.equal(
      safeMailto('  mailto:a@example.org?cc=b@example.org '),
      'mailto:a@example.org?cc=b@example.org',
    )
  })

  test('rejects every other scheme, including the ones safeHref allows', () => {
    assert.equal(safeMailto(CONTACT_ADDRESS_HREF), undefined)
    assert.equal(safeMailto('http://example.org/'), undefined)
    assert.equal(safeMailto(CONTACT_PHONE_HREF), undefined)
    assert.equal(safeMailto('mailtox:a@example.org'), undefined)
  })

  test('rejects every hostile or non-absolute value', () => {
    for (const value of [...HOSTILE, 'mail\tto:a@example.org']) {
      assert.equal(safeMailto(value), undefined, JSON.stringify(value))
    }
  })

  test('returns undefined for a missing value', () => {
    assert.equal(safeMailto(undefined), undefined)
    assert.equal(safeMailto(null), undefined)
  })
})

describe('safeMapEmbed', () => {
  test('accepts the map embed URL in today’s content, byte for byte', () => {
    assert.equal(safeMapEmbed(CONTACT_MAP_EMBED_URL), CONTACT_MAP_EMBED_URL)
  })

  test('accepts the embed endpoint and its sub-paths, trimmed', () => {
    assert.equal(
      safeMapEmbed(' https://www.google.com/maps/embed?pb=x '),
      'https://www.google.com/maps/embed?pb=x',
    )
    assert.equal(
      safeMapEmbed('https://www.google.com/maps/embed/v1/place?q=Melun'),
      'https://www.google.com/maps/embed/v1/place?q=Melun',
    )
    assert.equal(
      safeMapEmbed('HTTPS://WWW.GOOGLE.COM/maps/embed?pb=x'),
      'HTTPS://WWW.GOOGLE.COM/maps/embed?pb=x',
    )
  })

  test('rejects look-alike and other hosts', () => {
    for (const value of [
      'https://www.google.com.evil.com/maps/embed?pb=x',
      'https://evil.com/?https://www.google.com/maps/embed',
      'https://evil.com/#https://www.google.com/maps/embed',
      'https://www.google.com@evil.com/maps/embed',
      'https://user:pass@www.google.com/maps/embed',
      'https://maps.google.com/maps/embed?pb=x',
      'https://google.com/maps/embed?pb=x',
      'https://www.google.fr/maps/embed?pb=x',
      'https://www.google.com:8443/maps/embed?pb=x',
    ]) {
      assert.equal(safeMapEmbed(value), undefined, value)
    }
  })

  test('rejects http and protocol-relative URLs', () => {
    assert.equal(
      safeMapEmbed('http://www.google.com/maps/embed?pb=x'),
      undefined,
    )
    assert.equal(safeMapEmbed('//www.google.com/maps/embed?pb=x'), undefined)
  })

  test('rejects Google URLs that are not the embed endpoint', () => {
    for (const value of [
      'https://www.google.com/maps?q=x',
      CONTACT_ADDRESS_HREF,
      'https://www.google.com/maps/embedded?pb=x',
      'https://www.google.com/maps/embed/../../search?q=x',
      'https://www.google.com/',
    ]) {
      assert.equal(safeMapEmbed(value), undefined, value)
    }
  })

  test('rejects every hostile or non-absolute value', () => {
    for (const value of [
      ...HOSTILE,
      'javascript://www.google.com/maps/embed%0aalert(1)',
      'data:text/html,https://www.google.com/maps/embed',
      'https://www.google.com/maps/em\tbed?pb=x',
    ]) {
      assert.equal(safeMapEmbed(value), undefined, JSON.stringify(value))
    }
  })

  test('returns undefined for a missing value', () => {
    assert.equal(safeMapEmbed(undefined), undefined)
    assert.equal(safeMapEmbed(null), undefined)
  })
})
