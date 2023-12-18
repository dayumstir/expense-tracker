import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Calendar from "./Calendar";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { CATEGORIES, CURRENCIES } from "../../../utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import useToast from "../../../hooks/useToast";

export default function ExpenseForm({
  closeDrawer,
}: {
  closeDrawer: () => void;
}) {
  const [currency, setCurrency] = useState("SGD");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState("Save");

  const userId = useSelector((state: RootState) => state.user.id);
  const currExpense = useSelector((state: RootState) => state.expense);
  const toast = useToast();

  useEffect(() => {
    if (currExpense.id) {
      setCurrency(currExpense.currency!);
      setAmount(String(currExpense.amount));
      setDate(currExpense.date);
      setTitle(currExpense.title!);
      setSelectedCategory(currExpense.category!);
      setType("Update");
    } else {
      resetFields();
    }
  }, [currExpense]);

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    setCurrency(currency);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value;
    const regex = /^\d{0,8}\.{0,1}\d{0,2}$/;
    regex.test(num) && setAmount(num);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const expense = {
      currency: currency,
      amount: amount,
      title: title,
      date: date,
      category: selectedCategory,
    };
    try {
      if (type === "Save") {
        await axios.post(`http://localhost:8080/expenses/${userId}`, expense);
        toast({
          type: "success",
          message: "Expense saved successfully!",
        });
      } else if (type === "Update") {
        await axios.put(
          `http://localhost:8080/expenses/${currExpense.id}`,
          expense,
        );
        toast({
          type: "success",
          message: "Expense updated successfully!",
        });
      }
      closeDrawer();
    } catch (error) {
      console.error(
        `Expense ${type === "Save" ? "creation" : "update"} failed`,
      );
      toast({
        type: "error",
        message: "Error: Something went wrong!",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/expenses/${currExpense.id}`);
      closeDrawer();
    } catch (error) {
      console.error(`Expense deletion failed`);
    }
  };

  const resetFields = () => {
    setCurrency("SGD");
    setAmount("");
    setDate(new Date());
    setTitle("");
    setSelectedCategory("");
    setType("Save");
  };

  const buttonDisabled =
    amount === "" || amount === "0" || title === "" || selectedCategory === "";

  return (
    <div className="flex w-full flex-col justify-center p-8">
      <h1 className="w-full text-3xl font-bold">{type} expense</h1>
      <form className="flex flex-col gap-2 py-4" onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <div className="join">
            <select
              className="select join-item"
              value={currency}
              onChange={handleCurrencyChange}
            >
              {CURRENCIES.map((c) => (
                <option>{c}</option>
              ))}
            </select>

            <input
              type="text"
              value={amount}
              className="input join-item w-full max-w-xs placeholder-gray-500 placeholder-opacity-50"
              placeholder="0"
              autoFocus
              onChange={handleAmountChange}
            />
          </div>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={title}
              className="input w-full max-w-xs placeholder-gray-500 placeholder-opacity-50"
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
          </div>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <Calendar date={date} setDate={setDate} />
          </div>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <input
                key={category}
                className="btn normal-case"
                type="radio"
                name="category"
                checked={category === selectedCategory}
                value={category}
                aria-label={category}
                onChange={handleCategoryChange}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex max-w-xs gap-2">
          <button
            type="submit"
            className={`btn btn-accent flex-grow ${
              buttonDisabled ? "pointer-events-none opacity-30" : ""
            }`}
          >
            {type}
          </button>
          {type === "Update" && (
            <button
              type="button"
              className="group btn hover:bg-error active:bg-error"
              onClick={handleDelete}
            >
              <RiDeleteBin6Line
                className="text-error group-hover:text-base-300 group-active:text-base-300"
                size={16}
              />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
