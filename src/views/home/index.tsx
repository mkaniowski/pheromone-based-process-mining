import './styles.scss'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

import BpmnModeler from 'bpmn-js/lib/Modeler'
import Papa from 'papaparse'
import { useEffect, useRef, useState } from 'react'

import calcColorLevels from '@/shared/utils/calcColorLevels'
import colorModel from '@/shared/utils/colorModel'
import createBpmnXml from '@/shared/utils/createBmpnXml'
import generateBPMN from '@/shared/utils/generateBMPN'
import { CsvRow } from '@/types/common'

const Home = () => {
  const [bpmnModeler, setBpmnModeler] = useState<BpmnModeler | null>(null)
  const activityCounts = useRef<Record<string, number>>({})
  const [activityList, setActivityList] = useState<Record<string, number>>({})
  const taskWidth = useRef<number>(100)

  useEffect(() => {
    const modeler = new BpmnModeler({ container: '#bpmnview' })
    setBpmnModeler(modeler)
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      Papa.parse<CsvRow>(file, {
        header: true,
        complete: (results) => {
          const {
            bpmnElements,
            taskMap,
            taskWidth: newTaskWidth,
            counts,
          } = generateBPMN(results.data)
          taskWidth.current = newTaskWidth
          activityCounts.current = counts
          setActivityList(counts)
          const bpmnXml = createBpmnXml(bpmnElements, taskMap, 'Process_1', taskWidth.current)
          renderBpmn(bpmnXml, taskMap)
        },
      })
    }
  }

  const renderBpmn = async (xml: string, taskMap: Record<string, string>) => {
    if (bpmnModeler) {
      bpmnModeler
        .importXML(xml)
        .then((result) => {
          const { warnings } = result
          console.warn('BPMN diagram loaded successfully!', warnings)
          colorModel(taskMap, calcColorLevels(activityCounts.current))
        })
        .catch((err) => {
          const { warnings, message } = err
          console.warn('Something went wrong:', warnings, message)
        })
    }
  }

  return (
    <div className='App'>
      <h1>BPMN Modeler from CSV</h1>
      <input
        type='file'
        accept='.csv'
        onChange={handleFileUpload}
        placeholder='xd'
      />
      <div
        id='bpmnview'
        style={{ width: '100%', height: '600px', border: '1px solid black' }}
      />
      <ul>
        {Object.entries(activityList).map(([activityName, count]) => (
          <li key={activityName}>{`${activityName}: ${count}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
