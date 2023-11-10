import Nav from "../components/Nav";
import AddExpense from "./AddExpense";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <AddExpense />
    </>
  );
}
