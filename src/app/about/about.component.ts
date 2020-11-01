import { Component, Inject, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [flyInOut()]
})

export class AboutComponent implements OnInit {

  constructor(private leaderService: LeaderService,
              @Inject('baseURL') public BaseURL) { }

  Leaders: Leader[];
  errMsg: string;

  ngOnInit(): void {
     this.leaderService.getLeaders().subscribe((Leaders) => this.Leaders = Leaders, errmsg => this.errMsg = errmsg);
  }

}