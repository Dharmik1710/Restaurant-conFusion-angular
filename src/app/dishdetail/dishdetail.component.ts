import { Component, OnInit, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  constructor(private dishhService: DishService, 
              private location: Location, 
              private route: ActivatedRoute,
              private fb: FormBuilder) { 
                this.createForm();
              }

  dish: Dish;
  dishIds: String[];
  prev: String;
  next: String;
  commentForm: FormGroup;
  comment: Comment;
  @ViewChild('cform') commentFormDirective;
  
  ngOnInit(): void {
    this.dishhService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap(params => this.dishhService.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(this.dish.id);
      });
  }

  formErrors = {
    "author" : [],
    "comment" : []
  }

  ValidatorsMessages = {
    'author' : {
      "required" : "Author name is required",
      "minlength" : "Author Name must be at least 2 characters long"
    },
    'comment' : {
      "required" : "Comment is required"
    }
  }

  createForm(){
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5],
      comment: ['', Validators.required]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data? : any): void{
    if(!this.commentForm){ return; };
    const form = this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = [];
        const control = form.get(field);
        if((control || control.dirty || control.touched ) && control.invalid){
          const messages = this.ValidatorsMessages[field];
          for(const key in control.errors){
            this.formErrors[field] += messages[key];
          }
        }
      }
    } 
  }

  goBack(): void{
    this.location.back();
  }
  
  setPrevNext(dishId: String){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length]
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toString();
    this.dish.comments.push(this.comment);
    this.commentForm.reset();
    this.commentFormDirective.resetForm({
      author: '',
      rating: 5,
      comment: ''
    });
  }
}