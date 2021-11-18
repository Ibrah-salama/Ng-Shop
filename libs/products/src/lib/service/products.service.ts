import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env/environment'
import { Observable } from 'rxjs'
import { Product } from "../models/product"

@Injectable({
    providedIn:"root"
})
export class ProductsService{
    productsUrl = `${environment.apiUrl}/products`
    // productsUrl = "https://e-backen.herokuapp.com/api/v1/products"
    constructor(private http:HttpClient){
    }
    getProducts():Observable<{state:string, data:Product[]}>{
        return this.http.get<{state:string, data:Product[]}>(this.productsUrl)
    }

    deleteProduct(productId:string):Observable<{status:string,data:null}>{
        return this.http.delete<{status:string,data:null}>(`${this.productsUrl}/${productId}`)
    }
}