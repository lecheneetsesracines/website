import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { after, before, describe, test } from 'node:test'

import {
  isLogoFile,
  listLogoFiles,
  loadFinanceurs,
  logoContentType,
  parseFinanceurs,
} from './financeurs.ts'

// The logos are written to a temporary directory: the association edits
// content/logos/ on main, and a content edit must never fail this suite.
let directory: string

before(async () => {
  directory = await fs.mkdtemp(path.join(os.tmpdir(), 'financeurs-'))
  await fs.writeFile(
    path.join(directory, 'caf.svg'),
    '<svg xmlns="http://www.w3.org/2000/svg" width="93" height="91"></svg>',
  )
  await fs.writeFile(path.join(directory, 'broken.png'), 'not an image')
  await fs.writeFile(path.join(directory, 'Logo CAF.png'), 'ignored')
  await fs.writeFile(path.join(directory, 'README.md'), 'ignored')
})

after(async () => {
  await fs.rm(directory, { recursive: true, force: true })
})

describe('parseFinanceurs', () => {
  test('keeps the order and trims names and logos', () => {
    assert.deepEqual(
      parseFinanceurs([
        { name: " Cour d'appel de Paris ", logo: ' cap.jpg ' },
        { name: 'ARS', logo: 'ars.svg', title: 'ignored' },
      ]),
      [
        { name: "Cour d'appel de Paris", logo: 'cap.jpg' },
        { name: 'ARS', logo: 'ars.svg' },
      ],
    )
  })

  test('accepts an empty list', () => {
    assert.deepEqual(parseFinanceurs([]), [])
  })

  test('rejects a missing list', () => {
    assert.throws(() => parseFinanceurs(undefined), /`financeurs` must be a list/)
    assert.throws(() => parseFinanceurs('CAF'), /`financeurs` must be a list/)
  })

  test('names the entry that has no name', () => {
    assert.throws(
      () => parseFinanceurs([{ name: 'ARS', logo: 'ars.svg' }, { logo: 'caf.svg' }]),
      /funder #2 has no `name`/,
    )
    assert.throws(() => parseFinanceurs([null]), /funder #1 has no `name`/)
    assert.throws(() => parseFinanceurs([{ name: '  ', logo: 'caf.svg' }]), /funder #1 has no `name`/)
  })

  test('names the entry that has no logo', () => {
    assert.throws(
      () => parseFinanceurs([{ name: 'ARS' }]),
      /funder #1 \("ARS"\) has no `logo`/,
    )
  })

  test('rejects a logo that is not a plain image file name', () => {
    for (let logo of ['../secret.png', 'logos/caf.svg', 'Logo CAF.png', 'caf.pdf', '.svg', 'caf']) {
      assert.throws(
        () => parseFinanceurs([{ name: 'CAF', logo }]),
        /funder #1 \("CAF"\) has logo .* A logo is a file name in content\/logos\//,
        logo,
      )
    }
  })
})

describe('loadFinanceurs', () => {
  test('serves each logo from /logos/ with its intrinsic size', async () => {
    assert.deepEqual(
      await loadFinanceurs([{ name: 'CAF', logo: 'caf.svg' }], directory),
      [{ name: 'CAF', logo: { src: '/logos/caf.svg', width: 93, height: 91 } }],
    )
  })

  test('names the entry whose logo file is missing', async () => {
    await assert.rejects(
      loadFinanceurs([{ name: 'MSA77', logo: 'msa.jpg' }], directory),
      /funder #1 \("MSA77"\) has logo "msa.jpg", but content\/logos\/ has no file by that name/,
    )
  })

  test('names the entry whose logo is not an image', async () => {
    await assert.rejects(
      loadFinanceurs([{ name: 'CPAM', logo: 'broken.png' }], directory),
      /funder #1 \("CPAM"\) has logo "broken.png", which is not a readable image/,
    )
  })
})

describe('logo files', () => {
  test('lists only the files a logo may name, sorted', async () => {
    assert.deepEqual(await listLogoFiles(directory), ['broken.png', 'caf.svg'])
  })

  test('lists nothing when the directory does not exist', async () => {
    assert.deepEqual(await listLogoFiles(path.join(directory, 'missing')), [])
  })

  test('accepts the logo names in use today', () => {
    for (let file of ['caf.svg', 'logo-mairie-de-melun.png', 'acse.webp', 'cap.jpg']) {
      assert.ok(isLogoFile(file), file)
    }
  })

  test('maps each extension to its content type', () => {
    assert.equal(logoContentType('caf.svg'), 'image/svg+xml')
    assert.equal(logoContentType('cap.JPG'), 'image/jpeg')
    assert.equal(logoContentType('acse.webp'), 'image/webp')
    assert.equal(logoContentType('region.png'), 'image/png')
  })
})
