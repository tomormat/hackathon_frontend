import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // make it globally available
})
export class StockService {
  private mockStocksUrl = 'assets/mock-shares.json'; // tell it where the database is 
  constructor(private http: HttpClient) {}

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.mockStocksUrl);
  }
}