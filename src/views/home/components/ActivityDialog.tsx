/* eslint-disable import/named */
import { ColumnDef } from '@tanstack/react-table'
import { FaTable } from 'react-icons/fa'
import { LuArrowUpDown } from 'react-icons/lu'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import ActivityTable, { CountRow } from './ActivityTable'

export interface IActivityDialog {
  data: CountRow[]
}

export const columns: ColumnDef<CountRow>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'count',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pheromone strength
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
]

const ActivityDialog = ({ data }: IActivityDialog) => {
  return (
    <Dialog>
      <DialogTrigger>
        <FaTable className='text-secondary w-8 h-8' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Current pheromone state</DialogTitle>
          <DialogDescription>
            <ActivityTable
              columns={columns}
              data={data}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ActivityDialog
