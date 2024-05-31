import './styles.scss'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

import BpmnModeler from 'bpmn-js/lib/Modeler'
import Papa from 'papaparse'
import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { FaTable } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import calcColorLevels from '@/shared/utils/calcColorLevels'
import colorModel from '@/shared/utils/colorModel'
import createBpmnXml from '@/shared/utils/createBmpnXml'
import generateBPMN from '@/shared/utils/generateBMPN'
import { CsvRow } from '@/types/common'

import MenuSheet from './components/MenuSheet'

const Home = () => {
  const [bpmnModeler, setBpmnModeler] = useState<BpmnModeler | null>(null)
  const activityCounts = useRef<Record<string, number>>({})
  const [activityList, setActivityList] = useState<Record<string, number>>({})
  const taskWidth = useRef<number>(100)
  const [isSuccess, setSuccess] = useState<boolean>(false)

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
          setSuccess(true)
        })
        .catch((err) => {
          const { warnings, message } = err
          console.warn('Something went wrong:', warnings, message)
        })
    }
  }

  return (
    <div className='flex flex-col w-dvw h-dvh p-3 gap-y-3 bg-foreground font-mono'>
      <h1 className='text-4xl font-bold text-slate-50'>BPMN - Pheromone-based process mining</h1>
      <div className='flex flex-row w-full justify-between content-center items-center gap-x-5 pr-3'>
        <span className='flex items-end gap-x-8'>
          <span>
            <Label
              htmlFor='file-input'
              className='text-secondary'
            >
              Upload your logs
            </Label>
            <Input
              onChange={handleFileUpload}
              type='file'
              accept='.csv'
              className='flex basis-1/6 w-full'
              id='file-input'
            />
          </span>
          <span className='flex flex justify-end h-full gap-x-3 items-end'>
            <Button
              variant='secondary'
              className='flex basis-1/6'
              disabled={!isSuccess}
            >
              <FaPlay className='mr-2' /> Start simulation
            </Button>
            <Button
              variant='secondary'
              className='flex basis-1/6'
              disabled={!isSuccess}
            >
              <FaPause className='mr-2' /> Pause simulation
            </Button>
            <Button
              variant='secondary'
              className='flex basis-1/6'
              disabled={!isSuccess}
            >
              <FaStop className='mr-2' /> Stop simulation
            </Button>
          </span>
        </span>
        <span className='flex gap-x-5 items-end h-full'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='flex justify-center'>
                <FaTable className='text-secondary w-8 h-8' />
              </TooltipTrigger>
              <TooltipContent>
                <p>View task count</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className='flex justify-center'>
                <MenuSheet />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit simulation settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>
      <Separator />
      <Progress value={33} />
      <div
        id='bpmnview'
        className='w-full h-full border-2 bg-zinc-900'
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
