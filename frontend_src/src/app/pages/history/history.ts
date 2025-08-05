import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockService } from '../../services/stock.Mock.service';
import { Transaction } from '../../interfaces/stock';
import { CommonModule } from '@angular/common';
import { GlobalHeader } from '../../components/global-header/global-header';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterModule, CommonModule, GlobalHeader],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class History implements OnInit {
  transactions: Transaction[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }
}
