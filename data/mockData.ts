
import type { SalesPerformance, Profit, Revenue, Cost } from '../types';

// Raw data for initializing state. Calculations are now done in App.tsx.

// Data extracted from the "РЕАЛИЗАЦИЯ 2025 год" table
export const initialSalesRealizationData: Omit<SalesPerformance, 'planOnDate' | 'price'>[] = [
  { productName: 'Зола уноса', unit: 'тн', plan: 24500, fact: 9390 },
  { productName: 'Песок кварцевый', unit: 'м³', plan: 800000, fact: 235213 },
  { productName: 'Микросфера', unit: 'тн', plan: 2236, fact: 801 },
  { productName: 'Фосфогипс навал', unit: 'тн', plan: 0, fact: 21 },
  { productName: 'Фосфогипс брикет', unit: 'тн', plan: 0, fact: 0 },
  { productName: 'ЛФЗУ (перевозка)', unit: 'тн', plan: 7100, fact: 6839 },
  { productName: 'Галит', unit: 'тн', plan: 30000, fact: 0 },
];

// Data extracted from "ПОСТУПЛЕНИЕ ДС, тыс.руб" (Revenue)
export const initialRevenueData: Revenue[] = [
  { name: 'Зола уноса', value: 26932 },
  { name: 'Песок кварцевый', value: 12054 },
  { name: 'Микросфера', value: 28289 },
  { name: 'Фосфогипс навал', value: 2 },
  { name: 'Фосфогипс брикет', value: 0 },
  { name: 'Галит', value: 0 },
];

// Data extracted from "ПРИБЫЛЬ без НДС, тыс.руб" (Profit)
export const initialProfitData: Profit[] = [
  { productName: 'Зола уноса', profit: -2 },
  { productName: 'Песок кварцевый', profit: 5003 },
  { productName: 'Микросфера', profit: 8200 },
  { productName: 'Фосфогипс навал', profit: 1 },
  { productName: 'Фосфогипс брикет', profit: 0 },
  { productName: 'Галит', profit: 0 },
];

// Data extracted from "ЗАТРАТЫ с НДС, тыс.руб" (Costs)
export const initialCostsData: Cost[] = [
  { category: 'ЛФЗУ (закупка)', amount: 102590 },
  { category: 'ЛФЗУ (перевозка)', amount: 10233 },
  { category: 'ЛФЗУ (переработка)', amount: 10663 },
];
