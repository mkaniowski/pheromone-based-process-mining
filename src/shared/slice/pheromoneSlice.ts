import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/store'
import { ColorLevel } from '@/types/common'

import colorElement from '../utils/colorElement'
import normalize from '../utils/normalize'

type PayloadAction<P = void, T extends string = string, M = never, E = never> = {
  payload: P
  type: T
} & ([M] extends [never] ? {}
: {
    meta: M
  }) &
  ([E] extends [never] ? {}
  : {
      error: E
    })

type PheromoneState = Record<string, number>

const initialState: PheromoneState = {}

export const pheromoneSlice = createSlice({
  name: 'pheromone',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const key = action.payload
      const persistanceValue = parseInt(localStorage.getItem('persistance') ?? '1')
      if (state[key]) {
        state[key] += persistanceValue
      } else {
        state[key] = persistanceValue
      }
    },
    decrement: (state) => {
      for (const key of Object.keys(state)) {
        if (state[key] > 0) {
          state[key] -= 1
          if (state[key] === 0) {
            colorElement(key, 0 as ColorLevel)
            delete state[key]
          }
        }
      }
    },
    color: (state) => {
      for (const key of Object.keys(state)) {
        colorElement(key, normalize(state[key]) as ColorLevel)
      }
    },
    removeColor: (state) => {
      for (const key of Object.keys(state)) {
        colorElement(key, 0 as ColorLevel)
      }
    },
  },
})

export const { increment, decrement, color, removeColor } = pheromoneSlice.actions

export const getPheromones = (state: RootState): PheromoneState => state.pheromone

export default pheromoneSlice.reducer
