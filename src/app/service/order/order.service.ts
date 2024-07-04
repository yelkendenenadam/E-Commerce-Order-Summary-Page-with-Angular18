import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IOrder} from "../../interface/iorder";
import {catchError, map, Observable, retry, throwError, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient) { }

  getOrder(): Observable<IOrder[]> {
    return this.http.get<{order: IOrder[]}>(this.apiUrl).pipe(
      map(response => response.order)
    );
  }

  getOrderDetailsTotal(order: IOrder[]){
    return order.reduce((sum, item) => sum + item.price*item.qty, 0)
  }

  getTotalWeight(order: IOrder[]){
    return order.reduce((weight, order) => weight + (order.weight * order.qty), 0);
  }


}
