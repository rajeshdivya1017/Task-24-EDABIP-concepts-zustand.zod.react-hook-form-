import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useDashboardStore } from '../store/useDashboardStore'
import { useMetricsStore } from '../store/useMetricsStore'

function DeptBarChart() {
  const {
    department,
    fromDate,
    toDate,
    dateMode,
  } = useDashboardStore()

  const metrics = useMetricsStore(
    (state) => state.metrics
  )

  const departmentData = useMemo(() => {
    const filteredMetrics = metrics.filter((metric) => {
      const matchesDepartment =
        department === 'All' ||
        metric.department === department

      let matchesDate = true

      if (dateMode === 'exact') {
        matchesDate = metric.date === fromDate
      }

      if (dateMode === 'range') {
        matchesDate =
          metric.date >= fromDate &&
          metric.date <= toDate
      }

      return matchesDepartment && matchesDate
    })

    const totals = filteredMetrics.reduce(
      (result, metric) => {
        result[metric.department] =
          (result[metric.department] || 0) + metric.value

        return result
      },
      {} as Record<string, number>
    )

    return Object.entries(totals).map(
      ([department, value]) => ({
        department,
        value,
      })
    )
  }, [
    metrics,
    department,
    fromDate,
    toDate,
    dateMode,
  ])

  return (
    <section className="chart-section">
      <div className="chart-header">
        <div>
          <h2>Department Performance</h2>
          <p>Total metric value by department.</p>
        </div>
      </div>

      <div
        className="chart-container"
        style={{ width: '100%', height: 320 }}
      >
        {departmentData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="department"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  Number(value).toLocaleString('en-IN')
                }
              />

             <Bar
                 dataKey="value"
                 name="Total Value"
                 fill="#2563eb"
                 radius={[6, 6, 0, 0]}
/> 
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available for the selected filters.</p>
        )}
      </div>
    </section>
  )
}

export default DeptBarChart