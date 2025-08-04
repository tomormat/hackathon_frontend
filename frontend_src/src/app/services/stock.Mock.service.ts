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

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  /// THESE REQUESTS ARE FOR THE API NOT THE MOCK DATA



}