import React from "react";

const formatNumber = (value) => {
  if (value == null || isNaN(value)) return "-";
  return value.toLocaleString("ru-RU", {
    maximumFractionDigits: 0,
  });
};

const KpiPanel = (props) => {
  const { data } = props || {};
  const totalRevenueFact = data ? data.totalRevenueFact : 0;
  const profit = data ? data.profit : 0;

  return React.createElement(
    "section",
    { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },

    // Карточка: выручка факт
    React.createElement(
      "div",
      {
        className:
          "bg-card rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800",
      },
      React.createElement(
        "p",
        { className: "text-sm text-gray-400 mb-1" },
        "Выручка (факт), тыс. руб."
      ),
      React.createElement(
        "p",
        { className: "text-2xl sm:text-3xl font-bold text-brand-orange-light" },
        formatNumber(totalRevenueFact)
      )
    ),

    // Карточка: прибыль
    React.createElement(
      "div",
      {
        className:
          "bg-card rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800",
      },
      React.createElement(
        "p",
        { className: "text-sm text-gray-400 mb-1" },
        "Прибыль без НДС, тыс. руб."
      ),
      React.createElement(
        "p",
        {
          className:
            "text-2xl sm:text-3xl font-bold " +
            (profit >= 0 ? "text-emerald-400" : "text-red-400"),
        },
        formatNumber(profit)
      )
    )
  );
};

export default KpiPanel;

