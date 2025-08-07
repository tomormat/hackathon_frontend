import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../interfaces/stock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root' // make it globally available
})
export class StockService {
  private mockStocksUrl = 'assets/mock-shares.json'; // tell it where the database is 
  private stocks: any[] = [];
  private transactions: Transaction[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any[]>(this.mockStocksUrl).subscribe(data => {
        this.stocks = data;
      });
    this.loadMockTransactions();
  }

  private loadMockTransactions() {
    this.http.get<Transaction[]>('assets/mock-transactions.json').subscribe(data => {
      this.transactions = data || [];
    });
  }

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.mockStocksUrl);
  }
  getStockById(id: number): any {
    return this.stocks.find(stock => stock.id === id);
  }

  getStockByName(name: string): any {
    return this.stocks.find(stock => stock.name === name);
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  /// THESE REQUESTS ARE FOR THE API NOT THE MOCK DATA

  makeOrder(orderData: { tickerSymbol: string; orderAction: 'BUY' | 'SELL'; dollarAmount: number; executionDateTime: string }): Observable<any> {
    // Simulate placing an order against local JSON data
    // Find the stock object
    const stockObj = this.getStockByName(orderData.tickerSymbol);
    // Create a new transaction record
    const newTransaction: Transaction = {
      id: this.transactions.length + 1,
      stock: stockObj || { id: -1, name: orderData.tickerSymbol, price: 0 },
      amount: orderData.dollarAmount / (stockObj?.price || 1),
      date: orderData.executionDateTime,
      valueAtDate: orderData.dollarAmount,
      currentValue: orderData.dollarAmount,
      type: orderData.orderAction.toLowerCase() as 'buy' | 'sell'
    };
    // Update in-memory transactions
    this.transactions.push(newTransaction);
    // Return a successful response
    return of({ message: 'Order was successful', transaction: newTransaction });
  }

}