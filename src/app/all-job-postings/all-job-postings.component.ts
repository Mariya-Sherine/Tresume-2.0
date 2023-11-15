import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AllJobPostingsService } from './all-job-postings.service';

@Component({
  selector: 'app-all-job-postings',
  templateUrl: './all-job-postings.component.html',
  styleUrls: ['./all-job-postings.component.scss'],
  providers: [AllJobPostingsService, CookieService, MessageService],
})
export class AllJobPostingsComponent implements OnInit {
  OrgID:string = '';
  JobID:string = '';
  TraineeID:string = '';
  jobs:any[];
  noResultsFound:boolean = false;

roles: string[] = ["Recruiter", "Admin", "User"];
ngOnInit(): void {
  this.OrgID = this.cookieService.get('OrgID');
  this.JobID = this.cookieService.get('userName1');
  this.TraineeID = this.cookieService.get('TraineeID');
  this.fetchjobpostinglist();
}

  insertForm: FormGroup;

  constructor(private dialog: MatDialog, private cookieService: CookieService, private service: AllJobPostingsService, private messageService: MessageService, private fb: FormBuilder,
  ) {
    this.insertForm = this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      payRate: [0, Validators.min(0)],
      newApplicants: [0, Validators.min(0)],
      totalApplicants: [0, Validators.min(0)],
      postedOn: ['', Validators.required], 
      postedBy: ['', Validators.required],
      jobType: ['', Validators.required]
    });
  }
  fetchjobpostinglist(){
    let Req = {
      OrgID: this.OrgID,
    };
    this.service.getJobPostingList(Req).subscribe((x: any) => {
      this.jobs = x.result;
      this.noResultsFound = this.jobs.length === 0;
    });
  }
  
  jobOptions = ['My Jobs', 'Assigned Jobs', 'All Jobs'];

  insertJob() {
    if (this.insertForm.valid) {
      const newJob = this.insertForm.value;

      this.service.insertJobPosting(newJob).subscribe(
        (response) => {
          this.fetchjobpostinglist();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Job inserted successfully',
          });
        },
        (error) => {
          console.error('Error inserting job:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to insert job',
          });
        }
      );
    } else {
      
    }
  }
}
