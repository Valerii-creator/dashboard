
import React, { useState, useMemo } from "react";
import {
  initialSalesRealizationData,
  initialProfitData,
  initialRevenueData,
  initialCostsData,
} from "./data/mockData.js";
import Dashboard from "./components/Dashboard.js";
import DataInputForm from "./components/DataInputForm.js";

const App = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Сырые данные
  const [salesRealization, setSalesRealization] = useState(initialSalesRealizationData);
  const [revenue, setRevenue] = useState(initialRevenueData);
  const [profit, setProfit] = useState(initialProfitData);
  const [costs, setCosts] = useState(initialCostsData);

  // Производные данные
  const salesPerformanceData = useMemo(() => {
    const prices = {};

    revenue.forEach((rev) => {
      const sale = salesRealization.find((s) => s.productName === rev.name);
      if (sale && sale.fact > 0) {
        prices[rev.name] = rev.value / sale.fact;
      } else {
        prices[rev.name] = 0;
      }
    });

    // спец-обработка ЛФЗУ (перевозка)
    const lfzuTransportCost = costs.find((c) => c.category === "ЛФЗУ (перевозка)");
    const lfzuTransportSale = salesRealization.find((s) => s.productName === "ЛФЗУ (перевозка)");

    if (lfzuTransportCost && lfzuTransportSale && lfzuTransportSale.plan > 0) {
      prices["ЛФЗУ (перевозка)"] = lfzuTransportCost.amount / lfzuTransportSale.plan;
    } else if (!prices["ЛФЗУ (перевозка)"]) {
      prices["ЛФЗУ (перевозка)"] = 0;
    }

    return salesRealization.map((item) => ({
      ...item,
      price: prices[item.productName] || 0,
      // допущение: 14-й день из 30-дневного месяца
      planOnDate: Math.floor(item.plan * (14 / 30)),
    }));
  }, [salesRealization, revenue, costs]);

  const handleDataSave = (newData) => {
    setSalesRealization(newData.sales);
    setRevenue(newData.revenue);
    setProfit(newData.profit);
    setCosts(newData.costs);
    setIsEditing(false);
  };

  if (isEditing) {
    return React.createElement(DataInputForm, {
      initialData: {
        sales: salesRealization,
        revenue: revenue,
        profit: profit,
        costs: costs,
      },
      onSave: handleDataSave,
      onCancel: () => setIsEditing(false),
    });
  }

  return React.createElement(Dashboard, {
    salesPerformanceData: salesPerformanceData,
    profitData: profit,
    revenueData: revenue,
    costsData: costs,
    onEdit: () => setIsEditing(true),
  });
};

export default App;
