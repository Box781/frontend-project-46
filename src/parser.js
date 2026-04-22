import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export default (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const fileContent = fs.readFileSync(absolutePath, 'utf-8')
  const extension = path.extname(filepath).toLowerCase()
  switch (extension) {
    case '.json':
      return JSON.parse(fileContent)
    case '.yaml':
      return yaml.load(fileContent)
    case '.yml':
      return yaml.load(fileContent)
    default:
      throw new Error('Расширение не поддерживается')
  }
}
