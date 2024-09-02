import { Routes } from '@angular/router';
import {ProductsComponent} from "./features/products/components/products/products.component";
import {ProductDetailsComponent} from "./features/product-details/components/product-details/product-details.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'products'
  },
  {
    path : 'products',
    children : [
      {
        path : "",
        pathMatch : 'full',
        component : ProductsComponent
      },
      {
        path : ':id',
        component : ProductDetailsComponent
      }
    ]
  },
  {
    path : '**',
    component : PageNotFoundComponent
  }
];
