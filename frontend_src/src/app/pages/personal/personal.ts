import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.Mock.service';
import { RouterModule } from '@angular/router';
import { Stock } from '../../interfaces/stock'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GlobalHeader } from '../../components/global-header/global-header';
import { GlobalFooter } from '../../components/global-footer/global-footer';

import { Chart, registerables } from 'chart.js';



@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, GlobalHeader, GlobalFooter],
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
  numberOfShares: number = 0;
  totalShareValue: number = 0;

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
        if (stock.shares && stock.shares.length > 0) {
          this.numberOfShares = stock.shares.length;
          this.totalShareValue = stock.shares.reduce((acc: number, value: number) => acc + value, 0);
        } else {
          this.numberOfShares = 0;
          this.totalShareValue = 0;
        }
        // this is the price graph 
        this.renderGraph();
      }
    }
  }

  get totalPrice(): number {
    if (!this.stock || this.currentPrice == null) return 0;
    return this.currentPrice * this.buyAmount;
  }
  //price graph:
  renderGraph(): void {
    // get the x axis to show time in HH:MM format
    const formattedTimes = this.stockTimes.map(time => {
      const date = new Date(time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const minPrice = Math.min(...this.stockPrices);
    const maxPrice = Math.max(...this.stockPrices);
    const minPriceIndex = this.stockPrices.indexOf(minPrice);
    const maxPriceIndex = this.stockPrices.indexOf(maxPrice);
    const minPriceTime = new Date(this.stockTimes[minPriceIndex]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const maxPriceTime = new Date(this.stockTimes[maxPriceIndex]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    const ctx = document.getElementById('stockGraph') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // make a line graph 
      data: {
        labels: formattedTimes,
        datasets: [
          {
            label: `${this.stockName} Prices`, // get the mock stock data
            data: this.stockPrices,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true
          },
          {
            label: `Min Price (at ${minPriceTime})`, // Dashed line for minimum price
            data: Array(this.stockPrices.length).fill(minPrice),
            borderColor: '#ff0000',
            borderDash: [5, 5], // Dashed line
            fill: false,
          },
          {
            label: `Max Price (at ${maxPriceTime})`, // Dashed line for maximum price
            data: Array(this.stockPrices.length).fill(maxPrice),
            borderColor: '#00ff00',
            borderDash: [5, 5], // Dashed line
            fill: false,
          },
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 18,
              },
            },
          },
          tooltip: {
            bodyFont: {
              size: 18,
            },
          },
        },
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Time',
              font: {
                size: 20
              }
            },
            ticks: {
              font: {
                size: 14
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price (GBP)',
              font: {
                size: 20
              }
            },
            ticks: {
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }
}