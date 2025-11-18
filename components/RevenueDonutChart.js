import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Revenue } from '../types';

interface RevenueDonutChartProps {
  data: Revenue[];
}

const COLORS = ['#FCA311', '#0055A4', '#E85D04', '#16a34a', '#6366f1', '#ec4899', '#84cc16'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-header p-3 border border-gray-600 rounded-lg shadow-lg">
        <p className="font-bold text-gray-200">{payload[0].name}</p>
        <p className="text-brand-orange-light">{`Выручка: ${(payload[0].value / 1000).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} млн. руб (${payload[0].payload.percent}%)`}</p>
      </div>
    );
  }
  return null;
};


const RevenueDonutChart: React.FC<RevenueDonutChartProps> = ({ data }) => {
  const chartData = data
    .filter(item => item.value > 0)
    .sort((a,b) => b.value - a.value);

  const totalValue = chartData.reduce((sum, entry) => sum + entry.value, 0);

  const dataWithPercent = chartData.map(entry => ({
    ...entry,
    percent: ((entry.value / totalValue) * 100).toFixed(1)
  }));

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={dataWithPercent}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {dataWithPercent.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend 
            iconSize={10}
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ color: "#d1d5db", paddingTop: "10px", lineHeight: "20px" }}
           />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueDonutChart;
