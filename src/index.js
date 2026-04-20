import parseFile from './parser.js'
import buildDiff from './diff.js'

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  return buildDiff(data1, data2, formatName)
}
