import React from 'react';

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '10+', label: 'Systems Delivered' },
  { value: '30%', label: 'HR Workload Reduced' },
  { value: '15%', label: 'Load Time Improved' },
];

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-4 border-y border-[#1F2D45]">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`py-10 px-16 ${index < 3 ? 'border-r border-[#1F2D45]' : ''}`}
        >
          <div className="font-mono text-[2.4rem] font-bold text-[#E8EBF0] leading-none mb-1.5">
            {stat.value}
          </div>
          <div className="text-[0.8rem] text-[#8B98B0] uppercase tracking-[0.06em]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;