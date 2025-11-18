import React from "react";

const DashboardHeader = (props) => {
  const {
    productOptions,
    selectedProduct,
    setSelectedProduct,
    onExport,
    onEdit,
  } = props;

  const handleSelectChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return React.createElement(
    "header",
    {
      className:
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
    },
    // Левая часть: заголовок и подзаголовок
    React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        { className: "text-2xl sm:text-3xl font-bold text-white" },
        "Интерактивный финансовый дашборд"
      ),
      React.createElement(
        "p",
        { className: "text-sm text-gray-400 mt-1" },
        "Аналитика выручки, прибыли и затрат по продуктовым группам"
      )
    ),
    // Правая часть: селектор продукта и кнопки
    React.createElement(
      "div",
      { className: "flex flex-col sm:flex-row gap-2 sm:items-center" },
      // Выпадающий список продуктов
      React.createElement(
        "select",
        {
          value: selectedProduct,
          onChange: handleSelectChange,
          className:
            "px-3 py-2 rounded-lg bg-card-header text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-orange-light text-sm",
        },
        productOptions.map((option) =>
          React.createElement(
            "option",
            { key: option, value: option },
            option === "All" ? "Все продукты" : option
          )
        )
      ),
      // Кнопка экспорта
      React.createElement(
        "button",
        {
          type: "button",
          onClick: onExport,
          className:
            "px-3 py-2 rounded-lg bg-brand-blue hover:bg-blue-700 text-white text-sm font-medium shadow-md transition-colors",
        },
        "Экспорт в PNG"
      ),
      // Кнопка редактирования данных
      React.createElement(
        "button",
        {
          type: "button",
          onClick: onEdit,
          className:
            "px-3 py-2 rounded-lg bg-brand-orange-light hover:bg-brand-orange-dark text-gray-900 text-sm font-medium shadow-md transition-colors",
        },
        "Редактировать данные"
      )
    )
  );
};

export default DashboardHeader;
