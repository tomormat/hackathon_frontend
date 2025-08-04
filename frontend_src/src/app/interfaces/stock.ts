export interface Stock {
    id: number;
    name: string;
    price: number;
    }

export interface Transaction {
  id: number;
  stock: Stock;
  amount: number;
  date: string; // or Date
  valueAtDate: number;
  valueChangePercent: number;
}
