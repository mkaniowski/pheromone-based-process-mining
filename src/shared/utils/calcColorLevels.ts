const calcColorLevels = (data: Record<string, number>) => {
  const _data = { ...data }
  const values = Object.values(data)

  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const delta = maxValue - minValue
  const levelDiff = Math.floor(delta / 3)

  const selectLevel = (val: number) => {
    if (val === 0) return 0
    if (val === maxValue) return 4
    if (val >= minValue && val <= minValue + levelDiff) return 1
    if (val > minValue + levelDiff && val <= minValue + 2 * levelDiff) return 2
    if (val > minValue + 2 * levelDiff && val < maxValue) return 3
    return 0
  }

  for (const key of Object.keys(data)) {
    _data[key] = selectLevel(data[key])
  }

  return _data
}

export default calcColorLevels
