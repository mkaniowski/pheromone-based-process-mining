import { BpmnElements } from '@/types/common'

const createBpmnXml = (
  bpmnElements: BpmnElements,
  taskMap: Record<string, string>,
  processId: string,
  taskWidth: number,
): string => {
  if (!bpmnElements?.tasks || !bpmnElements.sequenceFlows) {
    console.error('Invalid BPMN elements:', bpmnElements)
    return ''
  }

  const bpmnHeader = `<?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
    <bpmn:process id="Process_1" isExecutable="false">`

  const bpmnTasks = Object.entries(taskMap)
    .map(
      ([name, id]) => `
      <bpmn:task id="${id}" name="${name}" />`,
    )
    .join('')

  const bpmnFlows = bpmnElements.sequenceFlows
    .map(
      (flow) => `
      <bpmn:sequenceFlow id="${flow.id}" sourceRef="${flow.sourceRef}" targetRef="${flow.targetRef}" />`,
    )
    .join('')

  const bpmnDiagram = `
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${processId}">`

  const bpmnShapes = Object.entries(taskMap)
    .map(
      ([_, id], index) => `
      <bpmndi:BPMNShape id="BPMNShape_${id}" bpmnElement="${id}">
        <dc:Bounds x="${index * 250}" y="100" width="${taskWidth}" height="80" />
      </bpmndi:BPMNShape>`,
    )
    .join('')

  const bpmnEdges = bpmnElements.sequenceFlows
    .map((flow) => {
      const sourceTask = bpmnElements.tasks.find((task) => task.id === flow.sourceRef)
      const targetTask = bpmnElements.tasks.find((task) => task.id === flow.targetRef)
      if (sourceTask && targetTask) {
        const sourceTaskId = parseInt(sourceTask.id.match(/\d+/)![0], 10)
        const targetTaskId = parseInt(targetTask.id.match(/\d+/)![0], 10)

        if (targetTaskId - sourceTaskId === 1) {
          return `
          <bpmndi:BPMNEdge id="BPMNEdge_${flow.id}" bpmnElement="${flow.id}">
            <di:waypoint x="${sourceTask.x + taskWidth}" y="${sourceTask.y + 25}" />
            <di:waypoint x="${targetTask.x}" y="${targetTask.y + 25}" />
          </bpmndi:BPMNEdge>`
        }

        if (sourceTaskId - targetTaskId === 1) {
          return `
          <bpmndi:BPMNEdge id="BPMNEdge_${flow.id}" bpmnElement="${flow.id}">
            <di:waypoint x="${sourceTask.x}" y="${sourceTask.y + 50}" />
            <di:waypoint x="${targetTask.x + taskWidth}" y="${targetTask.y + 50}" />
          </bpmndi:BPMNEdge>`
        }

        return `
          <bpmndi:BPMNEdge id="BPMNEdge_${flow.id}" bpmnElement="${flow.id}">
            <di:waypoint x="${sourceTask.x + 10 * targetTaskId}" y="${sourceTask.y}" />
            <di:waypoint x="${sourceTask.x + 10 * targetTaskId}" y="${sourceTask.y - taskWidth * sourceTaskId + 20 * targetTaskId}" />
            <di:waypoint x="${targetTask.x + 10 * sourceTaskId + taskWidth / 2 - 10}" y="${sourceTask.y - taskWidth * sourceTaskId + 20 * targetTaskId}" />
            <di:waypoint x="${targetTask.x + 10 * sourceTaskId + taskWidth / 2 - 10}" y="${targetTask.y}" />
          </bpmndi:BPMNEdge>`
      }
      return ''
    })
    .join('')

  const bpmnFooter = `
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>`

  return `${bpmnHeader}${bpmnTasks}${bpmnFlows}${bpmnDiagram}${bpmnShapes}${bpmnEdges}${bpmnFooter}`
}

export default createBpmnXml
