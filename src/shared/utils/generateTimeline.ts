import { CsvRow } from '@/types/common'

import { IActivity, ICase } from './parseLogs'

const generateTimeline = (
  data: CsvRow[],
  caseList: Record<string, ICase>,
  taskMap: Record<string, string>,
) => {
  const timeline: string[] = []
  let idx = 0
  for (const row of data) {
    const rowName = row['Case ID']
    if (rowName === '') continue
    const flow = caseList[rowName].activities.find((activity: IActivity) => activity.idx === idx)
    if (flow?.flow) timeline.push(flow.flow)
    timeline.push(taskMap[row.Activity])
    idx++
  }
  return timeline
}

export default generateTimeline
