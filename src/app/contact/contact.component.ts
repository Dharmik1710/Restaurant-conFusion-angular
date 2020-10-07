import { Component, OnInit, ViewChild } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedback: Feedback;
  contactType= ContactType;
  feedbackForm: FormGroup;
  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  validatorEmail='[a-zA-Z]+[._-]{0,1}[a-zA-Z0-9]+[@][a-zA-Z]+[\.][a-zA-Z]{2,}';

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', [Validators.required, Validators.maxLength(10)]],
      telnum: "",
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.feedback=this.feedbackForm.value;
    if(this.feedbackForm.invalid){
      return
    }
    this.feedbackFormDirective.resetForm();
  }
}