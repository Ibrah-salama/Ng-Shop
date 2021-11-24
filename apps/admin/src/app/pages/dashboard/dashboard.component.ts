import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '@blubits/orders';
import { ProductsService } from '@blubits/products';
import { UsersService } from '@blubits/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
  totalSales=0
  totalUsers=0
  totalOrders=0
  totalProducts=0
  endSubs$:Subject<boolean> = new Subject()
  constructor(
    private orderService:OrderService,
    private userService:UsersService,
    private productService:ProductsService
  ) { }

  ngOnInit(): void {
    this._getTotalSales()
    this._getTotalUser()
    this._getTotalOrders()
    this._getTotalProducts()
  }
  ngOnDestroy(){
    this.endSubs$.next()
    this.endSubs$.complete()
  }
  private _getTotalSales(){
    this.orderService.getTotalSales().pipe(takeUntil(this.endSubs$)).subscribe(res=>{
      this.totalSales= res.data
    })
  }
  private _getTotalUser(){
    this.userService.getUsers().pipe(takeUntil(this.endSubs$)).subscribe(res=>{
      this.totalUsers = res.data.length
    })
  }
  private _getTotalOrders(){
    this.orderService.getOrders().pipe(takeUntil(this.endSubs$)).subscribe(res=>{
      this.totalOrders = res.data.length
    })
  }
  private _getTotalProducts(){
    this.productService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe(res=>{
      this.totalProducts = res.data.length
    })
  }

}
