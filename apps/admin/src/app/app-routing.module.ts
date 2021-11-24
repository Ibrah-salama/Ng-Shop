import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { AuthGuardGuard } from '@blubits/users';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesLisstComponent } from './pages/categories/categories-lisst/categories-lisst.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderDetailsComponent } from './pages/orders/order-details/order-details.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuardGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'categories', component: CategoriesLisstComponent },
      { path: 'categories/form', component: CategoriesFormComponent },
      { path: 'categories/form/:id', component: CategoriesFormComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/form', component: ProductFormComponent },
      { path: 'products/form/:id', component: ProductFormComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/form', component: UserFormComponent },
      { path: 'users/form/:id', component: UserFormComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },
    ],
  },
  {
      path:"**",
      redirectTo:"",
      pathMatch:"full"
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

// export const Components = [
//   CategoriesFormComponent,
//   CategoriesLisstComponent,
//   DashboardComponent,
//   OrderDetailsComponent,
//   OrderListComponent,
//   ProductFormComponent,
//   ProductListComponent,
//   UserFormComponent,
//   UserListComponent,
//   ShellComponent,
// ];
