import { Component, OnInit} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  constructor(private dishhService: DishService, private location: Location, private route: ActivatedRoute) { }

  dish: Dish;
  dishIds: String[];
  prev: String;
  next: String;

  ngOnInit(): void {
    this.dishhService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap(params => this.dishhService.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(this.dish.id);
      });
  }
  goBack(): void{
    this.location.back();
  }
  setPrevNext(dishId: String){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length]
  }
}