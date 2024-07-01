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
      retry({
        count: 3,
        delay: (error, retryCount) => timer(retryCount * 1000)
      }),
      map(response => response.tax),
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

