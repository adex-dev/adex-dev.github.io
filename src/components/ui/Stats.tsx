import React from "react";

const stats = [
  {
    value: "5",
    label: "Years Experience",
    operator: "+",
    color: "stat-primary",
    bg: "#6366f1",
  },
  {
    value: "10",
    label: "Systems Delivered",
    operator: "+",
    color: "stat-rust",
    bg: "#c85e3a",
  },
  {
    value: "30",
    label: "HR Workload Reduced",
    operator: "%",
    color: "stat-teal",
    bg: "#2dd4bf",
  },
  {
    value: "15",
    label: "Load Time Improved",
    operator: "%",
    color: "stat-surface",
    bg: "#3b82f6",
  },
];

const Stats: React.FC = () => {
  return (
    <div className='stats'>
      {stats.map((stat, index) => (
        <div key={index} className={`stat  ${stat.color}`}>
          <div className={`stat-glow bg-[${stat.bg}]`}></div>
          <div className={`stat-num`}>
            {stat.value}
            <span  style={{ color: stat.bg }}>{stat.operator}</span>
          </div>
          <div className='stat-label'>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
