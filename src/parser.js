import fs from 'fs'
import path from 'path'

const parsers = {
  '.json': JSON.parse,
}

export default (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const fileContent = fs.readFileSync(absolutePath, 'utf-8')
  const extension = path.extname(filepath).toLowerCase()
  const parse = parsers[extension]
  return parse(fileContent)
}
