import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env/environment'
import { Observable } from 'rxjs'
import { Order } from "../models/order"

@Injectable({
    providedIn:"root"
})
export class OrderService{
    ordersUrl = `${environment.apiUrl}/orders`
    // ordersUrl = "https://e-backen.herokuapp.com/api/v1/orders"
    constructor(private http:HttpClient){
    }
    getOrders():Observable<{state:string, data:Order[]}>{
        return this.http.get<{state:string, data:Order[]}>(this.ordersUrl)
    }

    deleteOrder(orderId:string):Observable<{status:string,data:null}>{
        return this.http.delete<{status:string,data:null}>(`${this.ordersUrl}/${orderId}`)
    }
    addOrder(order:Order):Observable<{status:string, data:Order}>{
        return this.http.post<{status:string, data:Order}>(this.ordersUrl,order)
    }
    getOrder(orderId:string):Observable<{status:string,data:Order}>{
        return this.http.get<{status:string,data:Order}>(`${this.ordersUrl}/${orderId}`)
    }
    updateOrder(orderId:string,orderStatus:{status:string}):Observable<{status:string, data:Order}>{
        return this.http.patch<{status:string, data:Order}>(`${this.ordersUrl}/${orderId}`,orderStatus)
    }

    getTotalSales():Observable<{status:string,data:number}>{
        return this.http.get<{status:string,data:number}>(`${this.ordersUrl}/get/totalsales`)
    }
}