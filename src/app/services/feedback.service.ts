import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { BaseURL } from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  constructor(private http: HttpClient,
              private processHttpMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback): Observable<Feedback>{
    const httpOptoins = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(BaseURL + 'feedback/', feedback, httpOptoins)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

}