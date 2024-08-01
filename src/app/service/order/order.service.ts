import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IOrder} from "../../interface/iorder";
import {map, Observable, shareReplay} from "rxjs";
import {FetchService} from "../fetch/fetch.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient, private FetchService: FetchService) { }


  getOrder(): Observable<IOrder[]> {
    return this.http.get<{order: IOrder[]}>(this.apiUrl).pipe(
      map(response => response.order),
      shareReplay()
    );
  }

  getOrderAlt(): Promise<IOrder[]> {
    return this.FetchService.secureFetch(this.apiUrl)
      .then(response => response.json())
      .then(data => data.order)
  }


  /**
   * Calculates the total cost of an order by adding order items' price
   * @param order The order to calculate total cost of
   * @return Calculated total cost
   */
  getOrderDetailsTotal(order: IOrder[]){
    return order.reduce((sum, item) => sum + item.price*item.qty, 0)
  }

  /**
   * Calculates the total weight of an order by adding order items' weight
   * @param order The order to calculate total weight of
   * @return Calculated total weight
   */
  getTotalWeight(order: IOrder[]){
    return order.reduce((weight, order) => weight + (order.weight * order.qty), 0);
  }


}
