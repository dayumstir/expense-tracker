import { useEffect, useState } from "react";
import { RxPlus, RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import AddForm from "./components/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { resetExpense } from "../../redux/expenseSlice";

export default function AddExpense() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSettings = useLocation().pathname.includes("settings");
  const currExpense = useSelector((state: RootState) => state.expense);
  const dispatch = useDispatch();

  useEffect(() => {
    currExpense.id && setIsDrawerOpen(true);
  }, [currExpense]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    dispatch(resetExpense());
  };

  return (
    <div className={`${isSettings ? "hidden" : ""} fixed bottom-24 right-6`}>
      <button
        className="btn btn-primary rounded-full"
        onClick={() => setIsDrawerOpen(true)}
      >
        <RxPlus size={20} />
      </button>
      <div
        onClick={closeDrawer}
        className={`fixed left-0 top-0 h-full w-full bg-black ${
          isDrawerOpen ? "visible opacity-70" : "invisible opacity-0"
        } transition-opacity duration-500`}
      />
      <div
        className={`fixed bottom-0 left-0 w-full bg-neutral ${
          isDrawerOpen
            ? "-translate-y-0 duration-300"
            : "translate-y-full duration-500"
        } transition-transform`}
      >
        <AddForm closeDrawer={closeDrawer} />
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-8 top-8"
          onClick={closeDrawer}
        >
          <RxCross2 size={24} />
        </button>
      </div>
    </div>
  );
}
