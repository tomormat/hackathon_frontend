import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-global-header',
  standalone: true,
  templateUrl: './global-header.html',
  styleUrls: ['./global-header.css']
})
export class GlobalHeader {
  @Input() title: string = '';
}
