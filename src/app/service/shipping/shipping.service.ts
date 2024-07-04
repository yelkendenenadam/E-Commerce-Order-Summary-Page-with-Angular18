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
      map(response => response.shipping),
    );
  }

}
