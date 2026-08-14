import { useMemo } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useDashboardStore } from '../store/useDashboardStore'
import { useMetricsStore } from '../store/useMetricsStore'

function TrendLineChart() {
  const {
    department,
    fromDate,
    toDate,
    dateMode,
  } = useDashboardStore()

  const metrics = useMetricsStore(
    (state) => state.metrics
  )

  const trendData = useMemo(() => {
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

    const grouped = filteredMetrics.reduce(
      (result, metric) => {
        result[metric.date] =
          (result[metric.date] || 0) + metric.value

        return result
      },
      {} as Record<string, number>
    )

    return Object.entries(grouped)
      .map(([date, value]) => ({
        date,
        value,
      }))
      .sort((a, b) =>
        a.date.localeCompare(b.date)
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
          <h2>Metric Trend</h2>
          <p>Total metric value over time.</p>
        </div>
      </div>

      <div
        className="chart-container"
        style={{ width: '100%', height: 320 }}
      >
        {trendData.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={trendData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  Number(value).toLocaleString('en-IN')
                }
              />

              <Line
                type="monotone"
                dataKey="value"
                name="Total Value"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available for the selected filters.</p>
        )}
      </div>
    </section>
  )
}

export default TrendLineChart