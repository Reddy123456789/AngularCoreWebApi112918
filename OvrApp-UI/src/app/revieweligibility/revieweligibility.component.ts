import { Component, OnInit } from '@angular/core';
import { EligibilityService } from '../services/eligibility.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-revieweligibility',
  templateUrl: './revieweligibility.component.html',
  styleUrls: ['./revieweligibility.component.css']
})
export class RevieweligibilityComponent implements OnInit {
  public getcustomer: any;
  myData: any;

  modalTitle: string;
  modalBtnTitle: string;
  constructor(private service: EligibilityService, private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    const contactData = this.service.sharedEligibility;
   // console.log(contactData);
    this.getcustomer = contactData;
    console.log(this.getcustomer, this.getcustomer.id, this.getcustomer.dlNumber, this.getcustomer.lastSSN);
  }
  navigatetoRd() {
    this.router.navigateByUrl('/rdform');
}

editContact(id: number) {
  console.log('edit contact id is ' + id);

// const contactData = this.service.sharedEligibility;
// console.log(contactData);
// this.service.sharedReview = contactData;
// this.service.getOneEligibility(id).subscribe( val => console.log(val));
// this.service.getOneEligibility(id).subscribe( val => this.service.sharedReview = val);

this.service.getOneEligibility(id).subscribe( response => {
  this.myData = response;
  console.log(this.myData);
  this.service.sharedReview = this.myData;
  this.router.navigateByUrl('/eligibilityreactive');

// const contactData = this.service.sharedReview;
// this.service.sharedReview = contactData1;

// console.log(contactData);

 // this.service.sharedReview = contactData;

// this.router.navigateByUrl('/eligibilityreactive');
}, error => {
  console.log(error);
});
}}
