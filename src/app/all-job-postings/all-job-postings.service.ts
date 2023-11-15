import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AllJobPostingsService {
  public endpoint = environment.apiUrl;

  constructor(private http: HttpClient) { }
  createTimesheet(data: any) {
    const url = `${this.endpoint}/'https://beta.tresume.us/TresumeAPI'`; 
    return this.http.post(url, data);
  }

  getJobPostingList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getJobPostingList', request);
  }

  insertJobPosting(jobDetails: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'insertJobPosting', jobDetails);
  }
}

export interface ResponseDetails {
  flag?: any;
  result?: any;
}
