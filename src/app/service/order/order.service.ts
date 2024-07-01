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
      retry({
        count: 5,
        delay: (error, retryCount) => timer(retryCount*1000)
      }),
      map(response => response.order),
      catchError(this.handleError));
  }

  getOrderDetailsTotal(order: IOrder[]){
    return order.reduce((sum, item) => sum + item.price*item.qty, 0)
  }

  getTotalWeight(order: IOrder[]){
    return order.reduce((weight, order) => weight + (order.weight * order.qty), 0);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error('Something went wrong with the request.'));
  }

}
