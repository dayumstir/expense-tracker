import { ChangeEvent, Dispatch, SetStateAction } from "react";

type TabsProps = {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const startYear = 2020;
const endYear = 2030;
const YEARS = Array.from(
  { length: endYear - startYear + 1 },
  (_, index) => startYear + index,
);

export default function Tabs({ month, setMonth, year, setYear }: TabsProps) {
  const handlePrevMonth = () => {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const handleNextMonth = () => {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(0);
    }
  };

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const m = event.target.value;
    setMonth(MONTHS.indexOf(m));
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const y = event.target.value;
    setYear(Number(y));
  };

  return (
    <div className="join w-full">
      <button
        className="btn join-item w-1/6 text-xl font-normal"
        onClick={handlePrevMonth}
      >
        «
      </button>
      <select
        className="btn join-item w-1/3 appearance-none px-2 normal-case"
        value={MONTHS[month]}
        onChange={handleMonthChange}
      >
        {MONTHS.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>
      <select
        className="btn join-item w-1/3 appearance-none px-2 normal-case"
        value={year}
        onChange={handleYearChange}
      >
        {YEARS.map((y) => (
          <option key={y}>{y}</option>
        ))}
      </select>
      <button
        className="btn join-item w-1/6 text-xl font-normal"
        onClick={handleNextMonth}
      >
        »
      </button>
    </div>
  );
}
