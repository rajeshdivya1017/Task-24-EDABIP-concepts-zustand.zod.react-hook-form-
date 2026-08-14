import { useState } from "react";
import { useDashboardStore } from "../store/useDashboardStore";
import { useMetricsStore } from "../store/useMetricsStore";
import Sidebar from "../components/Sidebar";
import FilterBar from "../components/FilterBar";
import MetricForm from "../components/MetricForm";
import type { Metric } from "../types";
import type { MetricFormData } from "../schemas";

function MetricsList() {
  const { department, fromDate, toDate } =
    useDashboardStore();

  const metrics = useMetricsStore(
    (state) => state.metrics
  );

  const updateMetric = useMetricsStore(
    (state) => state.updateMetric
  );

  const deleteMetric = useMetricsStore(
    (state) => state.deleteMetric
  );

  const [search, setSearch] = useState("");
  const [editingMetric, setEditingMetric] =
    useState<Metric | null>(null);

  const [deletingMetricId, setDeletingMetricId] =
  useState<Metric["id"] | null>(null);

  const filteredMetrics = metrics.filter((metric) => {
    const matchesDepartment =
      department === "All" ||
      metric.department === department;

    const matchesFromDate =
      !fromDate || metric.date >= fromDate;

    const matchesToDate =
      !toDate || metric.date <= toDate;

    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      !searchTerm ||
      metric.title
        .toLowerCase()
        .includes(searchTerm) ||
      metric.department
        .toLowerCase()
        .includes(searchTerm) ||
      metric.note
        ?.toLowerCase()
        .includes(searchTerm);

    return (
      matchesDepartment &&
      matchesFromDate &&
      matchesToDate &&
      matchesSearch
    );
  });

  const handleEditSubmit = (
    data: MetricFormData
  ) => {
    if (!editingMetric) {
      return;
    }

    updateMetric({
      id: editingMetric.id,
      title: data.title,
      value: data.value,
      department: data.department,
      date: data.date,
      ...(data.note ? { note: data.note } : {}),
    });

    setEditingMetric(null);
  };

  const handleDelete = () => {
    if (deletingMetricId === null) {
      return;
    }

    deleteMetric(deletingMetricId);
    setDeletingMetricId(null);
  };

  return (
    <>
      <Sidebar />

      <main className="metrics-main">
        <header className="metrics-header">
          <span className="metrics-badge">
            Metrics
          </span>

          <h1>Metrics List</h1>

          <p>
            View and filter all organization metrics.
          </p>
        </header>

        <FilterBar />

        <div className="metrics-search">
          <label htmlFor="metric-search">
            Search Metrics
          </label>

          <input
            id="metric-search"
            type="text"
            placeholder="Search by title, department or note..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        {editingMetric && (
          <div className="add-metric-card">
            <div className="metrics-header">
              <span className="metrics-badge">
                Edit
              </span>

              <h2>Edit Metric</h2>

              <p>
                Update the selected metric details.
              </p>
            </div>

            <MetricForm
              defaultValues={{
                title: editingMetric.title,
                value: editingMetric.value,
                department:
                  editingMetric.department,
                date: editingMetric.date,
                note: editingMetric.note ?? "",
              }}
              submitLabel="Update Metric"
              onSubmit={handleEditSubmit}
            />

            <button
              type="button"
              className="add-metric-button"
              onClick={() =>
                setEditingMetric(null)
              }
            >
              Cancel Edit
            </button>
          </div>
        )}

        <div className="metrics-summary">
          <strong>
            Showing {filteredMetrics.length} of{" "}
            {metrics.length} metrics
          </strong>
        </div>

        {filteredMetrics.length === 0 ? (
          <div className="metrics-empty">
            <div className="metrics-empty-icon">
              📊
            </div>

            <h2>No Metrics Found</h2>

            <p>
              No metrics match the selected filters
              or search.
            </p>
          </div>
        ) : (
          <div className="metrics-table-container">
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Value</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredMetrics.map((metric) => (
                  <tr key={metric.id}>
                    <td className="metric-title">
                      {metric.title}
                    </td>

                    <td className="metric-value">
                      {metric.value.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      <span className="department-badge">
                        {metric.department}
                      </span>
                    </td>

                    <td className="metric-date">
                      {metric.date}
                    </td>

                    <td className="metric-note">
                      {metric.note || "-"}
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() => {
                           setEditingMetric(metric);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeletingMetricId(
                            metric.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {deletingMetricId !== null && (
          <div className="delete-confirmation">
            <div className="delete-confirmation-card">
              <h2>Delete Metric?</h2>

              <p>
                Are you sure you want to delete this
                metric? This action cannot be undone.
              </p>

              <div className="delete-confirmation-actions">
                <button
                  type="button"
                  onClick={() =>
                    setDeletingMetricId(null)
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default MetricsList;