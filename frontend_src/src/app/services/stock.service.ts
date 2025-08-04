import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // make it globally available
})
export class StockService {
  private mockStocksUrl = 'assets/mock-shares.json'; // tell it where the database is 
  private stocks: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any[]>(this.mockStocksUrl).subscribe(data => {
        this.stocks = data;
      });
  }

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.mockStocksUrl);
  }
  getStockById(id: number): any {
    return this.stocks.find(stock => stock.id === id);
  }
}