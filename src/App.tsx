import Home from "./components/Home";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen w-screen bg-neutral">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
