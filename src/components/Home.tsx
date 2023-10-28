
export default function Home() {
  return (
    <main className="w-full p-8">
      <h2 className="text-2xl font-bold">Welcome,</h2>
      <h1 className="text-5xl font-bold tracking-wider text-accent">Rachel</h1>

      <div className="stats stats-vertical my-4 shadow lg:stats-horizontal ">
        <div className="stat">
          <div className="stat-title">This month you have spent</div>
          <div className="stat-value text-primary">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Users</div>
          <div className="stat-value text-secondary">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </main>
  );
}
