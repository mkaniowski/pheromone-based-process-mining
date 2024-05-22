/* eslint-disable sonarjs/cognitive-complexity */

import { BpmnElements, CsvRow } from '@/types/common'

const generateBPMN = (data: CsvRow[]) => {
  const cases: Record<string, CsvRow[]> = {}
  const counts: Record<string, number> = {}
  for (const row of data) {
    if (!row.Activity) continue
    const caseId = row['Case ID']
    const activityName = row.Activity

    if (!cases[caseId]) {
      cases[caseId] = []
    }
    cases[caseId].push(row)
    counts[activityName] = counts[activityName] ? counts[activityName] + 1 : 1
  }

  const taskMap: Record<string, string> = {}
  let taskIdCounter = 1

  const bpmnElements: BpmnElements = {
    tasks: [],
    sequenceFlows: [],
  }

  for (const [, activities] of Object.entries(cases)) {
    let i = 0
    for (const activity of activities) {
      let taskId: string
      if (taskMap[activity.Activity]) {
        taskId = taskMap[activity.Activity]
      } else {
        taskId = `Task_${taskIdCounter++}`
        taskMap[activity.Activity] = taskId
      }

      if (!bpmnElements.tasks.some((task) => task.id === taskId)) {
        // Calculate the x and y coordinates for the task
        const x = (parseInt(taskId.match(/\d+/)![0], 10) - 1) * 250 // Example logic for x-coordinate
        const y = 100 // Example logic for y-coordinate

        bpmnElements.tasks.push({ id: taskId, name: activity.Activity, x, y })
      }

      if (i > 0 && bpmnElements.tasks[i - 1]) {
        const sourceTaskId = bpmnElements.tasks[i - 1].id
        const targetTaskId = taskId
        const flowId = `Flow_${sourceTaskId}_${targetTaskId}`
        // Check if the sequence flow already exists
        if (
          !bpmnElements.sequenceFlows.some(
            (flow) => flow.sourceRef === sourceTaskId && flow.targetRef === targetTaskId,
          )
        ) {
          bpmnElements.sequenceFlows.push({
            id: flowId,
            sourceRef: sourceTaskId,
            targetRef: targetTaskId,
          })
        }
      }
      i++
    }
  }

  return {
    bpmnElements,
    taskMap,
    taskWidth: Object.keys(counts).length > 5 ? Object.keys(counts).length * 20 : 100,
    counts,
  }
}

export default generateBPMN
