import React from "react";
import UrlTable from "../Components/UrlTable";
import AddUrlForm from "../Components/AddUrlForm";
import "../Styles/Dashboard.css"
export const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <AddUrlForm />
      <UrlTable />
    </div>
  );
};

export default DashboardPage;
