import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {timer, retry, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => timer(retryCount*1000)
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${req.url} ${error.error.message}`;
      } else {
        errorMessage = `Server-side error: ${req.url} ${error.status} - ${error.message}`;
      }
      return throwError(() => new Error(errorMessage));
    })
  );

};
