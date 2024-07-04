import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {timer, retry, map, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 5,
      delay: (error, retryCount) => timer(retryCount*1000)
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        errorMessage = `Server-side error: ${error.status} - ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );

};
