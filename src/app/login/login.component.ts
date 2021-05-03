import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private userService: UserService) { }

  user = {username: '', password: '', remember: false};

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("User : ", this.user);
    this.userService.login(this.user);
    this.dialogRef.close();
  }

}
