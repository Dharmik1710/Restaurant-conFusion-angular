import { Component, OnInit, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [flyInOut()]
})
export class HomeComponent implements OnInit {

  promotion: Promotion;
  dish: Dish;
  leader: Leader;
  dishErrMsg: string;
  promoErrMsg: string;
  leaderErrMsg: string;

  constructor(private dishService: DishService, 
              private promotionService: PromotionService, 
              private leaderService: LeaderService,
              @Inject('baseURL') public BaseURL) { }

  ngOnInit(): void {
    this.promotionService.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion, promoerrmsg => this.promoErrMsg = <any>promoerrmsg);
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish, disherrmsg => this.dishErrMsg = <any>disherrmsg);
    this.leaderService.getFeaturedLeader().subscribe((leader) => this.leader = leader, leadererrmsg => this.leaderErrMsg = <any>leadererrmsg);
  }
}