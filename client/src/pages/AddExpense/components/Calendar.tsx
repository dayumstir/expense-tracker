import { Dispatch, useEffect, useRef, useState } from "react";
import { IoIosCalendar } from "react-icons/io";
import { DayPicker, DayPickerDefaultProps } from "react-day-picker";
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
  const [isVisible, setIsVisible] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the clicked element is outside the calendar component
      if (!calendarRef?.current?.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openCalendar = () => {
    setIsVisible(true);
    setDate(date);
  };

  return (
    <div className="w-full max-w-xs" ref={calendarRef}>
      <div
        className="btn flex w-full justify-start gap-4 bg-base-100"
        onClick={openCalendar}
      >
        <IoIosCalendar size={22} />
        <p className="text-base font-normal normal-case">
          {date ? dayjs(date).format("D MMM YYYY") : "Please select a date"}
        </p>
      </div>
      {isVisible && (
        <div className="absolute z-10 -mt-12 rounded-md bg-base-100 shadow">
          <DayPicker
            classNames={classNames}
            mode="single"
            required
            selected={new Date(date ?? new Date())}
            onSelect={setDate}
            onDayClick={() => setIsVisible(false)}
            showOutsideDays
            defaultMonth={new Date(date ?? new Date())}
          />
        </div>
      )}
    </div>
  );
}
