import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";
import { ITax } from "../../interface/itax";

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private apiUrl = 'http://localhost:3000/tax';

  constructor(private http: HttpClient) { }


  getTax(): Observable<ITax> {
    return this.http.get<{ tax: ITax }>(this.apiUrl).pipe(
      map(response => response.tax),
      shareReplay()
    );
  }

  getTaxAlt(): Promise<ITax> {
    return fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => data.tax);
  }


}

