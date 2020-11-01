import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { ArgumentOutOfRangeError } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [ flyInOut() ]
})

export class ContactComponent implements OnInit {

  feedback: Feedback;
  feedbackCopy: Feedback;
  contactType= ContactType;
  feedbackForm: FormGroup;
  errMsg: string;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname' : [],
    'lastname' : [],
    'telnum' : [],
    'email' : []
  }

  validationMessages = {
    'firstname' : {
      'required' : 'First name is required',
      'maxlength' : 'Max length of first name is 25'
    },
    'lastname' : {
      'required' : 'Last name is required',
      'maxlength' : 'Max length of last name is 25'
    },
    'email' : {
      'required' : 'Email is required',
      'email' : 'Email is invalid',
      'minlength': 'Length required is greater than or equal to 5'
    },
    'telnum' : {
      'required' : 'Tel number is required',
      'pattern' : 'Tel number is invalid'
    }
  }

  constructor(private fb: FormBuilder, 
              private el: ElementRef,
              private feedbackService: FeedbackService) { 
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', [Validators.required, Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset the validation messages
  }

  onValueChanged(data? : any): void{
    if(!this.feedbackForm){ return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        // clear the prev feild if present
        this.formErrors[field] = [];
        const control = form.get(field);
        if((control || control.touched || control.dirty) && control.invalid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            this.formErrors[field].push(messages[key]);
          }
        }
      }
    }
  }

  focusOnInvalidField(){
    for(const field in this.formErrors){
      if(this.formErrors[field].length){
        const control = this.el.nativeElement.querySelector("input[formControlName = '"+field+"']");
        control.focus();
        return;    
      }
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){    
    if(this.feedbackForm.invalid){
      this.focusOnInvalidField();
      return;
    }
    this.feedbackCopy=this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedbackCopy)
      .subscribe(feedback => {
        this.feedback=feedback;
        setTimeout(() => {
          this.feedbackCopy = null;
          this.feedback = null;      
        }, 5000);
      }, errmsg => this.errMsg = errmsg );
      this.feedbackFormDirective.resetForm(); 
  }

}