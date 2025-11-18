
import React from 'react';
import type { SalesPerformance } from '../types';

interface ProductPerformanceTableProps {
  data: SalesPerformance[];
}

const getPerformanceColor = (percentage: number) => {
  if (percentage >= 100) return 'bg-green-500/20 text-green-400';
  if (percentage >= 90) return 'bg-yellow-500/20 text-yellow-400';
  return 'bg-red-500/20 text-red-400';
};

const ProductPerformanceTable: React.FC<ProductPerformanceTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-card-header">
          <tr>
            <th scope="col" className="px-6 py-3">Продукт</th>
            <th scope="col" className="px-6 py-3 text-right">План</th>
            <th scope="col" className="px-6 py-3 text-right">Факт</th>
            <th scope="col" className="px-6 py-3 text-right">Сумма (Факт), млн. руб</th>
            <th scope="col" className="px-6 py-3 text-center">Выполнение</th>
            <th scope="col" className="px-6 py-3 text-right">Отклонение</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            const sum = item.fact * item.price;
            const deviation = item.fact - item.plan;
            const percentage = item.plan > 0 ? (item.fact / item.plan) * 100 : item.fact > 0 ? 100 : 0;
            const isError = isNaN(percentage) || !isFinite(percentage);

            return (
              <tr key={item.productName} className="border-b border-gray-700 hover:bg-gray-800/50">
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {item.productName} <span className="text-gray-500">({item.unit})</span>
                </th>
                <td className="px-6 py-4 text-right">{item.plan.toLocaleString('ru-RU')}</td>
                <td className="px-6 py-4 text-right font-bold text-white">{item.fact.toLocaleString('ru-RU')}</td>
                <td className="px-6 py-4 text-right">{(sum / 1000).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 text-center">
                  {isError ? (
                     <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                      N/A
                    </span>
                  ) : (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPerformanceColor(percentage)}`}>
                      {percentage.toFixed(1)}%
                    </span>
                  )}
                </td>
                <td className={`px-6 py-4 text-right font-medium ${deviation >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {deviation.toLocaleString('ru-RU')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPerformanceTable;
