import './styles.scss'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

import BpmnModeler from 'bpmn-js/lib/Modeler'
import Papa from 'papaparse'
import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  color,
  decrement,
  getPheromones,
  increment,
  removeColor,
} from '@/shared/slice/pheromoneSlice'
import createBpmnXml from '@/shared/utils/createBmpnXml'
import createEndMarkes from '@/shared/utils/createEndMarkers'
import generateBPMN from '@/shared/utils/generateBMPN'
import generateTimeline from '@/shared/utils/generateTimeline'
import parseLogs from '@/shared/utils/parseLogs'
import { CsvRow } from '@/types/common'

import ActivityDialog from './components/ActivityDialog'
import { CountRow } from './components/ActivityTable'
import MenuSheet from './components/MenuSheet'

const Home = () => {
  const [bpmnModeler, setBpmnModeler] = useState<BpmnModeler | null>(null)
  const [taskMap, setTaskMap] = useState<Record<string, string>>({})
  const activityCountsList = useRef<CountRow[]>([])
  const taskWidth = useRef<number>(100)
  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [isSimulating, setIsSimulating] = useState<boolean>(false)
  const [currentEntryIdx, setCurrentEntryIdx] = useState<number>(0)
  const currentIdxRef = useRef<number>(0)
  const [lastIdx, setLastIdx] = useState<number>(1)
  const [timeline, setTimeline] = useState<string[]>([])

  const dispatch = useDispatch()
  const pheromones = useSelector(getPheromones)

  useEffect(() => {
    const modeler = new BpmnModeler({ container: '#bpmnview' })
    setBpmnModeler(modeler)
  }, [])

  useEffect(() => {
    let intervalId = setInterval(() => {}, 1000)
    if (isSimulating && isSuccess) {
      intervalId = setInterval(
        () => {
          dispatch(increment(timeline[currentIdxRef.current]))
          dispatch(color())
          dispatch(decrement())

          setCurrentEntryIdx(currentIdxRef.current)
          currentIdxRef.current++
        },
        parseInt(localStorage.getItem('tickTime') ?? '10') ?? 10,
      )
    }

    return () => clearInterval(intervalId)
  }, [isSuccess, isSimulating, timeline, dispatch])

  useEffect(() => {
    if (!taskMap) return
    const countList = []
    for (const countKey of Object.keys(pheromones)) {
      if (countKey.includes('Flow')) continue
      const taskName = Object.keys(taskMap).find((key) => taskMap[key] === countKey) ?? ''
      countList.push({ name: taskName, count: pheromones[countKey] })
    }
    activityCountsList.current = countList
  }, [pheromones, taskMap])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      Papa.parse<CsvRow>(file, {
        header: true,
        complete: (results) => {
          const {
            bpmnElements,
            taskMap: _taskMap,
            taskWidth: newTaskWidth,
          } = generateBPMN(results.data)
          setTaskMap(_taskMap)
          taskWidth.current = newTaskWidth
          const bpmnXml = createBpmnXml(bpmnElements, _taskMap, 'Process_1', taskWidth.current)
          renderBpmn(bpmnXml)
          setLastIdx(results.data.length)
          const caseList = parseLogs(results.data, _taskMap)
          const _timeline = generateTimeline(results.data, caseList, _taskMap)
          setTimeline(_timeline)
          setLastIdx(_timeline.length - 1)
        },
      })
    }
  }

  const renderBpmn = async (xml: string) => {
    if (bpmnModeler) {
      bpmnModeler
        .importXML(xml)
        .then((result) => {
          const { warnings } = result
          console.warn('BPMN diagram loaded successfully!', warnings)
          setSuccess(true)
          const zoom = bpmnModeler?.get('zoomScroll') as any
          zoom.reset()
          createEndMarkes()
        })
        .catch((err) => {
          const { warnings, message } = err
          console.warn('Something went wrong:', warnings, message)
        })
    }
  }

  const handlePlaySimulation = () => {
    setIsSimulating(true)
  }

  const handlePauseSimulation = () => {
    setIsSimulating(false)
  }

  const handleStopSimulation = () => {
    setIsSimulating(false)
    dispatch(removeColor())
    currentIdxRef.current = 0
    setCurrentEntryIdx(0)
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
              disabled={!isSuccess || isSimulating}
              onClick={handlePlaySimulation}
            >
              <FaPlay className='mr-2' /> Start simulation
            </Button>
            <Button
              variant='secondary'
              className='flex basis-1/6'
              disabled={!isSuccess || !isSimulating}
              onClick={handlePauseSimulation}
            >
              <FaPause className='mr-2' /> Pause simulation
            </Button>
            <Button
              variant='secondary'
              className='flex basis-1/6'
              disabled={!isSuccess || !isSimulating}
              onClick={handleStopSimulation}
            >
              <FaStop className='mr-2' /> Stop simulation
            </Button>
          </span>
        </span>
        <span className='flex gap-x-5 items-end h-full'>
          <TooltipProvider>
            <Tooltip>
              {isSuccess && (
                <TooltipTrigger className='flex justify-center'>
                  <ActivityDialog data={activityCountsList.current} />
                </TooltipTrigger>
              )}
              <TooltipContent>
                <p>Current pheromone state</p>
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
      <span className='flex justify-center items-center gap-x-5'>
        <Progress value={Number(((currentIdxRef.current / lastIdx) * 100).toPrecision(4))} />
        <span className='flex items-center gap-x-5 w-1/6'>
          <h3 className='text-xl text-secondary w-1/2 text-start'>
            {Number(((currentIdxRef.current / lastIdx) * 100).toPrecision(4))}%
          </h3>
          <h3 className='text-xl text-secondary w-1/2 text-end'>
            {currentEntryIdx}/{lastIdx}
          </h3>
        </span>
      </span>
      <div
        id='bpmnview'
        className='w-full h-full border-2 bg-zinc-900'
      />
    </div>
  )
}

export default Home
