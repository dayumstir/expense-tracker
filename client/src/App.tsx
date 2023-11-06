import Nav from "./components/Nav";
import { Outlet, useLocation } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import { useEffect } from "react";

function App() {
  const isSettings = useLocation().pathname.includes("settings");

  return (
    <div className="bg-neutral">
      <Nav />
      <Outlet />
      <AddExpense isSettings={isSettings} />
    </div>
  );
}

export default App;
