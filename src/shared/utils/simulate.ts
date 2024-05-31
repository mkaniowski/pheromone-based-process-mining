import colorElement from './colorElement'

const simulate = (timeline: string[], idx: number) => {
  let trace4 = localStorage.getItem('trace4')
  let trace3 = localStorage.getItem('trace3')
  let trace2 = localStorage.getItem('trace2')
  let trace1 = localStorage.getItem('trace1')
  let trace0 = localStorage.getItem('trace0')
  localStorage.setItem('trace4', timeline[idx])
  localStorage.setItem('trace3', trace4 ?? '')
  localStorage.setItem('trace2', trace3 ?? '')
  localStorage.setItem('trace1', trace2 ?? '')
  localStorage.setItem('trace0', trace1 ?? '')

  trace4 = localStorage.getItem('trace4')
  trace3 = localStorage.getItem('trace3')
  trace2 = localStorage.getItem('trace2')
  trace1 = localStorage.getItem('trace1')
  trace0 = localStorage.getItem('trace0')

  colorElement(trace4 ?? '', 4)
  colorElement(trace3 ?? '', 3)
  colorElement(trace2 ?? '', 2)
  colorElement(trace1 ?? '', 1)
  colorElement(trace0 ?? '', 0)
}

export default simulate
