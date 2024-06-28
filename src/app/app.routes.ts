import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'order-summary'
  },
  {
    path: 'order-summary',
    loadComponent: () => import('./page/order-summary-page/order-summary-page.component') .then(m => m.OrderSummaryPageComponent),
    title: 'Order Summary'
  }
];
