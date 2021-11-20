import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker'

//ux
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';

// Componenets
import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesLisstComponent } from './pages/categories/categories-lisst/categories-lisst.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';


const UX_MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ColorPickerModule,
  ConfirmDialogModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule
]

const routes:Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "categories", component: CategoriesLisstComponent },
      { path: "categories/form", component: CategoriesFormComponent },
      { path: "categories/form/:id", component: CategoriesFormComponent },
      { path: "products", component: ProductListComponent },
      { path: "products/form", component: ProductFormComponent },
      { path: "products/form/:id", component: ProductFormComponent},
    ]
  },
]

@NgModule({
  declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesLisstComponent, CategoriesFormComponent, ProductListComponent, ProductFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...UX_MODULES,
    RouterModule.forRoot(routes,{initialNavigation:'enabled'}),
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
