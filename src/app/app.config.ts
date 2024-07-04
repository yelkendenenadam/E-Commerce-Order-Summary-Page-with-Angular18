import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authorizationInterceptor} from "./interceptor/authorization/authorization.interceptor";
import {errorHandlerInterceptor} from "./interceptor/error-handler/error-handler.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([authorizationInterceptor, errorHandlerInterceptor]))]
};
