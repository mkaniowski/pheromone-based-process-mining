import { ColorLevel } from '@/types/common'

import colorSwitch from './colorSwitch'

const createEndMarkes = () => {
  const idxs: ColorLevel[] = [0, 1, 2, 3, 4]
  const svg = document.querySelectorAll(`[data-element-id=Process_1]`)
  for (const svgElement of svg) {
    const defElements = svgElement.querySelectorAll('defs')
    for (const def of defElements) {
      for (const idx of idxs) {
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker')
        marker.setAttribute('id', `end-arrow-lvl-${idx}`)
        marker.setAttribute('viewBox', '0 0 20 20')
        marker.setAttribute('refX', '11')
        marker.setAttribute('refY', '10')
        marker.setAttribute('markerWidth', '10')
        marker.setAttribute('markerHeight', '10')
        marker.setAttribute('orient', 'auto')

        const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        arrowPath.setAttribute('d', 'M 1 5 L 11 10 L 1 15 Z')
        ;(arrowPath as any).style =
          `stroke-linecap: round; stroke-linejoin: round; stroke: ${colorSwitch(idx)}; stroke-width: 1px; fill: ${colorSwitch(idx)};`

        marker.appendChild(arrowPath)
        def.appendChild(marker)
      }
    }
  }
}

export default createEndMarkes
