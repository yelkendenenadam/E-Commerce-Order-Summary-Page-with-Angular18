import { Component } from '@angular/core';
import {IOrderSummary} from "../../interface/iorder-summary";
import {Subject, Subscription, takeUntil, tap} from "rxjs";
import {OrderSummaryService} from "../../service/order-summary/order-summary.service";
import {CurrencyPipe, JsonPipe, NgIf, PercentPipe} from "@angular/common";
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
  orderDetailsTotal!: number;
  orderTotal!: number;
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(protected orderSummaryService: OrderSummaryService, protected orderService: OrderService) {}

  ngOnInit(){
    this.orderSummaryService.getSummary().pipe(
      tap(orderSummary => {
        this.orderSummary = orderSummary;
        this.orderDetailsTotal = this.orderService.getOrderDetailsTotal(orderSummary.order);
        this.orderTotal = this.orderSummaryService.getOrderTotal(orderSummary);
      }),
      takeUntil(this.destroy)).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
