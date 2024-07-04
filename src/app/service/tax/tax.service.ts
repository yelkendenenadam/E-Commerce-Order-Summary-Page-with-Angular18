import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, Observable, throwError, timer } from "rxjs";
import { catchError, retry } from "rxjs/operators";
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
    );
  }

}

