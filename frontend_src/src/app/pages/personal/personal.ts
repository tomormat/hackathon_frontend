import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.Mock.service';
import { RouterModule } from '@angular/router';
import { Stock } from '../../interfaces/stock'; // Adjust path if needed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalHeader } from '../../components/global-header/global-header';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, GlobalHeader],
  templateUrl: './personal.html',
  styleUrl: './personal.css'
})
export class Personal implements OnInit {
  stockName: string = '';
  stockId: string | null = null;
  stock: Stock | null = null;
  buyAmount: number = 1;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit(): void {
    this.stockId = this.route.snapshot.paramMap.get('id');
    if (this.stockId) {
      const stock = this.stockService.getStockById(Number(this.stockId));
      if (stock) {
        this.stock = stock;
        this.stockName = stock.name;
      }
    }
  }

  get totalPrice(): number {
    if (!this.stock) return 0;
    return this.stock.price * this.buyAmount;
  }
}