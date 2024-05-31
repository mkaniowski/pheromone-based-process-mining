import { ColorLevel } from '@/types/common'

import colorSwitch from './colorSwitch'

const colorElement = (id: string, colorLevel: ColorLevel) => {
  const elements = document.querySelectorAll(`[data-element-id=${id}]`)

  if (id.includes('Flow')) {
    for (const element of elements) {
      const pathElements = element.querySelectorAll('path')

      for (const path of pathElements) {
        const styles = (path as SVGElement).getAttribute('style')
        ;(path as any).style =
          `${styles} stroke: ${colorSwitch(colorLevel)}; marker-end: url(#end-arrow-lvl-${colorLevel}); stroke-width: 2px;`
      }
    }
  } else {
    for (const element of elements) {
      const rectElements = element.querySelectorAll('rect')

      for (const rect of rectElements) {
        const styles = (rect as SVGElement).getAttribute('style')
        ;(rect as any).style = `${styles} stroke: ${colorSwitch(colorLevel)}; stroke-width: 8px;`
      }
    }
  }
}

export default colorElement
