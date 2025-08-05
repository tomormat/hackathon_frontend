import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-global-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './global-header.html',
  styleUrls: ['./global-header.css']
})
export class GlobalHeader {
  @Input() title: string = '';
}
