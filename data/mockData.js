
// Исходные данные для инициализации состояния.
// Все расчёты (цены, план на дату и т.п.) выполняются в App.js.

// Данные из таблицы "РЕАЛИЗАЦИЯ 2025 год"
export const initialSalesRealizationData = [
  { productName: "Зола уноса", unit: "тн", plan: 24500, fact: 9390 },
  { productName: "Песок кварцевый", unit: "м³", plan: 800000, fact: 235213 },
  { productName: "Микросфера", unit: "тн", plan: 2236, fact: 801 },
  { productName: "Фосфогипс навал", unit: "тн", plan: 0, fact: 21 },
  { productName: "Фосфогипс брикет", unit: "тн", plan: 0, fact: 0 },
  { productName: "ЛФЗУ (перевозка)", unit: "тн", plan: 7100, fact: 6839 },
  { productName: "Галит", unit: "тн", plan: 30000, fact: 0 },
];

// Данные из "ПОСТУПЛЕНИЕ ДС, тыс.руб" (выручка)
export const initialRevenueData = [
  { name: "Зола уноса", value: 26932 },
  { name: "Песок кварцевый", value: 12054 },
  { name: "Микросфера", value: 28289 },
  { name: "Фосфогипс навал", value: 2 },
  { name: "Фосфогипс брикет", value: 0 },
  { name: "Галит", value: 0 },
];

// Данные из "ПРИБЫЛЬ без НДС, тыс.руб"
export const initialProfitData = [
  { productName: "Зола уноса", profit: -2 },
  { productName: "Песок кварцевый", profit: 5003 },
  { productName: "Микросфера", profit: 8200 },
  { productName: "Фосфогипс навал", profit: 1 },
  { productName: "Фосфогипс брикет", profit: 0 },
  { productName: "Галит", profit: 0 },
];

// Данные из "ЗАТРАТЫ с НДС, тыс.руб"
export const initialCostsData = [
  { category: "ЛФЗУ (закупка)", amount: 102590 },
  { category: "ЛФЗУ (перевозка)", amount: 10233 },
  { category: "ЛФЗУ (переработка)", amount: 10663 },
];

