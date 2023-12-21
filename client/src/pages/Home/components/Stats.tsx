type Props = {};

export default function Stats({}: Props) {
  return (
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
  );
}
