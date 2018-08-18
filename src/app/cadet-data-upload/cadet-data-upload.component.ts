import { CadetSalesQuickLinkComponent } from './../cadet-sales-quick-link/cadet-sales-quick-link.component';
import { CadetService } from './../services/cadet.service';
import { async } from '@angular/core/testing';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { first } from 'rxjs/operators';
import { ContactInformation } from '../models/ContactInformation';
import { Buyer } from '../models/Buyer';
import { Cadets } from '../models/Cadets';
import { Router, ActivatedRoute } from '@angular/router';
import { forEach } from '@firebase/util';

@Component({
  selector: 'app-cadet-data-upload',
  templateUrl: './cadet-data-upload.component.html',
  styleUrls: ['./cadet-data-upload.component.css']
})
export class CadetDataUploadComponent implements OnInit, OnDestroy {

  cadetUploadFile: any;
  cadetName: String;
  loggedInUser: string;
  userLoggedIn: boolean;
  totalAssignedCount: number;
  myCounter: number;

  // tslint:disable-next-line:max-line-length
  constructor(private afs: AngularFirestore, private cadetService: CadetService, private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  ngOnInit() {
    const isLoggedIn = this.firebaseAuth.authState.pipe(first()).subscribe(x => {
      this.loggedInUser = x.email;
      this.setUser(x.email);
      return x;
    });


this.myCounter = 0;

  } // end of onInit

  ngOnDestroy() {
    console.log('Destoy!');
    }


  setUser(user){
    if (user) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }


  createTables() {
    const obj = {
      count: 0
    };
    this.afs.collection('Rpt_CadetSalesByStatus').doc('Completed').set(obj);
    this.afs.collection('Rpt_CadetSalesByStatus').doc('Incomplete').set(obj);

    const companies = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Bn Staff', 'SGM', 'Other'];
    for (let z = 0; z < companies.length; z++) {
      const compdata = {
        Company: companies[z],
        count: 0,
        AvgSoldPerCadet: 0.0,
        CadetCount: 0
      };
      this.afs.collection('Rpt_CadetSalesByCompany').doc(companies[z]).set(compdata);
    }
    this.afs.collection('Rpt_SalesGoal').doc('CurrentGoal').set({goal: 0});
  }


  public fileChanged (e) {
    this.createTables();
    const cadetList = [];
    const cadetSalesList = [];
    this.cadetUploadFile = e.target.files[0];
    console.log(e.target.files[0]);
    // Code for reading CSV and uploading
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const fileContents = fileReader.result;
      const lines = fileContents.split('\r\n');
      let uploadedCadetCount = 0;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].split(',')[0] !== 'CadetFirstName') {
          uploadedCadetCount++;
          const col1 = lines[i].split(',')[0];
          const col2 = lines[i].split(',')[1];
          const col3 = lines[i].split(',')[2];
          const col4 = lines[i].split(',')[3];
          const col5 = lines[i].split(',')[4];
           // console.log('Cadet: ' + col2 + ', ' + col1 + ' Company: ' + col3);
          // Actually post the data
          const cadetIdentifier = uuid();
          const cadetData = {
            CadetId: cadetIdentifier,
            Cadet: col2 + ', ' + col1,
            Company: col3,
            CreatedDate: new Date(),
            CreatedBy: 'System',
            ModifiedDate: '',
            ModifiedBy: ''
          };

          const cadetSalesData = {
            BuyerFirstName: '',
            BuyerLastName: '',
            BuyerPhone: '',
            SaleComplete: false,
            SaleCompletedDate: '',
            Seller: col2 + ', ' + col1,
            SellerCompany: col3,
            SellerId: cadetIdentifier,
            TicketNumberStart: col4,
            TicketNumberEnd: col5
          };

          cadetList.push(cadetData);
          cadetSalesList.push(cadetSalesData);
          
          //this.afs.collection('Cadets').doc(col2 + ', ' + col1).set(postData, {merge: true});

        } // End of if headerRow
      } // End of csv loop
      

    this.importData('Cadets', cadetList);
    this.importData('CadetSales', cadetSalesList);

    };
    fileReader.readAsText(this.cadetUploadFile);

}


importData(type, arr) {
  const cadetBatch = this.afs.firestore.batch();
  const compBatch = this.afs.firestore.batch();
  const Rpt_CadetSalesByCadet_Batch = this.afs.firestore.batch();
  if (type === 'Cadets'){
    for (let c = 0; c < arr.length; c++){
      // console.log(arr[c].Cadet);
      const cadetDocRef = this.afs.doc('Cadets/' + arr[c].Cadet.toString());
      cadetBatch.set(cadetDocRef.ref, arr[c], {merge: true});

      // this.afs.collection('Cadets').doc(arr[c].Cadet.toString()).set(arr[c], {merge: true});
      // const cCounter = 0;
      // const cName = arr[c].Cadet.toString();
      const cadetCounter = {
        Name: arr[c].Cadet.toString(),
        Company: arr[c].Company.toString(),
        count: 0
      };
      // this.afs.collection('Rpt_CadetSalesByCadet').doc(arr[c].Cadet.toString()).set(cadetCounter, {merge: true});
      const rptDocRef = this.db.object('Rpt_CadetSalesByCadet/' + arr[c].Cadet.toString()).set({
        Name: arr[c].Cadet.toString(),
        Company: arr[c].Company.toString(),
        count: 0
      });
      // Rpt_CadetSalesByCadet_Batch.set(rptDocRef, cadetCounter, {merge: true});

    }
    compBatch.commit()
    Rpt_CadetSalesByCadet_Batch.commit()
    .then(res => console.log('ReportBatch submitted successfully'),  err => alert(err));

    cadetBatch.commit()


    .then(res => console.log('CadetsBatch submitted successfully'),  err => alert(err));

  }
  else{
    console.log('In Cadet Sales');
    for (let cs = 0; cs < arr.length; cs++) {
      // console.log(arr[cs].TicketNumberStart);
      for (let t = arr[cs].TicketNumberStart; t <= arr[cs].TicketNumberEnd; t++ ) {
        const cadetSalesBatch = this.afs.firestore.batch();
        const cadetSalesData = {
          BuyerFirstName: '',
          BuyerLastName: '',
          BuyerPhone: '',
          SaleComplete: false,
          SaleCompletedDate: '',
          Seller: arr[cs].Seller,
          SellerCompany: arr[cs].SellerCompany,
          SellerId: arr[cs].SellerId,
          TicketNumber: parseInt(t.toString(), null)
        };
        // this.afs.collection('CadetSales').doc(t.toString()).set(cadetSalesData, {merge: true});
        const cadetSalesDocRef = this.afs.doc('CadetSales/' + t.toString());
        cadetSalesBatch.set(cadetSalesDocRef.ref, cadetSalesData, {merge: true});
        // Commit the batch
        cadetSalesBatch.commit()
        .then(res => console.log('batch submitted successfully for ' + arr[cs].Seller),  err => alert(err));
      }
    }
    // this.setIncompleteCount();
    
  }
  

} // end of import-data function








updateCadetCounts(company, count) {
  console.log('Company: ' + company);
  console.log('Count: ' + count);
  const docRef = this.afs.collection('Rpt_CadetSalesByCompany').doc(company);
  this.afs.firestore.runTransaction(t => {
    // returning the transaction function
    return t.get(docRef.ref)
        .then(doc => {
          console.log(doc.data());
            // read the current "value" field of the document
            t.update(docRef.ref, {
              CadetCount: count
            });
        });
    }).then(res => {
      console.log('CompanyCadet Counter Updated');
    }, err => alert('An error occurred updating CompanyCadet Counter ' + err));
}

setIncompleteCount() {

  const myDoc = this.afs.doc<any>('/Rpt_CadetSalesByStatus/Incomplete');
  myDoc.update({count: this.myCounter});
  console.log(this.myCounter);
  console.log('Counters Updated');
  alert('Upload Complete');
}


wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

// Create_RptCadetSales() {
//   const dbRef = this.db.object<any>('Rpt_CadetSales').set({
//     test: {
//       Company: 'twst1',
//       Name: 'test2',
//       count: 0
//     }
//   });
// }

}
