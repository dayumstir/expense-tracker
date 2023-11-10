import Nav from "./components/Nav";
import { Outlet, useLocation } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import { useState } from "react";
import UserContext, { User } from "./context/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <div className="bg-neutral">
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default App;
