import { useState } from "react";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import Datepicker from "tailwind-datepicker-react";

type Props = {
  callback: Function;
};

export default function Calendar(props: Props) {
  const [show, setShow] = useState<boolean>(false);

  const handleChange = (selectedDate: Date) => {
    props.callback(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <Datepicker
      classNames="relative"
      options={options}
      onChange={handleChange}
      show={show}
      setShow={handleClose}
    />
  );
}

const options = {
  title: "",
  autoHide: true,
  todayBtn: true,
  clearBtn: false,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "",
    todayBtn:
      "btn normal-case dark:bg-primary dark:border-none dark:hover:bg-primary/80 dark:focus:ring-0",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "opacity-30",
    input: "",
    inputIcon: "",
    selected: "dark:bg-primary dark:hover:bg-primary/90",
  },
  icons: {
    prev: () => <RxArrowLeft />,
    next: () => <RxArrowRight />,
  },
  datepickerClassNames: "-top-[405px]",
  defaultDate: new Date(),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
};
