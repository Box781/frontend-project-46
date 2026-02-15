import _ from 'lodash'

const diff = (data1, data2) => {
  const allKeys = _.union(_.keys(data1), _.keys(data2))
  const sortedKeys = _.sortBy(allKeys)
  const lines = []
  sortedKeys.forEach((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (_.has(data1, key) && !_.has(data2, key)) {
      lines.push(`  - ${key}: ${value1}`)
    }
    else if (!_.has(data1, key) && _.has(data2, key)) {
      lines.push(`  + ${key}: ${value2}`)
    }
    else if (value1 !== value2) {
      lines.push(`  - ${key}: ${value1}`)
      lines.push(`  + ${key}: ${value2}`)
    }
    else {
      lines.push(`    ${key}: ${value1}`)
    }
  })

  return `{\n${lines.join('\n')}\n}`
}

export default diff
