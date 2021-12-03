import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { LocalstorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor( private localtorageService:LocalstorageService,private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localtorageService.getToken()
    if(token){
      const decodedData = JSON.parse(atob(token.split('.')[1]))
      if(decodedData.isAdmin && !this._tokenExpired(decodedData.exp)){ 
        return true 
      }
      return true 
    }
      this.router.navigate(["/login"])
      return false;
  }
  private _tokenExpired(expirationData:number):boolean{
    return Math.floor(new Date().getTime()/1000)>=expirationData
  }
}
