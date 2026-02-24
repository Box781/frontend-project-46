import { test, expect } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import parseFile from '../src/parser.js'
import diff from '../src/diff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('Сравнение json', () => {
  const filepath1 = path.join(__dirname, '__fixtures__', 'file1.json')
  const filepath2 = path.join(__dirname, '__fixtures__', 'file2.json')

  const file1 = parseFile(filepath1)
  const file2 = parseFile(filepath2)

  const res = diff(file1, file2)

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  expect(res).toBe(expected)
})

test('Сравнение yaml', () => {
  const filepath1 = path.join(__dirname, '__fixtures__', 'file1.yml')
  const filepath2 = path.join(__dirname, '__fixtures__', 'file2.yml')

  const file1 = parseFile(filepath1)
  const file2 = parseFile(filepath2)

  const res = diff(file1, file2)

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  expect(res).toBe(expected)
})
