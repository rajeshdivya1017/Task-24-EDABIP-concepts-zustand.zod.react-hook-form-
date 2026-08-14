import { z } from 'zod'

export const metricSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),

  value: z
    .number({
      message: 'Value must be a number',
    })
    .positive('Value must be greater than 0'),

  department: z.enum([
    'Sales',
    'Marketing',
    'HR',
    'Finance',
    'Operations',
  ]),

  date: z
    .string()
    .min(1, 'Date is required')
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      'Date must be a valid date'
    ),

  note: z
    .string()
    .max(200, 'Note must be at most 200 characters')
    .optional(),
})

export type MetricFormData = z.infer<typeof metricSchema>