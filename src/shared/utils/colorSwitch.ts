import { ColorLevel } from '@/types/common'

const colorSwitch = (colorLevel: ColorLevel) => {
  switch (colorLevel) {
    case 0:
      return '#000000'
    case 1:
      return '#73ff00'
    case 2:
      return '#ffe600'
    case 3:
      return '#ffae00'
    case 4:
      return '#ff0000'
    default:
      return '#000000'
  }
}

export default colorSwitch
