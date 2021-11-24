import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs"
import { environment } from "@env/environment"
import {  Category } from "../models/category"

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apitUrlCategories = `${environment.apiUrl}/categories`
  // apitUrlCategories = "http://localhost:3000/api/v1/categories"
  constructor(private http:HttpClient) { }

  getCategories():Observable<{status:string,data:Category[]}>{
    return this.http.get<{status:string,data:Category[]}>(this.apitUrlCategories)
  }

  createCategory(category:Category):Observable<{status:string,data:Category}>{
   return this.http.post<{status:string,data:Category}>(this.apitUrlCategories,category)
  }
  
  deleteCategory(categoryId:string):Observable<{status:string,message:string}>{
    return this.http.delete<{status:string,message:string}>(`${this.apitUrlCategories}/${categoryId}`)
  }
  getCategory(categoryId:string):Observable<{status:string, data:Category}>{
    return this.http.get<{status:string, data:Category}>(`${this.apitUrlCategories}/${categoryId}`)
  }
  updateCategory(category:Category,categoryId:string):Observable<{status:string, data:Category}>{
    return this.http.patch<{status:string, data:Category}>(`${this.apitUrlCategories}/${categoryId}`,category)
  }
}
