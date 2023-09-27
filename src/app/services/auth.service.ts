import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http : HttpClient) { }

  signUp(userData:any){
    return this.http.post('http://localhost:3000/signup' , userData)
  }
  /** 
   * Calling API for login the user
   */
  login(userData:any){
    return this.http.post('http://localhost:3000/login' , userData)
  }

  dashboardAPI(){
    return this.http.get('http://localhost:3000/dashboard')
  }
}
