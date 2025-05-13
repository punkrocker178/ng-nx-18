import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PetDashboardComponent } from './components/pet-dashboard/pet-dashboard.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

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
  },
  {
    path: 'cart',
    component: CartDetailsComponent
  },
  {
    path: 'checkout',
    component: OrderDetailsComponent
  },
  {
    path: 'orders/:orderId'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: {
      isLoginLayout: true
    }
  }
];
