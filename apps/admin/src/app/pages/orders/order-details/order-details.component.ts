import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '@blubits/orders';
import { ActivatedRoute } from '@angular/router';
import { ORDER_STATUS } from '../order.constant';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styles: [
  ]
})
export class OrderDetailsComponent implements OnInit {
  order:Order={};
  orderStatus:{[key:string]:{label:string,color:string}}=ORDER_STATUS
  orderStatuses:{id:string,name:string}[]=[]
  selectedStatus:any ;
  constructor(private messageService:MessageService, private location:Location,
    private orderServce: OrderService, private route:ActivatedRoute) {
     }

  ngOnInit(): void {
    this._mapOrderStatus()
    this._getOrder();
  }
  private _mapOrderStatus(){
    this.orderStatuses = Object.keys(this.orderStatus).map(key=>{
      return{
        id:key,
        name:this.orderStatus[key].label
      }
    })
  }
  onStatusChange(event:any){
    if(this.route.params)
    this.orderServce.updateOrder(this.order.id! ,{status:event.value}).subscribe(res=>{
      this.messageService.add({
        severity: 'success',
        summary: res.status,
        detail: `Order updated successfully`,
      });
      //navigate back use Location service fro angular/common and timer from rxjs
      timer(2000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: "Error",
        detail: `Fail to update the order, please contact the adminstrator!`,
      });
    })
  }
  private _getOrder(){
    this.route.params.subscribe(params=>{
      if(params.id){
        this.orderServce.getOrder(params.id).subscribe(res=>{
          this.order = res.data
          this.selectedStatus = res.data.status
        })
      }
    })

  }
}
