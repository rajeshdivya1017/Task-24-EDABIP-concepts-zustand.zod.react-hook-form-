import { describe, it, expect, beforeEach } from 'vitest'
import { useMetricsStore } from '../useMetricsStore'
import type { Metric } from '../../types'

const testMetric: Metric = {
  id: 999,
  title: 'Test Metric',
  value: 5000,
  department: 'Sales',
  date: '2026-08-13',
  note: 'Test note',
}

const updatedMetric: Metric = {
  id: 999,
  title: 'Updated Metric',
  value: 7500,
  department: 'Finance',
  date: '2026-08-13',
  note: 'Updated note',
}

describe('useMetricsStore', () => {
  beforeEach(() => {
    useMetricsStore.setState({
      metrics: [testMetric],
    })
  })

  it('should have metrics in the store', () => {
    expect(useMetricsStore.getState().metrics).toHaveLength(1)
    expect(useMetricsStore.getState().metrics[0]).toEqual(testMetric)
  })

  it('should add a metric', () => {
    const newMetric: Metric = {
      id: 1000,
      title: 'New Metric',
      value: 3000,
      department: 'HR',
      date: '2026-08-12',
      note: 'New test metric',
    }

    useMetricsStore.getState().addMetric(newMetric)

    const metrics = useMetricsStore.getState().metrics

    expect(metrics).toHaveLength(2)
    expect(metrics[1]).toEqual(newMetric)
  })

  it('should update a metric', () => {
    useMetricsStore.getState().updateMetric(updatedMetric)

    const metrics = useMetricsStore.getState().metrics

    expect(metrics).toHaveLength(1)
    expect(metrics[0]).toEqual(updatedMetric)
  })

  it('should delete a metric', () => {
    useMetricsStore.getState().deleteMetric(999)

    expect(useMetricsStore.getState().metrics).toHaveLength(0)
  })

  it('should not update a different metric', () => {
    const anotherMetric: Metric = {
      id: 1001,
      title: 'Another Metric',
      value: 2000,
      department: 'Marketing',
      date: '2026-08-11',
      note: 'Another test',
    }

    useMetricsStore.getState().addMetric(anotherMetric)
    useMetricsStore.getState().updateMetric(updatedMetric)

    const metrics = useMetricsStore.getState().metrics

    expect(metrics).toHaveLength(2)
    expect(metrics[1]).toEqual(anotherMetric)
  })
})