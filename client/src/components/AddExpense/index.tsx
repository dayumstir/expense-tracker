import { useState } from "react";
import Add from "./components/Add";
import { RxPlus, RxCross2 } from "react-icons/rx";

type Props = {
  isSettings: boolean;
};

export default function AddExpense(props: Props) {
  const { isSettings } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={`${isSettings && "hidden"} fixed bottom-24 right-6`}>
      <button
        className="btn btn-primary z-50 rounded-full"
        onClick={toggleDrawer}
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
        <Add closeDrawer={closeDrawer} />
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
