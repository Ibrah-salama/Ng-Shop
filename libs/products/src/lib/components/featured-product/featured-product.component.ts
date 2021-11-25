import { Component, OnInit } from '@angular/core';
import {  Product, ProductsService } from '@blubits/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-featured-product',
  templateUrl: './featured-product.component.html',
  styles: [
  ]
})
export class FeaturedProductComponent implements OnInit {
  endSub$:Subject<boolean>= new Subject()
  featuredProducts:Product[]=[]
  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this._getFeatured()
  }

  ngOnDestroy(){
    this.endSub$.next()
    this.endSub$.complete()
  }
  private _getFeatured(){
    this.productsService.getFeaturedProducts(4).pipe(takeUntil(this.endSub$)).subscribe(res=>{
      this.featuredProducts = res.featuredProducts
    })
  }
}
