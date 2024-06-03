import { ColorLevel } from '@/types/common'

const colorSwitch = (colorLevel: ColorLevel): string => {
  const colorScale: Record<number, string> = {
    0: '#000000', // Black
    1: '#224400', // Dark green
    2: '#447700', // Medium green
    3: '#73ff00', // Green
    4: '#aaff00', // Light green
    5: '#ffe600', // Yellow
    6: '#ffae00', // Orange
    7: '#ff6600', // Orange-red
    8: '#ff3300', // Dark red
    9: '#ff0000', // Red
  }

  if (colorLevel >= Object.keys(colorScale).length) {
    return '#ff0000' // Red-hot
  }

  if (colorScale[colorLevel]) {
    return colorScale[colorLevel]
  }

  return '#000000'
}

export default colorSwitch
