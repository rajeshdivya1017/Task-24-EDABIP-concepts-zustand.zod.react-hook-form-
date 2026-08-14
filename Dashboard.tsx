import FilterBar from "../components/FilterBar";
import KPICards from "../components/KPICards";
import Sidebar from "../components/Sidebar";
import DeptBarChart from "../components/DeptBarChart";
import TrendLineChart from "../components/TrendLineChart";

function Dashboard() {
  return (
    <>
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-badge">
              Analytics
            </span>

            <h1>EDABIP Analytics Dashboard</h1>

            <p>
              Monitor your organization metrics
              across departments.
            </p>
          </div>
        </header>

        <FilterBar />

        <KPICards />

        <DeptBarChart />

        <TrendLineChart />
      </main>
    </>
  );
}

export default Dashboard;