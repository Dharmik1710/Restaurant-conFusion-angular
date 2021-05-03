import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  isLoggedIn = new BehaviorSubject(false);

  login(userData: {username: string, password: string}): Observable<boolean>{
    if(localStorage.getItem("currentUser")){
        alert("You are already logged in");
        this.isLoggedIn.next(true);
        return of(true);
    }else{
        localStorage.setItem("currentUser", userData.username);
        this.isLoggedIn.next(true);
        return of(true);
    }
  }
}