import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  stocks: any[] = []; // All stocks
  filteredStocks: any[] = []; // Filtered stocks based on search
  searchTerm: string = ''; // User's search input

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

  // Filter stocks based on the search term
  filterStocks(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredStocks = []; // Clear results if search term is empty
    } else {
      this.filteredStocks = this.stocks.filter(stock =>
        stock.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}