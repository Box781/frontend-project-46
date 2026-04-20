import { test, expect } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import parseFile from '../src/parser.js'
import diff from '../src/diff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)

const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`

const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`

test('сравнение plain для JSON', () => {
  const file1 = parseFile(getFixturePath('file3.json'))
  const file2 = parseFile(getFixturePath('file4.json'))
  expect(diff(file1, file2, 'plain')).toBe(expectedPlain)
})

test('сравнение plain для YAML', () => {
  const file1 = parseFile(getFixturePath('file3.yml'))
  const file2 = parseFile(getFixturePath('file4.yml'))
  expect(diff(file1, file2, 'plain')).toBe(expectedPlain)
})

test('Сравнение вложенных JSON', () => {
  const file1 = parseFile(getFixturePath('file3.json'))
  const file2 = parseFile(getFixturePath('file4.json'))
  expect(diff(file1, file2)).toBe(expected)
})

test('Сравнение вложенных YAML', () => {
  const file1 = parseFile(getFixturePath('file3.yml'))
  const file2 = parseFile(getFixturePath('file4.yml'))
  expect(diff(file1, file2)).toBe(expected)
})

test('сравнение json для JSON', () => {
  const file1 = parseFile(getFixturePath('file3.json'))
  const file2 = parseFile(getFixturePath('file4.json'))
  const result = diff(file1, file2, 'json')
  expect(JSON.parse(result)).toEqual(JSON.parse(result))
})

test('сравнение json для yaml', () => {
  const file1 = parseFile(getFixturePath('file3.yml'))
  const file2 = parseFile(getFixturePath('file4.yml'))
  const result = diff(file1, file2, 'json')
  expect(JSON.parse(result)).toEqual(JSON.parse(result))
})
