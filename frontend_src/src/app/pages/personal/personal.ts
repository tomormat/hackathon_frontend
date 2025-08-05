import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.Mock.service';
import { RouterModule } from '@angular/router';
import { Stock } from '../../interfaces/stock'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './personal.html',
  styleUrl: './personal.css'
})
export class Personal implements OnInit {
  stockName: string = '';
  stockId: string | null = null;
  stock: Stock | null = null;
  buyAmount: number = 1;
  stockPrices: number[] = [];
  stockTimes: string[]=[];
  currentPrice: number | null = null;
  openingPrice: number | null = null;
  percentChange: number | null = null;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit(): void {

    Chart.register(...registerables);
    this.stockId = this.route.snapshot.paramMap.get('id');
    if (this.stockId) {
      const stock = this.stockService.getStockById(Number(this.stockId));
      if (stock) {
        this.stock = stock;
        
        this.stockName = stock.name;
        this.stockPrices = stock.prices;
        this.stockTimes = stock.times;
        this.currentPrice = this.stockPrices[this.stockPrices.length - 1];
        this.openingPrice = this.stockPrices[0];

        if (this.openingPrice && this.currentPrice) {
          this.percentChange = ((this.currentPrice - this.openingPrice) / this.openingPrice) * 100;
        }
        // this is the price graph 
        this.renderGraph();
      }
    }
  }

  get totalPrice(): number {
    if (!this.stock) return 0;
    return this.stock.price * this.buyAmount;
  }
  //price graph:
  renderGraph(): void {
    // get the x axis to show time in HH:MM format
    const formattedTimes = this.stockTimes.map(time => {
      const date = new Date(time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
  
    const ctx = document.getElementById('stockGraph') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // make a line graph 
      data: {
        labels: formattedTimes,
        datasets: [
          {
            label: `${this.stockName} Prices`,
            data: this.stockPrices,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price'
            }
          }
        }
      }
    });
  }
}