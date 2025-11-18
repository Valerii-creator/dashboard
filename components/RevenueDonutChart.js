import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FCA311", "#38BDF8", "#22C55E", "#E11D48", "#A855F7", "#F97316"];

const formatValue = (value) => {
  if (value == null || isNaN(value)) return "-";
  return value.toLocaleString("ru-RU", { maximumFractionDigits: 0 });
};

const CustomTooltip = (props) => {
  const { active, payload } = props;
  if (!active || !payload || !payload.length) return null;

  const item = payload[0];
  return React.createElement(
    "div",
    {
      className:
        "bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs text-gray-100",
    },
    React.createElement(
      "div",
      { className: "font-semibold mb-1" },
      item.name
    ),
    React.createElement(
      "div",
      null,
      "Выручка: ",
      formatValue(item.value),
      " тыс. руб."
    )
  );
};

const RevenueDonutChart = (props) => {
  const { data } = props || {};

  const safeData = Array.isArray(data)
    ? data.map((d) => ({
        name: d.name,
        value: Number(d.value) || 0,
      }))
    : [];

  return React.createElement(
    "div",
    { className: "h-64" },
    React.createElement(
      ResponsiveContainer,
      { width: "100%", height: "100%" },
      React.createElement(
        PieChart,
        null,
        React.createElement(Pie, {
          data: safeData,
          dataKey: "value",
          nameKey: "name",
          innerRadius: "60%",
          outerRadius: "90%",
          paddingAngle: 2,
        }),
        safeData.map((entry, index) =>
          React.createElement(Cell, {
            key: "cell-" + index,
            fill: COLORS[index % COLORS.length],
          })
        ),
        React.createElement(Tooltip, {
          content: React.createElement(CustomTooltip, null),
        }),
        React.createElement(Legend, {
          verticalAlign: "bottom",
          height: 24,
          wrapperStyle: { fontSize: 12 },
        })
      )
    )
  );
};

export default RevenueDonutChart;

