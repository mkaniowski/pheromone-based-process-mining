import { createLazyFileRoute } from '@tanstack/react-router'

import Home from '@/views/home'

export const Route = createLazyFileRoute('/')({
  component: Home,
})
