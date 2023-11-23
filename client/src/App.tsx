import { Outlet } from "react-router-dom";
import { useState } from "react";
import UserContext from "./context/UserContext";
import { User, Expense } from "./modelTypes";
import ExpenseContext from "./context/ExpenseContext";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

  return (
    <div className="bg-neutral min-h-screen">
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <ExpenseContext.Provider
          value={{
            currentExpense,
            setCurrentExpense,
          }}
        >
          <Outlet />
        </ExpenseContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
