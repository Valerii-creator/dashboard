
import React, { useState, useMemo, useRef } from 'react';
import type { SalesPerformance, ProductGroup, Profit, Revenue, Cost } from '../types';
import DashboardHeader from './DashboardHeader';
import KpiPanel from './KpiPanel';
import RevenueDonutChart from './RevenueDonutChart';
import ProductPerformanceTable from './ProductPerformanceTable';
import RiskHighlight from './RiskHighlight';
import CostsSection from './CostsSection';
import html2canvas from 'html2canvas';

interface DashboardProps {
    salesPerformanceData: SalesPerformance[];
    profitData: Profit[];
    revenueData: Revenue[];
    costsData: Cost[];
    onEdit: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ salesPerformanceData, profitData, revenueData, costsData, onEdit }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductGroup | 'All'>('All');
  
  const dashboardRef = useRef<HTMLDivElement>(null);

  const productOptions = useMemo<(ProductGroup | 'All')[]>(() => [
    'All',
    ...Array.from(new Set(salesPerformanceData.map(p => p.productName)))
  ], [salesPerformanceData]);

  const filteredSalesData = useMemo(() => {
    if (selectedProduct === 'All') {
      return salesPerformanceData;
    }
    return salesPerformanceData.filter(item => item.productName === selectedProduct);
  }, [selectedProduct, salesPerformanceData]);
  
  const totalFact = useMemo(() => {
    const dataToConsider = selectedProduct === 'All'
      ? salesPerformanceData.filter(item => item.productName !== 'ЛФЗУ (перевозка)')
      : salesPerformanceData.filter(item => item.productName === selectedProduct);
    return dataToConsider.reduce((sum, item) => sum + item.fact * item.price, 0);
  }, [selectedProduct, salesPerformanceData]);

  const totalProfit = useMemo(() => {
    if (selectedProduct === 'All') {
      return profitData.reduce((sum, item) => sum + item.profit, 0);
    }
    const productProfit = profitData.find(item => item.productName === selectedProduct);
    return productProfit ? productProfit.profit : 0;
  }, [selectedProduct, profitData]);

  const kpiValues = {
    totalRevenueFact: totalFact,
    profit: totalProfit,
  };

  const handleExport = () => {
    if (dashboardRef.current) {
      html2canvas(dashboardRef.current, { backgroundColor: '#020617' }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'financial-dashboard.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 font-sans">
      <div ref={dashboardRef} className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader
          productOptions={productOptions}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          onExport={handleExport}
          onEdit={onEdit}
        />

        <main>
          <KpiPanel data={kpiValues} />
          
          <div className="mt-6 bg-card rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-100 mb-4">Детализация по продуктам</h2>
            <ProductPerformanceTable data={filteredSalesData} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-card rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-100 mb-4">Выручка по группам</h2>
              <RevenueDonutChart data={revenueData} />
            </div>
            <div className="bg-card rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-100 mb-4">Зоны риска (Топ-3 по отклонению)</h2>
              <RiskHighlight data={salesPerformanceData} />
            </div>
            <div className="bg-card rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-100 mb-4">Затраты и Прибыль</h2>
              <CostsSection costs={costsData} profit={totalProfit} />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
