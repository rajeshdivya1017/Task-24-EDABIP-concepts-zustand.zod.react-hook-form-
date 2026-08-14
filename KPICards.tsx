import { useMemo } from 'react'
import { useDashboardStore } from '../store/useDashboardStore'
import { useMetricsStore } from '../store/useMetricsStore'

function KPICards() {
  const {
    department,
    fromDate,
    toDate,
    dateMode,
  } = useDashboardStore()

  const metrics = useMetricsStore(
    (state) => state.metrics
  )

  const filteredMetrics = useMemo(() => {
    return metrics.filter((metric) => {
      const departmentMatch =
        department === 'All' ||
        metric.department === department

      let dateMatch = true

      if (dateMode === 'exact') {
        dateMatch =
          !!fromDate &&
          metric.date === fromDate
      }

      if (dateMode === 'range') {
        const fromDateMatch =
          !fromDate ||
          metric.date >= fromDate

        const toDateMatch =
          !toDate ||
          metric.date <= toDate

        dateMatch =
          fromDateMatch && toDateMatch
      }

      return (
        departmentMatch &&
        dateMatch
      )
    })
  }, [
    metrics,
    department,
    fromDate,
    toDate,
    dateMode,
  ])

  const totalValue = filteredMetrics.reduce(
    (total, metric) =>
      total + metric.value,
    0
  )

  const recordCount =
    filteredMetrics.length

  const highestValue =
    filteredMetrics.length > 0
      ? Math.max(
          ...filteredMetrics.map(
            (metric) => metric.value
          )
        )
      : 0

  const departmentCounts =
    filteredMetrics.reduce(
      (counts, metric) => {
        counts[metric.department] =
          (counts[metric.department] || 0) + 1

        return counts
      },
      {} as Record<string, number>
    )

  const mostActiveDepartment =
    Object.entries(departmentCounts)
      .sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || '—'

  const cards = [
    {
      title: 'Total Metrics Value',
      value: totalValue.toLocaleString('en-IN'),
      icon: '₹',
      iconClass: 'kpi-icon-blue',
    },
    {
      title: 'Record Count',
      value: recordCount.toLocaleString('en-IN'),
      icon: '#',
      iconClass: 'kpi-icon-green',
    },
    {
      title: 'Highest Single Value',
      value: highestValue.toLocaleString('en-IN'),
      icon: '↑',
      iconClass: 'kpi-icon-purple',
    },
    {
      title: 'Most Active Department',
      value: mostActiveDepartment,
      icon: '★',
      iconClass: 'kpi-icon-orange',
    },
  ]

  return (
    <section className="kpi-section">
      <div className="kpi-header">
        <h2>KPI Overview</h2>

        <p>
          Key performance indicators based on your
          selected filters.
        </p>
      </div>

      <div className="kpi-grid">
        {cards.map((card) => (
          <article
            key={card.title}
            className="kpi-card"
          >
            <div className="kpi-card-content">
              <div>
                <p className="kpi-title">
                  {card.title}
                </p>

                <strong className="kpi-value">
                  {card.value}
                </strong>
              </div>

              <div
                className={`kpi-icon ${card.iconClass}`}
              >
                {card.icon}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default KPICards