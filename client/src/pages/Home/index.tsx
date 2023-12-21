import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import BarGraph from "./components/BarGraph";
import Stats from "./components/Stats";
import axios from "axios";
import { useEffect, useState } from "react";

type monthlyTotal = {
  month: string;
  amount: number;
};

export default function Home() {
  const currUser = useSelector((state: RootState) => state.user);
  const [monthlyTotals, setMonthlyTotals] = useState<monthlyTotal[]>([]);
  const NUMBER_OF_MONTHS = 5;

  const fetchExpensesTotalByMonth = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/expenses/${currUser.id}/${NUMBER_OF_MONTHS}`,
      );
      setMonthlyTotals(response.data);
    } catch (error) {
      console.error("Expense retrieval failed");
    }
  };

  useEffect(() => {
    fetchExpensesTotalByMonth();
  }, []);

  return (
    <main>
      <h2 className="text-3xl font-bold">Hello,</h2>
      <h1 className="text-5xl font-bold text-accent">{currUser.name + "!"}</h1>
      <Stats />
      <div className="h-80 max-w-xs">
        <BarGraph data={monthlyTotals} />
      </div>
    </main>
  );
}
