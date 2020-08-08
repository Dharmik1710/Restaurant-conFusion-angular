import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Promotion[]{
    return PROMOTIONS;
  }

  getPromotion(id: String): Promotion{
    return PROMOTIONS.filter((Dish) => (Dish.id === id))[0];
  }

  getFeaturedPromotion(): Promotion{
    return PROMOTIONS.filter((Dish) => (Dish.featured))[0];
  }

  constructor() { }
}