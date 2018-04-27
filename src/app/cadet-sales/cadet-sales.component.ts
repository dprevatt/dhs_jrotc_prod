import { Sale } from './../models/Sale';
import { Buyer } from './../models/Buyer';
import { Cadets } from './../models/Cadets';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { ContactInformation } from '../models/ContactInformation';
import { async } from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
import { removeSummaryDuplicates } from '@angular/compiler';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cadet-sales',
  templateUrl: './cadet-sales.component.html',
  styleUrls: ['./cadet-sales.component.css']
})
export class CadetSalesComponent implements OnInit, AfterViewInit {
  id: string;
  cadetCollection: AngularFirestoreCollection<Cadets>;
  cadets: Subscription;
  cadet: any;
  sales: any;
  salesCount: Subscription;
  totalSales: Number;
  saleDoc: AngularFirestoreDocument<Sale>;
  salesCollection: AngularFirestoreCollection<Sale[]>;
  buyerFirst: String;
  buyerLast: String;
  buyerPhone: String;
  ticketNumber: string;
  cadetName: String;
  currentCadet: String;
  cadetCompany: String;
  cadetId: String;
  editState: Boolean;
  sub: any;
  bulk_buyerLast: String;
  bulk_buyerFirst: String;
  bulk_ticketNumberStart: any;
  bulk_ticketNumberEnd: any;
  bulk_buyerPhone?: String;
  /*
  */




  constructor(private route: ActivatedRoute, private afs: AngularFirestore) { }


  ngAfterViewInit(){ }
  


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id + 'From sales');

    this.cadetCollection = this.afs.collection('Cadets', ref => {
      return ref.where('CadetId', '==', this.id).limit(1);
    });
    
    this.cadets = this.cadetCollection.valueChanges().subscribe(x => {
      this.cadetName = x[0].Cadet;
      this.cadetCompany = x[0].Company;
      this.cadetId = x[0].CadetId;
      this.cadet = x[0];
      this.setCurrentCadet(x[0]);
      console.log(this.cadet);
      return x as Cadets[];
    });

    // Set focus to form
    jQuery('#buyerLast').focus();

} // end of onInit


setCurrentCadet(x) {
  console.log('From set current cadet');
  console.log(x.Cadet);
  this.currentCadet = x.Cadet;

  const collString = 'Cadets/'+ this.currentCadet +'/Sales';
  console.log(collString);

 this.salesCollection = this.afs.collection(collString, ref => {
   return ref.orderBy('TicketNumber', 'asc');
 });
 this.sales = this.salesCollection.valueChanges();
 
 this.salesCount = this.salesCollection.valueChanges().subscribe(s => {
   console.log('Total Sales: ' + s.length);
   this.totalSales = s.length;
   return s.length;
 });

  }

  addSale(name) {
    console.log(name);
    console.log('Sale Added for ' + this.buyerLast + ', ' + this.buyerFirst);

    const newSale =  {
        // CadetId: this.cadetId,
      // Cadet: this.cadetName,
      // Company: this.cadetCompany,
        Buyer: this.buyerLast + ', ' + this.buyerFirst,
        BuyerPhone: this.buyerPhone !== undefined ? this.buyerPhone : '',
        TicketNumber: this.ticketNumber,
        SaleComplete: true,
        SaleCompletedDate: new Date()
    };
  
      console.log(newSale);



    this.afs.collection('Cadets').doc(name)
    .collection('Sales').doc(newSale.TicketNumber.toString()).set(newSale, {merge: true});

    this.buyerFirst = '';
    this.buyerLast = '';
    this.buyerPhone = '';
    this.ticketNumber = '';
    jQuery('#buyerLast').focus();

    //collection("app").document("users").collection(uid).document("notifications")


}

removeSale(event, sale) {
  console.log('remove sale called');
  const saleToDel = 'Cadets/' + this.currentCadet + '/Sales/' + sale.TicketNumber;
  console.log(saleToDel);
  this.saleDoc = this.afs.doc(saleToDel);
  this.saleDoc.delete();
}

initBulkOrder(){
  jQuery('#bulkOrderModal').modal('show');

}

submitBulkOrder(name){
  console.log('bulk submitted for ' + name);
  if (this.bulk_ticketNumberEnd <= this.bulk_ticketNumberStart){
    alert('Invalid ticket range');
  }
  else{
    for (let t = this.bulk_ticketNumberStart; t <= this.bulk_ticketNumberEnd; t++){
      console.log(this.bulk_ticketNumberStart + ' thru ' + this.bulk_ticketNumberEnd);

      const newBulkSale =  {
        // CadetId: this.cadetId,
      // Cadet: this.cadetName,
      // Company: this.cadetCompany,
        Buyer: this.bulk_buyerLast + ', ' + this.bulk_buyerFirst,
        BuyerPhone: this.bulk_buyerPhone !== undefined ? this.bulk_buyerPhone : '',
        TicketNumber: t,
        SaleComplete: true,
        SaleCompletedDate: new Date()
    };
  
      this.afs.collection('Cadets').doc(name)
      .collection('Sales').doc(t.toString()).set(newBulkSale, {merge: true});

    } // End Of Loop
    // Clear the Modal Form
      this.bulk_buyerLast = '';
      this.bulk_buyerFirst = '';
      this.bulk_buyerPhone = '';
      this.bulk_ticketNumberStart = '';
      this.bulk_ticketNumberEnd = '';
  }
}



}