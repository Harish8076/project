import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate() {
    const token = localStorage.getItem("token")
    if(!token){
      return false
    }
    return true;
  }
  
}
