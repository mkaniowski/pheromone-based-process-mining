import { ColorLevel } from '@/types/common'

import colorSwitch from './colorSwitch'

const colorElement = (id: string, colorLevel: ColorLevel) => {
  const elements = document.querySelectorAll(`[data-element-id=${id}]`)

  for (const element of elements) {
    const rectElements = element.querySelectorAll('rect')

    for (const rect of rectElements) {
      const styles = (rect as SVGElement).getAttribute('style')
      ;(rect as any).style = `${styles} stroke: ${colorSwitch(colorLevel)};`
    }
  }
}

export default colorElement
