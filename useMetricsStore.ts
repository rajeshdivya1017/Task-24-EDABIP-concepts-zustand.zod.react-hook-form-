import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Metric } from '../types'
import { metrics as initialMetrics } from '../data/metrics'

interface MetricsStore {
  metrics: Metric[]
  addMetric: (metric: Metric) => void
  updateMetric: (metric: Metric) => void
  deleteMetric: (id: Metric['id']) => void
}

export const useMetricsStore = create<MetricsStore>()(
  persist(
    (set) => ({
      metrics: initialMetrics,

      addMetric: (metric) =>
        set((state) => ({
          metrics: [...state.metrics, metric],
        })),

      updateMetric: (updatedMetric) =>
        set((state) => ({
          metrics: state.metrics.map((metric) =>
            metric.id === updatedMetric.id
              ? updatedMetric
              : metric
          ),
        })),

      deleteMetric: (id) =>
        set((state) => ({
          metrics: state.metrics.filter(
            (metric) => metric.id !== id
          ),
        })),
    }),
    {
      name: 'metrics-storage',
    }
  )
)