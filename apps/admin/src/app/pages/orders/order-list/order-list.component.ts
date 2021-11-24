import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService, Order } from '@blubits/orders';
import { MessageService } from 'primeng/api';
import { ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router'
import { ORDER_STATUS } from '../order.constant';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit,OnDestroy {
  orders: Order[] = [];
  endSub$:Subject<boolean> = new Subject()
  orderStatus:{[key:string]:{label:string,color:string}}=ORDER_STATUS
  constructor(
    private messageService: MessageService,
    private ordersService: OrderService,
    private confirmationService:ConfirmationService,
    private router:Router
    ) {
    }

  ngOnInit(): void {
    this._getOrders()
  }
  ngOnDestroy(){
    this.endSub$.next()
    this.endSub$.complete()
  }
  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this order?',
      header: 'Delete order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          // this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
          this.ordersService.deleteOrder(orderId).subscribe(
            () => {
              this._getOrders()
              this.messageService.add({
                severity: 'success',
                summary: 'Deleted',
                detail: `Category Deleted successfully :D`,
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: `Category failed to Delete!`,
              });
            }
          );
      },
      reject: () => {      
      }
  });

   
  }
  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`)
  }

  private _getOrders(){
    this.ordersService.getOrders().pipe(takeUntil(this.endSub$)).subscribe((res) => {
      this.orders = res.data;
    });
  }
}
