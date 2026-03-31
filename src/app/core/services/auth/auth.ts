import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { jwtDecode } from 'jwt-decode';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  constructor (private httpClient: HttpClient, private router : Router) {}
  userTokenData: any;

  sendRegisterData (data:object): Observable<any>{
    return this.httpClient.post(`${environment.BASE_URL}/api/v1/users/signUp`,
      data
    )
  }

  sendLoginData (data:object): Observable<any>{
    return this.httpClient.post(`${environment.BASE_URL}/api/v1/users/signIn`,
      data
    )
  }

  saveUserToken(): void{
    const token = localStorage.getItem('userToken')!;
    this.userTokenData = jwtDecode(token);
    console.log(this.userTokenData);
  }

  userSignOut():void{
    localStorage.removeItem('userToken');
    this.userTokenData = null;
    this.router.navigate(['./login'])
  }
}
