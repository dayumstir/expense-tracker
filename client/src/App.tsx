import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="mb-16 min-h-screen bg-neutral">
      <Outlet />
    </div>
  );
}

export default App;
