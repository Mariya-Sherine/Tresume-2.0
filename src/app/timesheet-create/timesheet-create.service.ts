import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class TimesheetCreateService {
    public endpoint = environment.apiUrl;
    // public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
    // public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }
    createTimesheet(data: any) {
      const url = `${this.endpoint}/'https://beta.tresume.us/TresumeAPI'`; 
      return this.http.post(url, data);
    }
}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}