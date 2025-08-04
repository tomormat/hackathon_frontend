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

  // 2. Post a transaction (buy stock)
  buyStock(stock: Stock, amount: number): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, {
      stock,
      amount
    });
  }

  // 3. Get all transactions for the user
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }
}