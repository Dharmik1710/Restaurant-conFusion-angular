import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import {DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  getDishes(): Dish[]{
    return DISHES;
  }

  getFeaturedDish(): Dish{
    return DISHES.filter((dish) => (dish.featured))[0];
  }

  getDish(id: String): Dish{
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  constructor() { }
}