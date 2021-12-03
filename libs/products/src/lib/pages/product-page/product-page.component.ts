import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@blubits/orders';
import { Product, ProductsService } from '@blubits/products';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product = {};
  endSubs$:Subject<boolean> = new Subject()
  quantity = 1
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService:CartService,
    private messageService:MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this._getProductById(params.productid);
      }
    });
  }
ngOnDestroy(){
  this.endSubs$.next()
  this.endSubs$.complete()
}
  private _getProductById(id: string) {
    this.productsService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe((res) => {
      this.product = res.data;
    });
  }
  addProductToCart(){
    const cartItem:CartItem = {
      productId: this.product.id,
      quantity:this.quantity
    }
    this.cartService.setCartItem(cartItem)
    this.messageService.add({
      severity: 'success',
      summary: "Success",
      detail: `Item added successfully`,
    });
  }

}
