import type { Metric } from '../types'
import { useMetricsStore } from '../store/useMetricsStore'
import Sidebar from '../components/Sidebar'
import MetricForm from '../components/MetricForm'
import type { MetricFormData } from '../schemas'

function AddMetric() {
  const addMetric = useMetricsStore(
    (state) => state.addMetric
  )

  const onSubmit = (data: MetricFormData) => {
    const newMetric: Metric = {
      id: crypto.randomUUID(),
      title: data.title,
      value: data.value,
      department: data.department,
      date: data.date,
      ...(data.note ? { note: data.note } : {}),
    }

    addMetric(newMetric)
  }

  return (
    <>
      <Sidebar />

      <main className="add-metric-main">
        <div className="add-metric-container">
          <div className="add-metric-header">
            <span className="add-metric-badge">
              Metrics
            </span>

            <h1>Add Metric</h1>

            <p>
              Create a new metric record for your
              organization.
            </p>
          </div>

          <div className="add-metric-card">
            <MetricForm
              submitLabel="Add Metric"
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default AddMetric