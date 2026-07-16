import React from 'react';

const stats = [
  { value: '5', label: 'Years Experience',operator:'+' },
  { value: '10', label: 'Systems Delivered',operator:'+' },
  { value: '30', label: 'HR Workload Reduced',operator:'%' },
  { value: '15', label: 'Load Time Improved',operator:'%' },
];

interface StatsProps{
  className?:string;
}

const Stats: React.FC = ({
  className=''
}:StatsProps) => {
  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`stat ${className}`}
        >
          <div className="stat-num">
            {stat.value}<span>{stat.operator}</span>
          </div>
          <div className="stat-label">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;