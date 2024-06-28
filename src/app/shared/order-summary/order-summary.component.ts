import { Component } from '@angular/core';
import {IOrderSummary} from "../../interface/iorder-summary";
import {Subscription} from "rxjs";
import {OrderSummaryService} from "../../service/order-summary/order-summary.service";
import {CurrencyPipe, JsonPipe, NgIf, PercentPipe} from "@angular/common";
import {IOrder} from "../../interface/iorder";
import {OrderService} from "../../service/order/order.service";

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    CurrencyPipe,
    PercentPipe,
    JsonPipe,
    NgIf
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  orderSummary!: IOrderSummary;
  subscriptions = new Subscription();

  constructor(protected orderSummaryService: OrderSummaryService, protected orderService: OrderService) {}

  ngOnInit(){
    this.subscriptions.add( this.orderSummaryService.getSummary().subscribe(orderSummary => {
      this.orderSummary = orderSummary;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
