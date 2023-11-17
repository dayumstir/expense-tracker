import { Dispatch, useContext, useEffect, useState } from "react";
import { IoIosCalendar } from "react-icons/io";
import { DayPicker, DayPickerDefaultProps } from "react-day-picker";
import ExpenseContext from "../../../context/ExpenseContext";
import dayjs from "dayjs";

type CalendarProps = {
  date: Date | undefined;
  setDate: Dispatch<React.SetStateAction<Date | undefined>>;
};

const classNames: DayPickerDefaultProps["classNames"] = {
  vhidden: "sr-only",
  caption: "flex justify-center items-center h-10",
  root: "base-content py-2 px-4",
  months: "",
  caption_label: "text-lg font-bold text-primary px-2 text-center",
  nav_button:
    "inline-flex justify-center items-center absolute top-2 w-10 h-10",
  nav_button_next: "right-4",
  nav_button_previous: "left-4",
  head_cell: "w-10 h-10",
  cell: "px-0",
  day: "w-10 h-10",
  day_selected: "bg-primary text-white rounded-full",
  day_today: "font-bold text-primary",
  day_disabled: "",
  day_outside: "opacity-40",
  day_hidden: "hidden",
};

export default function Calendar({ date, setDate }: CalendarProps) {
  const { currentExpense, setCurrentExpense } = useContext(ExpenseContext);

  useEffect(() => {
    if (currentExpense) {
      setDate(currentExpense.date);
    }
  }, [currentExpense]);

  const handleDateSelection = () => {
    // Close calendar
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="dropdown w-full max-w-xs">
      <label
        tabIndex={0}
        id="calendar-button"
        className="btn w-full bg-base-100"
      >
        <div className="pointer-events-none absolute left-5 flex items-center gap-4">
          <IoIosCalendar size={22} />
          <p className="text-base font-normal normal-case">
            {date ? dayjs(date).format("D MMM YYYY") : "Please select a date"}
          </p>
        </div>
      </label>
      <div
        tabIndex={0}
        className="dropdown-content top-0 z-10 rounded-md bg-base-100 shadow"
      >
        <DayPicker
          classNames={classNames}
          mode="single"
          required
          selected={date}
          onSelect={setDate}
          onDayClick={handleDateSelection}
          showOutsideDays
        />
      </div>
    </div>
  );
}
