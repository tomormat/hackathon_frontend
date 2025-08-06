export interface Stock {
    id: number;
    name: string;
    price: number;
    prices?: number[];       // Historical prices of the stock
    times?: string[];        // Timestamps for the historical prices
    shares?: number[];       // Number of shares held at different times
}

export interface Transaction {
    id: number;
    stock: Stock;
    amount: number;
    date: string; // or Date
    valueAtDate: number;
    currentValue?: number;
    type: 'buy' | 'sell'; // Added type property to distinguish between buy and sell transactions
}

export interface TransactionWithChange extends Transaction {
    valueChangePercent: number;
}
