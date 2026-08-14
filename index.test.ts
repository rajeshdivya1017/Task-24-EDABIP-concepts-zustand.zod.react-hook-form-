import { describe, it, expect } from 'vitest'
import { metricSchema } from '../index'

describe('MetricSchema', () => {
  it('should accept valid metric data', () => {
    const result = metricSchema.safeParse({
      title: 'Monthly Sales',
      value: 5000,
      department: 'Sales',
      date: '2026-08-13',
      note: 'Monthly performance'
    })

    expect(result.success).toBe(true)
  })

  it('should reject a title shorter than 3 characters', () => {
    const result = metricSchema.safeParse({
      title: 'AB',
      value: 5000,
      department: 'Sales',
      date: '2026-08-13'
    })

    expect(result.success).toBe(false)
  })

  it('should reject a non-positive value', () => {
    const result = metricSchema.safeParse({
      title: 'Monthly Sales',
      value: 0,
      department: 'Sales',
      date: '2026-08-13'
    })

    expect(result.success).toBe(false)
  })

  it('should reject an invalid date', () => {
    const result = metricSchema.safeParse({
      title: 'Monthly Sales',
      value: 5000,
      department: 'Sales',
      date: 'invalid-date'
    })

    expect(result.success).toBe(false)
  })
})