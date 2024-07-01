import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, Observable, throwError, timer } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { IShipping } from "../../interface/ishipping";

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = 'http://localhost:3000/shipping';

  constructor(private http: HttpClient) { }

  getShipping(weight: number): Observable<IShipping> {
    const url = `${this.apiUrl}?weight=${weight}`;
    return this.http.get<{ shipping: IShipping }>(url).pipe(
      retry({
        count: 5,
        delay: (error, retryCount) => timer(retryCount * 1000)
      }),
      map(response => response.shipping),
      catchError(this.handleError) // Handle errors
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error('Something went wrong with the request; please try again later.'));
  }
}
