
import React from 'react';
import type { Cost } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CostsSectionProps {
  costs: Cost[];
  profit: number;
}

const COLORS = ['#0055A4', '#FCA311', '#E85D04'];

const CostsSection: React.FC<CostsSectionProps> = ({ costs, profit }) => {
  const totalCosts = costs.reduce((sum, item) => sum + item.amount, 0);
  const chartData = [...costs, { category: 'Прибыль', amount: profit }];

  const formatTooltipValue = (value: number) => {
    return `${(value / 1000).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} млн. руб`;
  };

  return (
    <div className="h-full flex flex-col justify-between">
       <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-red-900/30 p-3 rounded-lg text-center">
            <p className="text-sm text-red-300">Всего затрат</p>
            <p className="text-lg font-bold text-white">{(totalCosts / 1000).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} млн. руб</p>
        </div>
        <div className="bg-green-900/30 p-3 rounded-lg text-center">
            <p className="text-sm text-green-300">Прибыль</p>
            <p className="text-lg font-bold text-white">{(profit / 1000).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} млн. руб</p>
        </div>
       </div>

      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="category" width={120} tick={{ fill: '#9ca3af' }} tickLine={false} axisLine={false} />
            <Tooltip
                cursor={{fill: 'rgba(255,255,255,0.1)'}}
                contentStyle={{
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '0.5rem'
                }}
                formatter={formatTooltipValue}
            />
            <Bar dataKey="amount" name="Сумма" barSize={20}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.category === 'Прибыль' ? '#16a34a' : COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostsSection;
