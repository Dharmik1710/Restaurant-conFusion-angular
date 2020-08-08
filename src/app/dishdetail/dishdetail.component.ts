import { Component, OnInit} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  constructor(private dishhService: DishService, private location: Location, private route: ActivatedRoute) { }

  dish: Dish;

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.dish = this.dishhService.getDish(id);
  }
  goBack(): void{
    this.location.back();
  }
}
