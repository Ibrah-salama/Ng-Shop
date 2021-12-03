import { HttpClient, HttpParams } from '@angular/common/http'
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
    getProducts(categories?:string[]):Observable<{state:string, data:Product[]}>{
        let params = new HttpParams()
        if(categories){
          params = params.append('categories',categories.join(','))
        }
        return this.http.get<{state:string, data:Product[]}>(this.productsUrl,{params:params})
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

    getFeaturedProducts(count:number):Observable<{status:string,featuredProducts:Product[]}>{
        return this.http.get<{status:string,featuredProducts:Product[]}>(`${this.productsUrl}/get/featured/${count}`)
    }
}