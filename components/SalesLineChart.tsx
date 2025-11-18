
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DailyCumulative } from '../types';

interface SalesLineChartProps {
  data: DailyCumulative[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-header p-3 border border-gray-600 rounded-lg shadow-lg">
        <p className="label font-bold text-gray-200">{`День: ${label}`}</p>
        <p className="intro text-cyan-400">{`План : ${payload[0].value.toLocaleString('ru-RU')} млн. руб`}</p>
        <p className="intro text-brand-orange-light">{`Факт : ${payload[1].value.toLocaleString('ru-RU')} млн. руб`}</p>
      </div>
    );
  }

  return null;
};

const SalesLineChart: React.FC<SalesLineChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="day" tick={{ fill: '#9ca3af' }} tickLine={{ stroke: '#4b5563' }} />
          <YAxis tick={{ fill: '#9ca3af' }} tickLine={{ stroke: '#4b5563' }} tickFormatter={(value) => `${value}M`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: '#d1d5db' }}/>
          <Line type="monotone" dataKey="plan" name="План" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="fact" name="Факт" stroke="#FCA311" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesLineChart;
