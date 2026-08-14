import { useNavigate } from "react-router-dom";
import { useDashboardStore } from "../store/useDashboardStore";

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useDashboardStore();
  const navigate = useNavigate();

  const handleMetricsClick = () => {
    navigate("/metrics");
    toggleSidebar();
  };

  const handleAddMetricClick = () => {
    navigate("/add-metric");
    toggleSidebar();
  };

  const handleDashboardClick = () => {
    navigate("/");
    toggleSidebar();
  };

  const handleReportsClick = () => {
    navigate("/reports");
    toggleSidebar();
  };

  return (
    <>
      {/* Background Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div>
            <h2 className="sidebar-logo">
              EDABIP
            </h2>

            <p className="sidebar-subtitle">
              Analytics Dashboard
            </p>
          </div>

          <button
            type="button"
            onClick={toggleSidebar}
            className="sidebar-close-button"
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        {/* Navigation Title */}
        <p className="sidebar-nav-title">
          Navigation
        </p>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {/* Dashboard */}
          <button
            type="button"
            onClick={handleDashboardClick}
            className="sidebar-nav-item sidebar-nav-active"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </button>

          {/* Metrics */}
          <button
            type="button"
            onClick={handleMetricsClick}
            className="sidebar-nav-item"
          >
            <span>📈</span>
            <span>Metrics</span>
          </button>

          {/* Add Metric */}
          <button
            type="button"
            onClick={handleAddMetricClick}
            className="sidebar-nav-item"
          >
            <span>➕</span>
            <span>Add Metric</span>
          </button>

          {/* Reports */}
          <button
            type="button"
            onClick={handleReportsClick}
            className="sidebar-nav-item"
          >
            <span>📋</span>
            <span>Reports</span>
          </button>
        </nav>
      </aside>

      {/* Menu Button */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="sidebar-menu-button"
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}
    </>
  );
};

export default Sidebar;