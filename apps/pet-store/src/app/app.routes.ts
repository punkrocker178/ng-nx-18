import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PetDashboardComponent } from './components/pet-dashboard/pet-dashboard.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pets',
    component: PetDashboardComponent
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent
  }
];
