import { Component } from '@angular/core';
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {OrderSummaryComponent} from "../../shared/order-summary/order-summary.component";

@Component({
  selector: 'app-order-summary-page',
  standalone: true,
  imports: [
    NavbarComponent,
    OrderSummaryComponent
  ],
  templateUrl: './order-summary-page.component.html',
  styleUrl: './order-summary-page.component.scss'
})
export class OrderSummaryPageComponent {

}
