import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  CartService } from '@blubits/orders';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from '@blubits/products'
import { CartItemDetails } from './../../models/cart';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemDetailed : CartItemDetails[] =[]
  cartCount=0
  endSubs$:Subject<boolean> = new Subject()
  constructor(
    private router:Router,
    private cartService:CartService,
    private productService:ProductsService,
    private messageService:MessageService
    ) { }

  ngOnInit(): void {
    this._getCartDetails()
  }
  ngOnDestroy(){
    this.endSubs$.next()
    this.endSubs$.complete()
  }
  private _getCartDetails(){
    this.cartService.cart$.pipe().subscribe(resCart=>{
      this.cartItemDetailed =[]
      this.cartCount = resCart?.items?.length || 0
      resCart.items?.forEach(cartItem=>{
        this.productService.getProduct(cartItem.productId!).pipe(takeUntil(this.endSubs$)).subscribe(product=>this.cartItemDetailed.push({product:product.data,quantity:cartItem.quantity}))
      })
    })
  }
  backToShop(){
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem:CartItemDetails){
    this.cartService.deleteCartItem(cartItem.product.id)
    this.messageService.add({
      severity: 'success',
      summary: "Success",
      detail: `Item deleted successfully`,
    });
  }

  updateCartItemQauntity(event:any,cartItem:CartItemDetails){

    this.cartService.setCartItem({
      productId:cartItem.product.id,
      quantity: event.value
    },true)
  }
}
