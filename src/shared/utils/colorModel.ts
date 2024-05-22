import { ColorLevel } from '@/types/common'

import colorElement from './colorElement'

const colorModel = (taskMap: Record<string, string>, levels: Record<string, number>) => {
  for (const levelKey of Object.keys(levels)) {
    colorElement(taskMap[levelKey], levels[levelKey] as ColorLevel)
  }
}

export default colorModel
