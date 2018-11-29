import { Global } from './../shared/Global';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EligibilityService } from '../services/eligibility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';
import { IRegistartiondetails } from '../model/registrationdetails';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-RdForm',
  templateUrl: './RdForm.component.html',
  styleUrls: ['./RdForm.component.css']
})
export class RdFormComponent implements OnInit {
  RdFrm: FormGroup;
  technologies = [];
  partys = [];

  constructor(private fb: FormBuilder, private service: EligibilityService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.RdFrm = this.fb.group({
      PartyAffiliation: ['', Validators.required]
    });
    this.technologies = Global.technologies;
    this.partys = Global.partys;
  }
  onSubmit(formData: any) {
    const contactData = this.mapDateData(formData.value);

    this.router.navigateByUrl('/review');
    // this.service.addEligibility(contactData).subscribe(
    //   (data: IRegistartiondetails) => {
    //     this.service.sharedEligibility = contactData;
    //      this.router.navigateByUrl('/review');
    //   }
    // );
}

mapDateData(customer: IRegistartiondetails): IRegistartiondetails {
 // customer.Dob = new Date(customer.Dob).toISOString();
  console.log(customer.PartyAffiliation);
  return customer;
}

}
