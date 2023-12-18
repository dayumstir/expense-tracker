import Nav from "../components/Nav";
import Toast from "../components/Toast";
import AddExpense from "./AddExpense";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <AddExpense />
      <Toast />
    </>
  );
}
