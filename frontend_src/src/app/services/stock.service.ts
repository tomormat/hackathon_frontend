import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service globally available
})
export class StockService {
  private mockStocksUrl = 'assets/mock-shares.json'; // Path to the JSON file
  constructor(private http: HttpClient) {}

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.mockStocksUrl);
  }
}