
import React, { useState, useMemo } from 'react';
import {
  initialSalesRealizationData,
  initialProfitData,
  initialRevenueData,
  initialCostsData,
} from './data/mockData';
import type { SalesPerformance, ProductGroup, Profit, Revenue, Cost } from './types';
import Dashboard from './components/Dashboard';
import DataInputForm from './components/DataInputForm';


const App: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // State for all raw data
  const [salesRealization, setSalesRealization] = useState(initialSalesRealizationData);
  const [revenue, setRevenue] = useState(initialRevenueData);
  const [profit, setProfit] = useState(initialProfitData);
  const [costs, setCosts] = useState(initialCostsData);

  // Derived data calculation, moved from mockData.ts to here to be reactive
  const salesPerformanceData = useMemo<SalesPerformance[]>(() => {
    const prices: Record<string, number> = {};
    revenue.forEach(rev => {
      const sale = salesRealization.find(s => s.productName === rev.name);
      if (sale && sale.fact > 0) {
        prices[rev.name] = rev.value / sale.fact;
      } else {
        prices[rev.name] = 0; // Default price if no sales
      }
    });

    // Special handling for services not in revenue data but in costs
    const lfzuTransportCost = costs.find(c => c.category === 'ЛФЗУ (перевозка)');
    const lfzuTransportSale = salesRealization.find(s => s.productName === 'ЛФЗУ (перевозка)');
    if (lfzuTransportCost && lfzuTransportSale && lfzuTransportSale.plan > 0) {
        prices['ЛФЗУ (перевозка)'] = lfzuTransportCost.amount / lfzuTransportSale.plan;
    } else {
        prices['ЛФЗУ (перевозка)'] = 0;
    }


    return salesRealization.map(item => ({
      ...item,
      price: prices[item.productName] || 0,
      planOnDate: Math.floor(item.plan * (14 / 30)), // Assuming 14th day of a 30-day month
    }));
  }, [salesRealization, revenue, costs]);

  const handleDataSave = (newData: {
    sales: Omit<SalesPerformance, 'planOnDate' | 'price'>[];
    revenue: Revenue[];
    profit: Profit[];
    costs: Cost[];
  }) => {
    setSalesRealization(newData.sales);
    setRevenue(newData.revenue);
    setProfit(newData.profit);
    setCosts(newData.costs);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <DataInputForm
        initialData={{
          sales: salesRealization,
          revenue: revenue,
          profit: profit,
          costs: costs,
        }}
        onSave={handleDataSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Dashboard
      salesPerformanceData={salesPerformanceData}
      profitData={profit}
      revenueData={revenue}
      costsData={costs}
      onEdit={() => setIsEditing(true)}
    />
  );
};

export default App;
