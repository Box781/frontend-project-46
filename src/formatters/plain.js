const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const plain = (ast, path = '') => {
  const lines = ast.flatMap((node) => {
    const { key, type, value, value1, value2, children } = node
    const fullPath = path ? `${path}.${key}` : key

    switch (type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(value)}`
      case 'removed':
        return `Property '${fullPath}' was removed`
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`
      case 'nested':
        return plain(children, fullPath)
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })

  return lines.join('\n')
}

export default plain
