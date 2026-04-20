import stylish from './stylish.js'
import plain from './plain.js'

const formatters = {
  stylish,
  plain,
}

export default (ast, formatName) => {
  const formatter = formatters[formatName]
  return formatter(ast)
}
