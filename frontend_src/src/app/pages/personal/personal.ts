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
    // Retrieve the stock ID from the route parameters
    this.stockId = this.route.snapshot.paramMap.get('id');
  }
}