import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './personal.html',
  styleUrl: './personal.css'
})
export class Personal implements OnInit {
  stockName: string = ''; // Variable to hold the stock name
  stockId: string | null = null; // Variable to hold the stock ID

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit(): void {
    // Retrieve the stock ID from the route parameters
    this.stockId = this.route.snapshot.paramMap.get('id');

    // Fetch the stock details using the StockService
    if (this.stockId) {
      const stock = this.stockService.getStockById(Number(this.stockId));
      if (stock) {
        this.stockName = stock.name; // Set the stock name
      }
    }
  }
}