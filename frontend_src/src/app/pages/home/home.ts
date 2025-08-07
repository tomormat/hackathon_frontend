import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { FormsModule } from '@angular/forms'; 
import { GlobalHeader } from '../../components/global-header/global-header';
import { GlobalFooter } from '../../components/global-footer/global-footer';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, GlobalHeader, GlobalFooter],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  stocks: any[] = []; 
  filteredStocks: any[] = []; 
  searchTerm: string = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    // use stock.service to get the stock data from the mock db
    this.stockService.getStocks().subscribe(
      data => {
        this.stocks = data; // this sets the name of the stock data to get it in the html
        this.filteredStocks = [...this.stocks]; // Initialize filteredStocks with all stocks
      },
      error => {
        console.error('Error fetching stock data:', error);
      }
    );
  }

 // for the search bar:
  filterStocks(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredStocks = []; 
    } else {
      this.filteredStocks = this.stocks.filter(stock =>
        stock.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}