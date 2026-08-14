import { useDashboardStore } from '../store/useDashboardStore'
import type { DashboardDepartment } from '../types'

const departments: DashboardDepartment[] = [
  'All',
  'Sales',
  'Marketing',
  'HR',
  'Finance',
  'Operations',
]

function FilterBar() {
  const {
    department,
    fromDate,
    toDate,
    dateMode,
    setDepartment,
    setFromDate,
    setToDate,
    setDateMode,
    resetFilters,
  } = useDashboardStore()

  return (
    <section className="filter-section">
      <div className="filter-header">
        <div>
          <h2>Dashboard Filters</h2>

          <p>
            Filter your dashboard metrics by department
            and date.
          </p>
        </div>

        <button
          type="button"
          className="reset-filter-button"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>

      <div className="filter-controls">
        {/* Department Filter */}
        <div className="filter-field">
          <label htmlFor="department">
            Department
          </label>

          <select
            id="department"
            value={department}
            onChange={(event) =>
              setDepartment(
                event.target.value as DashboardDepartment
              )
            }
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter Mode */}
        <div className="filter-field">
          <label htmlFor="dateMode">
            Date Filter
          </label>

          <select
            id="dateMode"
            value={dateMode}
            onChange={(event) =>
              setDateMode(
                event.target.value as
                  | 'all'
                  | 'exact'
                  | 'range'
              )
            }
          >
            <option value="all">All Dates</option>
            <option value="exact">Exact Date</option>
            <option value="range">Date Range</option>
          </select>
        </div>

        {/* Exact Date */}
        {dateMode === 'exact' && (
          <div className="filter-field">
            <label htmlFor="exactDate">
              Exact Date
            </label>

            <input
              id="exactDate"
              type="date"
              value={fromDate}
              onChange={(event) => {
                setFromDate(event.target.value)
                setToDate(event.target.value)
              }}
            />
          </div>
        )}

        {/* Date Range */}
        {dateMode === 'range' && (
          <>
            <div className="filter-field">
              <label htmlFor="fromDate">
                From Date
              </label>

              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(event) =>
                  setFromDate(event.target.value)
                }
              />
            </div>

            <div className="filter-field">
              <label htmlFor="toDate">
                To Date
              </label>

              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(event) =>
                  setToDate(event.target.value)
                }
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default FilterBar