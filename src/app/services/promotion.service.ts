import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(BaseURL + 'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: String): Observable<Promotion>{
    return this.http.get<Promotion>(BaseURL + 'promotion/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion[]>(BaseURL + 'promotions?featured=true')
    .pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}