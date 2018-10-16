import { CadetSalesQuickLinkComponent } from './../cadet-sales-quick-link/cadet-sales-quick-link.component';
import { CadetService } from './../services/cadet.service';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ContactInformation } from '../models/ContactInformation';
import { Buyer } from '../models/Buyer';
import { Cadets } from '../models/Cadets';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { first } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-cadet-management',
  templateUrl: './cadet-management.component.html',
  styleUrls: ['./cadet-management.component.css']
})
export class CadetManagementComponent implements OnInit {
  cadetCollection: AngularFirestoreCollection<Cadets>;
  cadets: Observable<Cadets[]>;
  cadetUploadFile: any;
  cadetName: string;
  cadetList: Array<any>;
  query: any;
  cadetCompany: string;
  cadetToEdit: Cadets;
  loggedInUser: string;
  userLoggedIn: boolean;
  add_cadetName: string;


  // tslint:disable-next-line:max-line-length
  constructor(private afs: AngularFirestore, private cadetService: CadetService, private route: ActivatedRoute, private router: Router, private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  ngOnInit() {
    jQuery('#searchCadetsTB').focus();
    this.cadetCollection = this.afs.collection('Cadets');
    this.cadets = this.cadetCollection.valueChanges();
    jQuery('#dp').dropdown();
    jQuery('#company_Drop').dropdown();
    jQuery('#company_Drop_add').dropdown();


    // Get the user information
    const isLoggedIn = this.firebaseAuth.authState.pipe(first()).subscribe(x => {
      this.loggedInUser = x.email;
      this.setUser(x.email);
      return x;
    });

  } // End of onInit


  setUser(user){
    if (user) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }



removeCadet(event, cadet) {
  this.cadetService.removeCadet(cadet.Cadet);
  this.dp_decrementCompanyCadetCount(cadet.Company.toString());
}


editCadet(cadet){
  this.cadetToEdit = cadet;
  this.cadetName = cadet.Cadet;
  this.cadetCompany = cadet.Company;
  jQuery('#editCadetModal').modal('show');

}

updateCadet(){
  const selectedCompany = jQuery('#company_Drop').dropdown('get value');
const CadetObj = {
  Cadet: this.cadetName,
  CadetId: this.cadetToEdit.CadetId,
  Company: selectedCompany,
  ModifiedBy: 'System',
  ModifiedDate: new Date().toISOString()
};
this.afs.collection('Cadets').doc(this.cadetToEdit.Cadet.toString()).set(CadetObj, {merge: true});
}


displayAddCadetModal(){
  jQuery('#addCadetModal').modal('show');
}

addCadet(){
  const newCadetCompany = jQuery('#company_Drop_add').dropdown('get value');
  const cadetData = {
    Cadet: this.add_cadetName,
    CadetId: uuid(),
    Company: newCadetCompany,
    CreatedBy: this.loggedInUser,
    CreatedDate: new Date().toISOString(),
    ModifiedBy: '',
    ModifiedDate: ''
  };
  this.afs.collection('Cadets').doc(this.add_cadetName).set(cadetData, {merge: true})
  .then(res => {
    this.dp_incrementCompanyCadetCount(newCadetCompany.toString());
    console.log('New Cadet Added; Counter Updated.');
    return res;
  })
  .catch(err => {
    alert('An error occurred while adding new cadet: ' + err);
    return err;
  });
}


/*==============================================Counter Functions===========================================================*/

  // Decrement Company Cadet Count
  dp_decrementCompanyCadetCount(company) {
    this.db.database.ref('counters').child('companySales').child(company.toString()).transaction(d => {
      if (!d) {
        return d;
      }
      d.CadetCount -= 1;
      d.AvgSoldPerCadet = parseFloat((d.count / d.CadetCount).toFixed(2));
      return d;
    });
  }

   // Increment Company Cadet Count
   dp_incrementCompanyCadetCount(company) {
    this.db.database.ref('counters').child('companySales').child(company.toString()).transaction(d => {
      if (!d) {
        return d;
      }
      d.CadetCount += 1;
      d.AvgSoldPerCadet = parseFloat((d.count / d.CadetCount).toFixed(2));
      return d;
    });
  }

/*==============================================Counter Functions===========================================================*/

} // Ending Bracket
