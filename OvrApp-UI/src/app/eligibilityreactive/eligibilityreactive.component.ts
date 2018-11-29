import { CommonSetting, IEligibility } from './../model/eligibility';
import { Global } from './../shared/Global';
import { EligibilityService } from './../services/eligibility.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { VALID } from '@angular/forms/src/model';
import { error } from 'protractor';

@Component({
  selector: 'app-eligibilityreactive',
  templateUrl: './eligibilityreactive.component.html',
  styleUrls: ['./eligibilityreactive.component.css']
})
export class EligibilityreactiveComponent implements OnInit {
  eligibilityFrm: FormGroup;
  citizens = [];

  public getcustomer: any;

  myData: any;
  public getrecorddata: any;

  isNewRegistration = false;
  isNewrecordUpdate = false;
  isNewRequesttoReplace = false;
  RecordUpdate = false;
  RequesttoReplace = false;

  RecaptaSiteKey: string = CommonSetting.RecaptaSiteKey;
  isRecaptaValid = false;

  formErrors = {
    'IsCitizen': '',
    'IsFelon': '',
    'IsMentalIncomp': '',
    'DLNumber': '',
    'LastSSN': '',
    'LastName': '',
    'FirstName': '',
    'MiddleName': '',
    'Dob': '',
   // 'recaptchaReactive': ''
    // 'proficiency': ''
  };
  // This object contains all the validation messages for this form
  validationMessages = {
    'IsCitizen': {
      'required': 'IsCitizen is required.',
    },
    'IsFelon': {
      'required': 'IsFelon is required.',
    },
    'IsMentalIncomp': {
      'required': 'IsMentalIncomp is required.',
    },
    'DLNumber': {
      'required': 'DLNumber is required.',
      'minlength': 'DLNumber must be greater than 2 characters.',
      'maxlength': 'DLNumber must be less than 13 characters.'
    },
    'LastSSN': {
      'required': 'LastSSN is required.',
      'maxlength': 'Last4SSN must be less than 4 characters.'
    },
    'LastName': {
      'required': 'LastName is required.'
    },
    'FirstName': {
      'required': 'FirstName is required.'
    },
    'MiddleName': {
      'required': 'MiddleName is required.'
    },
    'Dob': {
      'required': 'Dob is required.'
    },
    // 'recaptchaReactive': {
    //   'required': 'recaptchaReactive is required.'
    // }
  };

  constructor(private fb: FormBuilder, private service: EligibilityService, private route: ActivatedRoute,
  private router: Router) { }
  public DLPattern = {'A': { pattern: new RegExp('^[A-Za-z]$')}, '0': { pattern: new RegExp('^[0-9]$')} };
  public SSNPattern = {'0': { pattern: new RegExp('^[0-9]$')} };
  ngOnInit() {

const reviewdata = this.service.sharedReview;

this.getcustomer = reviewdata;

console.log('record id has value from shared review ' + this.getcustomer.id);

    this.eligibilityFrm = this.fb.group({
      id: [''],
      IsCitizen: ['', Validators.required],
      IsFelon: ['', Validators.required],
      IsMentalIncomp: ['', Validators.required],

      NewRegistration: [''],
      RecordUpdate: [''],
      RequesttoReplace: [''],
    //  DLNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern(this.unamePattern)]],
     DLNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(13)]],
     LastSSN: ['', [Validators.required, Validators.maxLength(4)]],
      LastName: ['', Validators.required],
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
     // Dob: ['']
      Dob: ['', Validators.required],
    //  recaptchaReactive: ['', Validators.required]
    });
    this.citizens = Global.citizens;

    this.eligibilityFrm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.eligibilityFrm);
    });


  }
  logValidationErrors(group: FormGroup = this.eligibilityFrm): void {
    // console.log(Object.keys(group.controls));
     Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        this.eligibilityFrm.setValue({

        });
      } else {
        this.formErrors[key] = '';
         if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
         const messages = this.validationMessages[key];
        // console.log(messages);
         for (const errorKey in abstractControl.errors) {
           if (errorKey) {
             this.formErrors[key] += messages[errorKey] + ' ';
           }
         }
        }
      }
     });
    }

    onSubmit(formData: any) {
      const contactData = this.mapDateData(formData.value);
      this.getrecorddata = contactData;

      contactData.NewRegistration = this.eligibilityFrm.get('NewRegistration').value;
      contactData.RecordUpdate = this.eligibilityFrm.get('RecordUpdate').value;
      contactData.RequesttoReplace = this.eligibilityFrm.get('RequesttoReplace').value;

      console.log('contactData.id is');
      console.log(this.getrecorddata, 'id is ' + this.getrecorddata.id, 'DLNumber is ' + this.getrecorddata.DLNumber);

      const reviewdata = this.service.sharedReview;
      this.getcustomer = reviewdata;

      if (this.getcustomer.id != null) {
        console.log('record id has value from shared review ' + this.getcustomer.id);
        console.log('record id has value ' + this.getrecorddata.id);
        this.service.postEligibility(this.getcustomer.id, contactData).subscribe(response => {
              this.myData = response;
              console.log(this.myData);
              this.service.sharedEligibility = this.myData;
              console.log('this.myData');
              console.log(this.myData);
               this.router.navigateByUrl('/review');
              // this.router.navigateByUrl('/getlist');
              // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                console.log(error);
              });
      } else if (this.getrecorddata.id === '') {
        console.log('record id is empty ' + this.getrecorddata.id);
        this.service.addEligibility(contactData).subscribe(response => {
          this.myData = response;
          console.log(this.myData);
          this.service.sharedEligibility = this.myData;
           this.router.navigateByUrl('/review');
          // this.router.navigateByUrl('/getlist');
          // tslint:disable-next-line:no-shadowed-variable
          }, error => {
            console.log(error);
          });
      }

        // this.service.addEligibility(contactData).subscribe(response => {
        //   this.myData = response;
        //   console.log(this.myData);
        //   this.service.sharedEligibility = this.myData;
        // //   this.router.navigateByUrl('/review');
        //   // this.router.navigateByUrl('/getlist');
        //   // tslint:disable-next-line:no-shadowed-variable
        //   }, error => {
        //     console.log(error);
        //   });

    //   if (contactData.id) {
    //     console.log(contactData.id);
    //   this.service.addEligibility(contactData).subscribe(response => {
    //   this.myData = response;
    //   console.log(this.myData);
    //   this.service.sharedEligibility = this.myData;
    //    this.router.navigateByUrl('/review');
    //   // this.router.navigateByUrl('/getlist');
    //   // tslint:disable-next-line:no-shadowed-variable
    //   }, error => {
    //     console.log(error);
    //   });
    // } else {
    //   console.log(contactData.id);
    //    this.service.postEligibility(contactData.id, contactData).subscribe(response => {
    //     this.myData = response;
    //     console.log(this.myData);
    //     this.service.sharedEligibility = this.myData;
    //      this.router.navigateByUrl('/review');
    //     // this.router.navigateByUrl('/getlist');
    //     // tslint:disable-next-line:no-shadowed-variable
    //     }, error => {
    //       console.log(error);
    //     });
    // }
  }

  mapDateData(customer: IEligibility): IEligibility {
     customer.Dob = new Date(customer.Dob).toISOString();
     console.log(customer.Dob);
     return customer;
   }

   setNewRegistrationStatus() {
    // this.isNewRegistration = this.eligibilityFrm.get('NewRegistration').value;

    if (this.eligibilityFrm.get('NewRegistration').value === true) {
      this.eligibilityFrm.get('RequesttoReplace').setValue(false);
      this.eligibilityFrm.get('RecordUpdate').setValue(false);
      this.isNewrecordUpdate = true;
    } else {
      this.isNewrecordUpdate = false;
    }
  }

  setNewRegistrationStatusFalse() {
    this.RecordUpdate = this.eligibilityFrm.get('RecordUpdate').value;
    this.RequesttoReplace = this.eligibilityFrm.get('RequesttoReplace').value;
    if (this.RecordUpdate === true || this.RequesttoReplace === true) {
      this.isNewRegistration = true;
      this.eligibilityFrm.get('NewRegistration').setValue(false);
    } else {
      this.isNewRegistration = false;
    }
  }
   setDefaultValues() {
     this.eligibilityFrm.patchValue({ NewRegistration: false, RecordUpdate: false, RequesttoReplace: false });
   // this.eligibilityFrm.setValue({ NewRegistration: false, RecordUpdate: false, RequesttoReplace: false });
 }
 resolvedCaptcha(captchaResponse: string) {
  console.log(`Resolved captcha with response ${captchaResponse}:`);

  if (captchaResponse != null) {
    this.isRecaptaValid = true;
  }
}
}
