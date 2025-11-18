
import React from 'react';
import type { ProductGroup } from '../types';
import { Download, SlidersHorizontal, Pencil } from 'lucide-react';

interface DashboardHeaderProps {
  productOptions: (ProductGroup | 'All')[];
  selectedProduct: ProductGroup | 'All';
  setSelectedProduct: (product: ProductGroup | 'All') => void;
  onExport: () => void;
  onEdit: () => void;
}


const DashboardHeader: React.FC<DashboardHeaderProps> = ({ productOptions, selectedProduct, setSelectedProduct, onExport, onEdit }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Финансовый Дашборд</h1>
        <p className="text-sm text-gray-400">Статус на 14 ноября 2025 г.</p>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4 w-full md:w-auto">
        <div className="relative flex-grow md:flex-grow-0">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value as ProductGroup | 'All')}
            className="w-full pl-10 pr-4 py-2 bg-card border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange-light focus:border-brand-orange-light outline-none transition"
          >
            {productOptions.map(option => (
              <option key={option} value={option}>{option === 'All' ? 'Все продукты' : option}</option>
            ))}
          </select>
        </div>
        <button
          onClick={onEdit}
          title="Редактировать данные"
          className="flex items-center justify-center p-2.5 bg-card border border-gray-600 text-brand-orange-light font-bold rounded-lg hover:bg-gray-700 transition-colors duration-300"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={onExport}
          title="Экспорт в PNG"
          className="flex items-center justify-center px-4 py-2 bg-brand-orange-light text-background font-bold rounded-lg hover:bg-brand-orange-dark transition-colors duration-300"
        >
          <Download className="w-5 h-5 sm:mr-2" />
          <span className="hidden sm:inline">Экспорт</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
