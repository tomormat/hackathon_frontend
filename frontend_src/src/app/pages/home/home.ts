import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StockService } from '../../services/stock.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  stocks: any[] = []; // Variable to hold stock data

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    // Fetch stock data from the service
    this.stockService.getStocks().subscribe(
      data => {
        this.stocks = data; // Assign fetched data to the stocks variable
      },
      error => {
        console.error('Error fetching stock data:', error);
      }
    );
  }
}