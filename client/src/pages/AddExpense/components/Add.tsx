import { useState, useEffect, ChangeEvent, FormEvent, useContext } from "react";
import Calendar from "./Calendar";
import axios from "axios";
import UserContext from "../../../context/UserContext";

type Props = {
  closeDrawer: Function;
};

export default function Add(props: Props) {
  const { closeDrawer } = props;

  const [currency, setCurrency] = useState("SGD");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const categories = [
    "Food",
    "Travel",
    "Entertainment",
    "Fashion",
    "Sports",
    "Healthcare",
  ];

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    setCurrency(currency);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value;
    const regex = /^\d{0,8}\.{0,1}\d{0,2}$/;
    if (regex.test(num)) {
      setAmount(num);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleDateCallback = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const expense = {
        currency: currency,
        amount: amount,
        title: title,
        date: date,
        category: selectedCategory,
      };
      const response = await axios.post(
        `http://localhost:8080/expenses/${currentUser?.id}`,
        expense,
      );
      resetFields();
      closeDrawer();
    } catch (error) {
      console.error("Expense creation failed:", error);
    }
  };

  const resetFields = () => {
    setCurrency("SGD");
    setAmount("");
    setDate(new Date());
    setTitle("");
    setSelectedCategory("");
  };

  const buttonDisabled =
    amount === "" || amount === "0" || title === "" || selectedCategory === "";

  return (
    <div className="flex w-full flex-col justify-center p-8">
      <h1 className="w-full text-3xl font-bold">Add expense</h1>
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
              <option>SGD</option>
              <option>MYR</option>
              <option>AUD</option>
              <option>KRW</option>
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
            <Calendar callback={handleDateCallback} />
          </div>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              return (
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
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-accent btn-block mt-6 max-w-xs ${
            buttonDisabled && "pointer-events-none opacity-30"
          }`}
        >
          Save
        </button>
      </form>
    </div>
  );
}
