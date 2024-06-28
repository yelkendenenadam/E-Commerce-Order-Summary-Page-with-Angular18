import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {OrderSummaryComponent} from "./shared/order-summary/order-summary.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderSummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-Commerce-Page-Summary-with-Angular18';
}
