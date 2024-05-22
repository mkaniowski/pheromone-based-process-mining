export type ColorLevel = 0 | 1 | 2 | 3 | 4

export interface CsvRow {
  'Case ID': string
  Activity: string
  [key: string]: string
}

export interface BpmnTask {
  id: string
  name: string
  x: number
  y: number
}

export interface BpmnSequenceFlow {
  id: string
  sourceRef: string
  targetRef: string
}

export interface BpmnElements {
  tasks: BpmnTask[]
  sequenceFlows: BpmnSequenceFlow[]
}
