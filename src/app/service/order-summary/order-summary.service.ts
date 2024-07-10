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
   * Get order summary by getting order, shipping, tax from respective API services.
   * Tax and order requested concurrently and shipping consecutively to these requests.
   * @return An observable of IOrderSummary containing requested order, shipping and tax data.
   */
  getSummary(): Observable<IOrderSummary> {
    return forkJoin({
      tax: this.taxService.getTax(),
      order: this.orderService.getOrder(),
    }).pipe(
      switchMap(taxAndOrder => {
        const totalWeight = this.orderService.getTotalWeight(taxAndOrder.order);
        return this.shippingService.getShipping(totalWeight).pipe(
          map(shipping => ({
            order: taxAndOrder.order,
            shipping: shipping,
            tax: taxAndOrder.tax
          }))
        )
      })
    );

  }

  async getSummaryAlt() : Promise<IOrderSummary> {
    const [tax, order] = await Promise.all([
      this.taxService.getTaxAlt(),
      this.orderService.getOrderAlt()
    ]);
    const totalWeight = this.orderService.getTotalWeight(order);
    const shipping = await this.shippingService.getShippingAlt(totalWeight);
    return {
      order: order,
      shipping: shipping,
      tax: tax
    };
  }

  /**
   * Calculates an order's total cost by adding order items' price, shipping cost and tax.
   *
   * @param orderSummary Order summary to calculate cost
   * @return The calculated cost is returned
   */
  getOrderTotal(orderSummary: IOrderSummary) {
    return this.orderService.getOrderDetailsTotal(orderSummary.order)*(1+orderSummary.tax.amount) + orderSummary.shipping.cost;
  }


}
