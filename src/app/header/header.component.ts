import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { flyInOut } from '../animations/app.animation';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [flyInOut()]
})
export class HeaderComponent implements OnInit {

    isLoggedIn: boolean = false;
    username: string = null;

    constructor(public dialog: MatDialog, private userService: UserService) { 
    }

    ngOnInit(): void {
        this.userService.isLoggedIn.subscribe((val) => {
            this.isLoggedIn = val;
            this.username = localStorage.getItem("currentUser");
            console.log("isLoggedIn", val);
        });
    }

    openLoginForm(){
        this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
    }

    Logout(){
        alert("logging out");
        console.log("Logging out");
    }
}