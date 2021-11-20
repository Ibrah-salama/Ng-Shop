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
    addProduct(productData:FormData):Observable<{status:string, data:Product}>{
        return this.http.post<{status:string, data:Product}>(this.productsUrl,productData)
    }
    getProduct(productId:string):Observable<{status:string,data:Product}>{
        return this.http.get<{status:string,data:Product}>(`${this.productsUrl}/${productId}`)
    }
    updateProduct(productId:string, product:FormData):Observable<{status:string, data:Product}>{
        return this.http.patch<{status:string, data:Product}>(`${this.productsUrl}/${productId}`,product)
    }
}