import { useResponsive } from "@responsive/useResponsive";
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
  const { config } = useResponsive();
  const previous = new Date("2019-12-25");
  const dateNow = new Date();

  let years = dateNow.getFullYear() - previous.getFullYear();

  const hasPassedAnniversary =
    dateNow.getMonth() > previous.getMonth() ||
    (dateNow.getMonth() === previous.getMonth() &&
      dateNow.getDate() >= previous.getDate());

  if (!hasPassedAnniversary) {
    years--;
  }
  return (
    <div className={config.stats.box}>
      {stats.map((stat, index) => (
        <div key={index} className={`${config.stats.stat}  ${stat.color}`}>
          <div className={`${config.stats.glow} bg-[${stat.bg}]`}></div>
          <div className={config.stats.num}>
            {index == 0 ? years : stat.value}
            <span style={{ color: stat.bg }}>{stat.operator}</span>
          </div>
          <div className={config.stats.label}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
