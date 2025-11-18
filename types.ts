
export type ProductGroup =
  | 'Зола уноса'
  | 'Песок кварцевый'
  | 'Микросфера'
  | 'Фосфогипс навал'
  | 'Фосфогипс брикет'
  | 'ЛФЗУ (перевозка)'
  | 'Галит';

export interface SalesPerformance {
  productName: ProductGroup;
  unit: 'тн' | 'м³';
  plan: number;
  fact: number;
  planOnDate: number; // This can be calculated, but adding for clarity
  price: number; // Adding price to calculate revenue
}

export interface Profit {
  productName: ProductGroup | 'Other';
  profit: number; // in thousands of RUB
}

export interface Revenue {
  name: ProductGroup;
  value: number; // in thousands of RUB
}

export interface Cost {
  category: string;
  amount: number; // in thousands of RUB
}

// FIX: Add missing DailyCumulative type, which is used by the SalesLineChart component.
export interface DailyCumulative {
  day: number;
  plan: number;
  fact: number;
}
