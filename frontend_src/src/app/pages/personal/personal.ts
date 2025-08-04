import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [],
  templateUrl: './personal.html',
  styleUrl: './personal.css'
})
export class Personal implements OnInit {
  stockId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this is for the routing: want the stock id for each personal page
    this.stockId = this.route.snapshot.paramMap.get('id');
  }
}