import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Home() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <main className="mb-16 w-full p-8">
      <h2 className="text-3xl font-bold">Hello,</h2>
      <h1 className="text-5xl font-bold text-accent">
        {currentUser?.name + "!"}
      </h1>
      <div className="join join-vertical my-4 w-full max-w-xs rounded-xl">
        <div className="join-item stats">
          <div className="stat">
            <div className="stat-title">This month you have spent</div>
            <div className="stat-value text-primary">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        </div>
        <div className="join-item stats stats-horizontal">
          <div className="stat">
            <div className="stat-title">Highest </div>
            <div className="stat-value text-secondary">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </main>
  );
}
