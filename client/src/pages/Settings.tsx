import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div className="mb-16 p-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <button className="btn btn-accent m-10" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
