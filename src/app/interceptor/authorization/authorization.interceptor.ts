import { HttpInterceptorFn } from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = btoa('admin:password')
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Basic ${token}`
    }
  });
  return next(authReq);
};
