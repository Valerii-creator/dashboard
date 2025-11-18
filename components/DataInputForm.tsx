
import React, { useState } from 'react';
import type { SalesPerformance, Profit, Revenue, Cost } from '../types';

interface DataInputFormProps {
  initialData: {
    sales: Omit<SalesPerformance, 'planOnDate' | 'price'>[];
    revenue: Revenue[];
    profit: Profit[];
    costs: Cost[];
  };
  onSave: (data: DataInputFormProps['initialData']) => void;
  onCancel: () => void;
}

const DataInputForm: React.FC<DataInputFormProps> = ({ initialData, onSave, onCancel }) => {
  const [sales, setSales] = useState(initialData.sales);
  const [revenue, setRevenue] = useState(initialData.revenue);
  const [profit, setProfit] = useState(initialData.profit);
  const [costs, setCosts] = useState(initialData.costs);

  const handleSalesChange = (index: number, field: 'plan' | 'fact', value: string) => {
    const newSales = [...sales];
    newSales[index] = { ...newSales[index], [field]: Number(value) || 0 };
    setSales(newSales);
  };
  
  const handleRevenueChange = (index: number, value: string) => {
    const newRevenue = [...revenue];
    newRevenue[index] = { ...newRevenue[index], value: Number(value) || 0 };
    setRevenue(newRevenue);
  };
  
  const handleProfitChange = (index: number, value: string) => {
    const newProfit = [...profit];
    newProfit[index] = { ...newProfit[index], profit: Number(value) || 0 };
    setProfit(newProfit);
  };

  const handleCostsChange = (index: number, value: string) => {
    const newCosts = [...costs];
    newCosts[index] = { ...newCosts[index], amount: Number(value) || 0 };
    setCosts(newCosts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ sales, revenue, profit, costs });
  };

  const inputClass = "w-full bg-card-header border border-gray-600 rounded-md p-2 text-right focus:ring-2 focus:ring-brand-orange-light focus:border-brand-orange-light outline-none transition";
  const labelClass = "block text-sm font-medium text-gray-300";

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Редактирование данных</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Sales Data */}
          <div className="bg-card p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-100 mb-4">Реализация (план/факт)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sales.map((item, index) => (
                <div key={item.productName} className="space-y-2">
                  <label className={labelClass}>{item.productName} ({item.unit})</label>
                  <div className="flex space-x-2">
                    <input type="number" placeholder="План" value={item.plan} onChange={(e) => handleSalesChange(index, 'plan', e.target.value)} className={inputClass} />
                    <input type="number" placeholder="Факт" value={item.fact} onChange={(e) => handleSalesChange(index, 'fact', e.target.value)} className={inputClass} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Revenue, Profit, Costs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-xl shadow-lg space-y-4">
              <h2 className="text-xl font-bold text-gray-100">Поступления (тыс.руб)</h2>
              {revenue.map((item, index) => (
                 <div key={item.name}>
                  <label className={labelClass}>{item.name}</label>
                  <input type="number" value={item.value} onChange={(e) => handleRevenueChange(index, e.target.value)} className={inputClass} />
                 </div>
              ))}
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg space-y-4">
              <h2 className="text-xl font-bold text-gray-100">Прибыль (тыс.руб)</h2>
               {profit.map((item, index) => (
                 <div key={item.productName}>
                  <label className={labelClass}>{item.productName}</label>
                  <input type="number" value={item.profit} onChange={(e) => handleProfitChange(index, e.target.value)} className={inputClass} />
                 </div>
              ))}
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg space-y-4">
              <h2 className="text-xl font-bold text-gray-100">Затраты (тыс.руб)</h2>
               {costs.map((item, index) => (
                 <div key={item.category}>
                  <label className={labelClass}>{item.category}</label>
                  <input type="number" value={item.amount} onChange={(e) => handleCostsChange(index, e.target.value)} className={inputClass} />
                 </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors">
              Отмена
            </button>
            <button type="submit" className="px-6 py-2 bg-brand-orange-light text-background font-bold rounded-lg hover:bg-brand-orange-dark transition-colors">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataInputForm;
