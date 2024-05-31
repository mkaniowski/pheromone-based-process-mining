import { ChangeEvent, useEffect, useState } from 'react'
import { FaGear } from 'react-icons/fa6'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'

const MenuSheet = () => {
  const [tickTime, setTickTime] = useState<number>(10)
  const [persistance, setPersistance] = useState<number>(10)

  useEffect(() => {
    const tickTimeStorage = localStorage.getItem('tickTime')
    const persistanceStorage = localStorage.getItem('persistance')

    if (!tickTimeStorage) {
      localStorage.setItem('tickTime', '10')
      setTickTime(10)
    } else {
      setTickTime(parseInt(tickTimeStorage))
    }
    if (!persistanceStorage) {
      localStorage.setItem('persistance', '10')
      setPersistance(10)
    } else {
      setPersistance(parseInt(persistanceStorage))
    }
  }, [])

  const handleChangeTickTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTickTime(parseInt(e.target.value))
    localStorage.setItem('tickTime', e.target.value)
  }

  const handleChangeTickTimeSlider = (v: number[]) => {
    setTickTime(v[0])
    localStorage.setItem('tickTime', String(v[0]))
  }

  const handleChangePersistance = (e: ChangeEvent<HTMLInputElement>) => {
    setPersistance(parseInt(e.target.value))
    localStorage.setItem('persistance', e.target.value)
  }

  const handleChangePersistanceSlider = (v: number[]) => {
    setPersistance(v[0])
    localStorage.setItem('persistance', String(v[0]))
  }

  return (
    <Sheet>
      <SheetTrigger className='text-secondary h-full flex flex-col justify-end'>
        <FaGear className='w-8 h-8' />
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Simulation settings</SheetTitle>
          <SheetDescription>
            <Label
              htmlFor='file-input'
              className='text-secondary mt-3'
            >
              Simulation speed (ms per entry)
            </Label>
            <Input
              value={tickTime}
              onChange={handleChangeTickTime}
              type='number'
              className='flex basis-1/6 w-full'
              id='tick-time'
            />
            <Slider
              defaultValue={[tickTime]}
              max={100}
              step={1}
              value={[tickTime]}
              onValueChange={handleChangeTickTimeSlider}
              className='flex basis-4/6'
              id='tick-time'
            />
            <Label
              htmlFor='file-input'
              className='text-secondary mt-10'
            >
              Persistance of pheromone (entries per level)
            </Label>
            <Input
              value={persistance}
              onChange={handleChangePersistance}
              type='number'
              className='flex basis-1/6 w-full'
              id='tick-time'
            />
            <Slider
              defaultValue={[persistance]}
              max={100}
              step={1}
              value={[persistance]}
              onValueChange={handleChangePersistanceSlider}
              className='flex basis-4/6'
              id='tick-time'
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default MenuSheet
