import { Outlet } from "react-router-dom";
import { useState } from "react";
import UserContext from "./context/UserContext";
import User from "./types/User";
import ExpenseContext from "./context/ExpenseContext";
import Expense from "./types/Expense";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

  return (
    <div className="bg-neutral">
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
