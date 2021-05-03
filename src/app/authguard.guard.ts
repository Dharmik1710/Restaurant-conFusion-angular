import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

    constructor(private routes: Router, public dialog: MatDialog){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            if(localStorage.getItem('currentUser') != null){
                return true;
            }else{
                this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
                // return false;
            }
        } 
}