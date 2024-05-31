import { CsvRow } from '@/types/common'

export interface IActivity {
  name: string
  taskId: string
  idx: number
  flow: string | undefined
}

export interface ICase {
  id: string
  activities: IActivity[]
}

const parseLogs = (data: CsvRow[], taskMap: Record<string, string>) => {
  const caseList: Record<string, ICase> = {}
  let idx = 0
  for (const row of data) {
    const rowName = row['Case ID']
    if (rowName === '') continue
    const taskId = taskMap[row.Activity]

    if (!caseList[rowName]) {
      caseList[rowName] = {
        id: rowName,
        activities: [],
      }
    }

    const activitiesLen = caseList[rowName]?.activities?.length ?? 0
    caseList[rowName] = {
      id: rowName,
      activities: [
        ...caseList[rowName].activities,
        {
          name: row.Activity,
          idx,
          taskId,
          flow:
            activitiesLen >= 1 ?
              `Flow_${caseList[rowName].activities[activitiesLen - 1].taskId}_${taskId}`
            : undefined,
        },
      ],
    }
    idx++
  }
  return caseList
}

export default parseLogs
