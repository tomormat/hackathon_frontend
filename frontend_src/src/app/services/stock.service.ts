import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock, Transaction } from '../interfaces/stock';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 1. Get a stock by its ID
  getStockById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/stocks/${id}`);
  }

  // 2. Get all portfolio stocks
  getPortfolio(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stocks/getall`);
  }

  // 3. Get real-time stock information by ticker symbol
  getStockInfo(tickerSymbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stocks/getstockinfo/${tickerSymbol}`);
  }

  // 4. Get transaction history (orders)
  getOrderHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/order/history`);
  }

  // 5. Place a new order (buy or sell)
  makeOrder(orderData: { tickerSymbol: string; orderAction: 'BUY' | 'SELL'; dollarAmount: number; executionDateTime: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/order/makeorder`, orderData);
  }

  // 3. Get all transactions for the user
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }
}