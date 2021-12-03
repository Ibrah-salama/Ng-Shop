import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { OrdersModule } from '@blubits/orders';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { ButtonModule } from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { UiModule } from "@blubits/ui"

import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  { path: 'products/category/:categoryid', component: ProductListComponent },
  { path: 'products/:productid', component: ProductPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    OrdersModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
    ToastModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductListComponent,
    ProductPageComponent,
  ],
  exports: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductListComponent,
    ProductPageComponent,
  ],
  providers:[MessageService]
})
export class ProductsModule {}
