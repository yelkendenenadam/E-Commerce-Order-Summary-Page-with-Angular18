import { Injectable } from '@angular/core';
import {OrderService} from "../order/order.service";
import {ShippingService} from "../shipping/shipping.service";
import {TaxService} from "../tax/tax.service";
import {concatMap, forkJoin, map, Observable, of} from "rxjs";
import {IOrderSummary} from "../../interface/iorder-summary";
import {IOrder} from "../../interface/iorder";

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  constructor(private orderService: OrderService, private shippingService: ShippingService, private taxService: TaxService) { }

  getSummary(): Observable<IOrderSummary> {
    return forkJoin({
      tax: this.taxService.getTax(),
      orderAndShipping: this.orderService.getOrder().pipe(
        concatMap((order: IOrder[]) => {
          return this.shippingService.getShipping(this.orderService.getTotalWeight(order)).pipe(
            map(shipping => ({ order, shipping}))
          );
        })
      )
    }).pipe(
      map(result => ({
        order: result.orderAndShipping.order,
        shipping: result.orderAndShipping.shipping,
        tax: result.tax
      }))
    );
  }

  getOrderTotal(orderSummary: IOrderSummary) {
    return this.orderService.getOrderDetailsTotal(orderSummary.order)*(1+orderSummary.tax.amount) + orderSummary.shipping.cost;
  }


}
