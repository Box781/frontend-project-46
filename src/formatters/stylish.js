import _ from 'lodash'

const spaces = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    if (value === '') {
      return ''
    }
    return String(value)
  }
  const lines = Object.entries(value).map(([key, val]) => {
    return `${spaces(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
  })
  return `{\n${lines.join('\n')}\n${spaces(depth)}  }`
}

const stylish = (ast, depth = 1) => {
  const lines = ast.map((node) => {
    const {
      key, type, value, value1, value2, children,
    } = node

    switch (type) {
      case 'added':
        return `${spaces(depth)}+ ${key}: ${stringify(value, depth)}`
      case 'removed':
        return `${spaces(depth)}- ${key}: ${stringify(value, depth)}`
      case 'changed':
        return [
          `${spaces(depth)}- ${key}: ${stringify(value1, depth)}`,
          `${spaces(depth)}+ ${key}: ${stringify(value2, depth)}`,
        ].join('\n')
      case 'nested':
        return `${spaces(depth)}  ${key}: {\n${stylish(children, depth + 1)}\n${spaces(depth)}  }`
      case 'unchanged':
        return `${spaces(depth)}  ${key}: ${stringify(value, depth)}`
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })

  return lines.join('\n')
}

export default ast => `{\n${stylish(ast)}\n}`
