import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";
import { IShipping } from "../../interface/ishipping";
import {FetchService} from "../fetch/fetch.service";

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = 'http://localhost:3000/shipping';

  constructor(private http: HttpClient, private FetchService: FetchService) { }

  getShipping(weight: number): Observable<IShipping> {
    const params = new HttpParams()
      .set('weight', weight)
    return this.http.get<{ shipping: IShipping }>(this.apiUrl, {params}).pipe(
      map(response => response.shipping),
      shareReplay()
    );
  }

  getShippingAlt(weight: number): Promise<IShipping> {
    const params = new URLSearchParams();
    params.set('weight', weight.toString());

    return this.FetchService.secureFetch(`${this.apiUrl}?${params.toString()}`)
      .then(response => response.json())
      .then(data => data.shipping)
      .catch(error => console.error(`Client-side error: ${error}`));
  }

}
