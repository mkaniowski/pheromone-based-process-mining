import { configureStore } from '@reduxjs/toolkit'

import pheromoneSlice from './shared/slice/pheromoneSlice'
// ...

export const store = configureStore({
  reducer: {
    pheromone: pheromoneSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
