import { z } from 'zod'

export const trackingIdSchema = z
  .string()
  .trim()
  .regex(/^TPC-\d{5}$/, 'Tracking ID must match TPC-XXXXX')

export type TrackingId = z.infer<typeof trackingIdSchema>
