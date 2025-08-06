import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockService } from '../../services/stock.Mock.service';
import { Transaction } from '../../interfaces/stock';
import { CommonModule } from '@angular/common';
import { GlobalHeader } from '../../components/global-header/global-header';
import { GlobalFooter } from '../../components/global-footer/global-footer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterModule, CommonModule, GlobalHeader, GlobalFooter, FormsModule],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class History implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
      this.filteredTransactions = data;
    });
  }

  filterStocks(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTransactions = this.transactions.filter(t =>
      t.stock.name.toLowerCase().includes(term)
    );
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredTransactions.sort((a, b) => {
      const aValue = this.getValueByColumn(a, column);
      const bValue = this.getValueByColumn(b, column);

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getValueByColumn(transaction: Transaction, column: string): any {
    return column.split('.').reduce((obj, key) => (obj as any)[key], transaction);
  }

  getSortClass(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'arrow-up' : 'arrow-down';
    }
    return '';
  }
}
