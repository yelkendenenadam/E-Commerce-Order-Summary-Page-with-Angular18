import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IShipping} from "../../interface/ishipping";

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = 'http://localhost:3000/shipping';

  constructor(private http: HttpClient) { }

  getShipping(weight: number): Observable<IShipping> {
    const url = `${this.apiUrl}?weight=${weight}`;
    return this.http.get<{shipping: IShipping }>(url).pipe(map(response => response.shipping));
  }
}
