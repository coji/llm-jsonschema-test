import { z } from 'zod'

export const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  body: z.string().min(1, 'Body is required').max(3000, 'Body is too long'),
})
