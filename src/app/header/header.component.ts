import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { flyInOut } from '../animations/app.animation';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLoginForm(){
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }
}