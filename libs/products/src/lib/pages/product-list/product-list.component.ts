import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
} from '@blubits/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  categoryid = ""
  selectedCategory:Category = {}
  endSub$: Subject<boolean> = new Subject();
  isCategoryPage = false
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      params.categoryid? this._productList([params.categoryid]) : this._productList()
      params.categoryid? (this.isCategoryPage=true) : (this.isCategoryPage=false)
    })
    this._categoryList()
  }
  ngOnDestroy() {
    this.endSub$.next();
    this.endSub$.complete();
  }
  private _productList(categories?:any) {
    this.productsService
      .getProducts(categories)
      .pipe(takeUntil(this.endSub$))
      .subscribe((res) => {
        this.products = res.data;
      });
  }
  private _categoryList() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSub$))
      .subscribe((res) => {
        this.categories = res.data;
      });
  }

  categoryFilter(){
    const selectedCategories= this.categories.filter(category=> category.checked).map(category=> category.id)
    this._productList(selectedCategories)
  }

}
