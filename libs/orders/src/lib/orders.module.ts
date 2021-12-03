import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { OrderFailsComponent } from './pages/order-fails/order-fails.component';
import { AuthGuardGuard } from '@blubits/users';


export const ordersRoutes: Route[] = [];

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    canActivate:[AuthGuardGuard],
    component: CheckoutPageComponent,
  },
  {
    path: 'success',
    component: ThankYouComponent,
  },{
    path: 'order-failure',
    component: OrderFailsComponent,
  },
];

@NgModule({
  imports: [
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule,
    BadgeModule,
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummeryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    OrderFailsComponent,
  ],
  exports: [CartIconComponent],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
