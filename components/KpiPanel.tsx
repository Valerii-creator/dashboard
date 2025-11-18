
import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, PieChart } from 'lucide-react';

interface KpiPanelProps {
  data: {
    totalRevenueFact: number;
    profit: number;
  };
}

const formatCurrency = (value: number) => {
  return `${(value / 1000).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} млн. руб`;
};

const KpiCard: React.FC<{
  title: string;
  value: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}> = ({ title, value, isPositive = true, icon }) => {
  
  return (
    <div className="bg-card p-4 rounded-xl flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className={`text-2xl font-bold mt-1 ${isPositive ? 'text-white' : 'text-red-400'}`}>{value}</p>
      </div>
      <div className="bg-card-header p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
};


const KpiPanel: React.FC<KpiPanelProps> = ({ data }) => {
  const { totalRevenueFact, profit } = data;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <KpiCard
        title="Общая выручка (Факт)"
        value={formatCurrency(totalRevenueFact)}
        icon={<DollarSign className="w-6 h-6 text-brand-orange-light"/>}
      />
      <KpiCard
        title="Прибыль без НДС"
        value={formatCurrency(profit)}
        isPositive={profit >= 0}
        icon={<PieChart className="w-6 h-6 text-brand-orange-light"/>}
      />
    </div>
  );
};

export default KpiPanel;
