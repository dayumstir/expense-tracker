import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="mb-16 min-h-screen bg-neutral p-8">
      <Outlet />
    </div>
  );
}

export default App;
