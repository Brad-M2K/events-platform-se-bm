import { z } from 'zod'

export const eventIdParamSchema = z.object({
  id: z.string().uuid(),
})

const baseEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dateTime: z.string().datetime({ offset: true }),
  durationMins: z.number().int().positive(),
  location: z.string().min(1, 'Location is required'),
  capacity: z.number().int().nonnegative(),
  price: z.number().nonnegative().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  category: z.string().min(1).nullable().optional(),
})

export const createEventSchema = baseEventSchema

export const updateEventSchema = baseEventSchema
  .partial()
  .refine(
    (data: Partial<z.infer<typeof baseEventSchema>>) => Object.keys(data).length > 0,
    'At least one field must be provided',
  )

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('A valid email is required'),
})
