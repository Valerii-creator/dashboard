
import React, { useState, useMemo, useRef } from "react";
import DashboardHeader from "./DashboardHeader.js";
import KpiPanel from "./KpiPanel.js";
import RevenueDonutChart from "./RevenueDonutChart.js";
import ProductPerformanceTable from "./ProductPerformanceTable.js";
import RiskHighlight from "./RiskHighlight.js";
import CostsSection from "./CostsSection.js";
import html2canvas from "html2canvas";

const Dashboard = (props) => {
  const {
    salesPerformanceData,
    profitData,
    revenueData,
    costsData,
    onEdit,
  } = props;

  const [selectedProduct, setSelectedProduct] = useState("All");
  const dashboardRef = useRef(null);

  const productOptions = useMemo(() => {
    const uniqueProducts = Array.from(
      new Set(salesPerformanceData.map((p) => p.productName))
    );
    return ["All", ...uniqueProducts];
  }, [salesPerformanceData]);

  const filteredSalesData = useMemo(() => {
    if (selectedProduct === "All") {
      return salesPerformanceData;
    }
    return salesPerformanceData.filter(
      (item) => item.productName === selectedProduct
    );
  }, [selectedProduct, salesPerformanceData]);

  const totalFact = useMemo(() => {
    const dataToConsider =
      selectedProduct === "All"
        ? salesPerformanceData.filter(
            (item) => item.productName !== "ЛФЗУ (перевозка)"
          )
        : salesPerformanceData.filter(
            (item) => item.productName === selectedProduct
          );

    return dataToConsider.reduce(
      (sum, item) => sum + item.fact * (item.price || 0),
      0
    );
  }, [selectedProduct, salesPerformanceData]);

  const totalProfit = useMemo(() => {
    if (selectedProduct === "All") {
      return profitData.reduce((sum, item) => sum + (item.profit || 0), 0);
    }
    const productProfit = profitData.find(
      (item) => item.productName === selectedProduct
    );
    return productProfit ? productProfit.profit || 0 : 0;
  }, [selectedProduct, profitData]);

  const kpiValues = {
    totalRevenueFact: totalFact,
    profit: totalProfit,
  };

  const handleExport = () => {
    if (dashboardRef.current) {
      html2canvas(dashboardRef.current, { backgroundColor: "#020617" }).then(
        (canvas) => {
          const link = document.createElement("a");
          link.download = "financial-dashboard.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
      );
    }
  };

  return React.createElement(
    "div",
    { className: "min-h-screen bg-background p-4 sm:p-6 lg:p-8 font-sans" },
    React.createElement(
      "div",
      { ref: dashboardRef, className: "max-w-7xl mx-auto space-y-6" },
      React.createElement(DashboardHeader, {
        productOptions: productOptions,
        selectedProduct: selectedProduct,
        setSelectedProduct: setSelectedProduct,
        onExport: handleExport,
        onEdit: onEdit,
      }),
      React.createElement(
        "main",
        null,
        React.createElement(KpiPanel, { data: kpiValues }),
        React.createElement(
          "div",
          { className: "mt-6 bg-card rounded-xl shadow-lg p-4 sm:p-6" },
          React.createElement(
            "h2",
            { className: "text-xl font-bold text-gray-100 mb-4" },
            "Детализация по продуктам"
          ),
          React.createElement(ProductPerformanceTable, {
            data: filteredSalesData,
          })
        ),
        React.createElement(
          "div",
          {
            className:
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6",
          },
          React.createElement(
            "div",
            { className: "bg-card rounded-xl shadow-lg p-4 sm:p-6" },
            React.createElement(
              "h2",
              { className: "text-xl font-bold text-gray-100 mb-4" },
              "Выручка по группам"
            ),
            React.createElement(RevenueDonutChart, { data: revenueData })
          ),
          React.createElement(
            "div",
            { className: "bg-card rounded-xl shadow-lg p-4 sm:p-6" },
            React.createElement(
              "h2",
              { className: "text-xl font-bold text-gray-100 mb-4" },
              "Зоны риска (Топ-3 по отклонению)"
            ),
            React.createElement(RiskHighlight, {
              data: salesPerformanceData,
            })
          ),
          React.createElement(
            "div",
            { className: "bg-card rounded-xl shadow-lg p-4 sm:p-6" },
            React.createElement(
              "h2",
              { className: "text-xl font-bold text-gray-100 mb-4" },
              "Затраты и Прибыль"
            ),
            React.createElement(CostsSection, {
              costs: costsData,
              profit: totalProfit,
            })
          )
        )
      )
    )
  );
};

export default Dashboard;

