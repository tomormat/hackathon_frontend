import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction, StockInfo } from '../interfaces/stock';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // make it globally available
})
export class StockService {
  private mockStocksUrl = 'assets/mock-shares.json'; // tell it where the database is 
  private stocks: any[] = [];
  private transactions: Transaction[] = [];
  private stockInfoCache = new Map<string, StockInfo>();

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
    // Fetch transaction list from real API, fallback to local mock JSON on error
    return this.http.get<Transaction[]>(`${environment.apiUrl}/order/history`).pipe(
      catchError(() => this.http.get<Transaction[]>('assets/mock-transactions.json'))
    );
  }

  makeOrder(orderData: { tickerSymbol: string; orderAction: 'BUY' | 'SELL'; dollarAmount: number; executionDateTime: string }): Observable<any> {
    // Place order via real API
    return this.http.post<any>(`${environment.apiUrl}/order/makeorder`, orderData);
  }

  /** Fetch live stock info and cache it, fallback to cache if exists */
  fetchStockInfo(tickerSymbol: string): Observable<StockInfo> {
    if (this.stockInfoCache.has(tickerSymbol)) {
      return of(this.stockInfoCache.get(tickerSymbol)!);
    }
    return this.http.get<StockInfo>(`${environment.apiUrl}/stocks/getstockinfo/${tickerSymbol}`).pipe(
      tap(info => this.stockInfoCache.set(tickerSymbol, info)),
      catchError(() => {
        // fallback: use local data if available
        const stock = this.getStockByName(tickerSymbol);
        const fallback: StockInfo = {
          tickerSymbol,
          currentPrice: stock?.price || 0,
          timeUpdated: new Date().toISOString()
        };
        return of(fallback);
      })
    );
  }

}