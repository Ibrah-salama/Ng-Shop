import { Injectable } from "@angular/core";
import { User } from "@blubits/users";
import { HttpClient } from "@angular/common/http"
import { environment } from "@env/environment";
import { Observable } from "rxjs"
import * as countriesLib from 'i18n-iso-countries';
declare const require:any;
@Injectable({
 providedIn:"root"
})
export class UsersService{
    usersUrl =`${environment.apiUrl}/users`
    // usersUrl = "https://e-backen.herokuapp.com/api/v1/users"
    constructor(private http:HttpClient){
        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    }

    getUsers():Observable<{status:string,data:User[]}>{
        return this.http.get<{status:string,data:User[]}>(this.usersUrl)
    }
    createUsers(user:User):Observable<{status:string,data:User}>{
        return this.http.post<{status:string,data:User}>(this.usersUrl,user)
    }
    deleteUser(userId:string):Observable<any>{
        return this.http.delete<any>(`${this.usersUrl}/${userId}`)
    }
    updateUser(user:User,userId:string):Observable<{status:string,data:User}>{
        return this.http.patch<{status:string,data:User}>(`${this.usersUrl}/${userId}`,user)
    }
    getUser(userId:string):Observable<{status:string,data:User}>{
        return this.http.get<{status:string,data:User}>(`${this.usersUrl}/${userId}`)
    }

    getCountries(): { id: string; name: string }[] {
        return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
          return {
            id: entry[0],
            name: entry[1]
          };
        });
      }
    
      getCountry(countryKey: string): string {
        return countriesLib.getName(countryKey, 'en');
      }
}