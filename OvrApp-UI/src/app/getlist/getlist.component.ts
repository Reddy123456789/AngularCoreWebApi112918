import { IEligibility } from './../model/eligibility';
import { ActivatedRoute, Router } from '@angular/router';
import { EligibilityService } from './../services/eligibility.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-getlist',
  templateUrl: './getlist.component.html',
  styleUrls: ['./getlist.component.css']
})
export class GetlistComponent implements OnInit {

  passid: any;
  customers: any;
  getcustomer: any;
  modalTitle: string;
  modalBtnTitle: string;
  eligibility: IEligibility;

  dataSource = new MatTableDataSource<IEligibility>();

  constructor(private service: EligibilityService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   // this.getEligibilitys();
    this.getEligibility();
  }

  getEligibilitys() {

    this.service.getAllEligibility('http://localhost:13516/api/customer/getAllCustomers').subscribe( response => {
      this.customers = response;
       console.log(this.customers);
      // this.savecustomerform.reset();
      }, error => {
        console.log(error);
      }
    );
     }

     getEligibility() {
       this.service.getOneEligibility(54).subscribe( response => {
      // this.service.getOneEligibility(this.passid).subscribe( response => {
      //  this.service.getOneEligibility(this.route.snapshot.params['id']).subscribe( response => {
        this.getcustomer = response;
        console.log(this.getcustomer);
     // this.savecustomerform.reset();
     }, error => {
       console.log(error);
     }
   );
   }

   editContact(id: number) {
     console.log(id);

    const contactData = this.service.sharedEligibility;
    console.log(contactData);
    this.service.sharedReview = contactData;

    this.modalTitle = 'Edit Contact';
    this.modalBtnTitle = 'Update';
    this.router.navigateByUrl('/eligibilityreactive');
  }
  deleteContact(id: number) {
    // this.dbops = DBOperation.delete;
    // this.modalTitle = 'Confirm to Delete ?';
    // this.modalBtnTitle = 'Delete';
    // this.contact = this.dataSource.data.filter(x => x.id === id)[0];
    // this.openDialog();
  }

}
