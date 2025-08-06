export interface Stock {
    id: number;
    name: string;
    price: number;
    valueChangePercent24h?: number; // Add this if you want to show 24h change
    // abbreviation?: string; // Uncomment if you want to use abbreviation
}

export interface Transaction {
  id: number;
  stock: Stock;
  amount: number;
  date: string; // or Date
  valueAtDate: number;
  valueChangePercent: number;
  currentValue?: number;
}
