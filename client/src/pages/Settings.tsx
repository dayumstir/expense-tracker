import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <button className="btn btn-accent m-10" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
