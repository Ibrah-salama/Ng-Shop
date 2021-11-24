import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@blubits/users'
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apitURLUsers = `${environment.apiUrl}/users`
  constructor(private http:HttpClient, private router:Router,private localStorgaeService:LocalstorageService) { }
  
  login(email:string,password:string):Observable<{status:string,token:string}>{
    return this.http.post<{status:string,token:string}>(`${this.apitURLUsers}/login`,{email,password})
  }

  logout(){
    this.localStorgaeService.removeToken()
    this.router.navigate(['/login'])
  }
}
