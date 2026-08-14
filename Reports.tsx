import { useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { useMetricsStore } from "../store/useMetricsStore";

function Reports() {
  const metrics = useMetricsStore(
    (state) => state.metrics
  );

  // Department Analysis
  const departmentReport = useMemo(() => {
    const grouped = metrics.reduce(
      (result, metric) => {
        if (!result[metric.department]) {
          result[metric.department] = {
            department: metric.department,
            records: 0,
            totalValue: 0,
          };
        }

        result[metric.department].records += 1;
        result[metric.department].totalValue += metric.value;

        return result;
      },
      {} as Record<
        string,
        {
          department: string;
          records: number;
          totalValue: number;
        }
      >
    );

    return Object.values(grouped)
      .map((item) => ({
        ...item,
        averageValue:
          item.records > 0
            ? item.totalValue / item.records
            : 0,
      }))
      .sort(
        (a, b) => b.totalValue - a.totalValue
      );
  }, [metrics]);

  // Top 10 Metrics
  const topMetrics = useMemo(() => {
    return [...metrics]
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [metrics]);

  // Recent 10 Metrics
  const recentMetrics = useMemo(() => {
    return [...metrics]
      .sort((a, b) =>
        b.date.localeCompare(a.date)
      )
      .slice(0, 10);
  }, [metrics]);

  // Overview
  const totalRecords = metrics.length;

  const totalValue = metrics.reduce(
    (total, metric) => total + metric.value,
    0
  );

  const departments = departmentReport.length;

  const topMetricsCount = topMetrics.length;

  return (
    <>
      <Sidebar />

      <main className="reports-main">
        {/* Header */}
        <header className="reports-header">
          <span className="reports-badge">
            Reports
          </span>

          <h1>Reports</h1>

          <p>
            Detailed performance reports and
            metric analysis.
          </p>
        </header>

        {/* Report Overview */}
        <section className="reports-overview">
          <div className="reports-section-header">
            <div>
              <h2>Report Overview</h2>

              <p>
                A detailed view of the available
                organization metrics.
              </p>
            </div>
          </div>

          <div className="reports-overview-grid">
            <article className="reports-overview-card">
              <span>Total Records</span>

              <strong>
                {totalRecords.toLocaleString("en-IN")}
              </strong>
            </article>

            <article className="reports-overview-card">
              <span>Total Metric Value</span>

              <strong>
                {totalValue.toLocaleString("en-IN")}
              </strong>
            </article>

            <article className="reports-overview-card">
              <span>Departments</span>

              <strong>{departments}</strong>
            </article>

            <article className="reports-overview-card">
              <span>Top Metrics</span>

              <strong>{topMetricsCount}</strong>
            </article>
          </div>
        </section>

        {/* Department Analysis */}
        <section className="reports-department-section">
          <div className="reports-section-header">
            <div>
              <h2>Department Analysis</h2>

              <p>
                Detailed comparison of metric
                activity across departments.
              </p>
            </div>
          </div>

          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Records</th>
                  <th>Total Value</th>
                  <th>Average Value</th>
                </tr>
              </thead>

              <tbody>
                {departmentReport.map((item) => (
                  <tr key={item.department}>
                    <td>
                      <strong>
                        {item.department}
                      </strong>
                    </td>

                    <td>
                      {item.records.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      {item.totalValue.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      {item.averageValue.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Performing Metrics */}
        <section className="reports-top-section">
          <div className="reports-section-header">
            <div>
              <h2>Top Performing Metrics</h2>

              <p>
                Metrics with the highest recorded
                values.
              </p>
            </div>
          </div>

          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Metric</th>
                  <th>Department</th>
                  <th>Value</th>
                  <th>Date</th>
                  <th>Note</th>
                </tr>
              </thead>

              <tbody>
                {topMetrics.map((metric, index) => (
                  <tr key={metric.id}>
                    <td>
                      <strong>
                        #{index + 1}
                      </strong>
                    </td>

                    <td>{metric.title}</td>

                    <td>{metric.department}</td>

                    <td>
                      {metric.value.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>{metric.date}</td>

                    <td>{metric.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Metrics */}
<section className="reports-recent-section">
  <div className="reports-section-header">
    <div>
      <h2>Recent Metrics</h2>

      <p>
        Latest metric records available in the system.
      </p>
    </div>
  </div>

  <div className="reports-table-wrapper">
    <table className="reports-table reports-recent-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Department</th>
          <th>Value</th>
          <th>Date</th>
          <th>Note</th>
        </tr>
      </thead>

      <tbody>
        {recentMetrics.map((metric) => (
          <tr key={metric.id}>
            <td>
              <strong>#{metric.id}</strong>
            </td>

            <td>
              <strong>{metric.title}</strong>
            </td>

            <td>{metric.department}</td>

            <td>
              {metric.value.toLocaleString("en-IN")}
            </td>

            <td>{metric.date}</td>

            <td>{metric.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
      </main>
    </>
  );
}

export default Reports;