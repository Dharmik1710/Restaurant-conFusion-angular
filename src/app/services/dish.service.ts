import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import {DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  getDishes(): Observable<Dish[]>{
    return of(DISHES);
  }

  getFeaturedDish(): Observable<Dish>{
    return of(DISHES.filter((dish) => (dish.featured))[0]);
  }

  getDish(id: String): Observable<Dish>{
    return of(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getDishIds(): Observable<string[] | any>{
    return of(DISHES.map(dish => dish.id));
  }

  constructor() { }
}