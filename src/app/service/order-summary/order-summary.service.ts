import { Injectable } from '@angular/core';
import {OrderService} from "../order/order.service";
import {ShippingService} from "../shipping/shipping.service";
import {TaxService} from "../tax/tax.service";
import {forkJoin, map, Observable, switchMap} from "rxjs";
import {IOrderSummary} from "../../interface/iorder-summary";


@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  constructor(private orderService: OrderService, private shippingService: ShippingService, private taxService: TaxService) { }

  /**
   * Get order summary
   */
  getSummary(): Observable<IOrderSummary> {
    return forkJoin([
      this.taxService.getTax(),
      this.orderService.getOrder(),
    ]).pipe(
      switchMap(result => {
        const totalWeight = this.orderService.getTotalWeight(result[1]);
        return this.shippingService.getShipping(totalWeight).pipe(
          map(shipping => ({
            order: result[1],
            shipping: shipping,
            tax: result[0]
          }))
        )
      })
    );

  }

  getOrderTotal(orderSummary: IOrderSummary) {
    return this.orderService.getOrderDetailsTotal(orderSummary.order)*(1+orderSummary.tax.amount) + orderSummary.shipping.cost;
  }


}
