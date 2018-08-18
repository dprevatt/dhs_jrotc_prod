import { Component, OnInit } from '@angular/core';
import { CadetService } from './../services/cadet.service';
import { async } from '@angular/core/testing';
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
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-ticket-assignment',
  templateUrl: './ticket-assignment.component.html',
  styleUrls: ['./ticket-assignment.component.css']
})
export class TicketAssignmentComponent implements OnInit {

  cadetCollection: AngularFirestoreCollection<any>;
  cadetIdentity: AngularFirestoreCollection<any>;
  cadets: Observable<any[]>;
  ticketStart: any;
  ticketEnd: string;
  selectedCadetId: string;
  selectedCadet: string;
  selectedCadetIdentity: string;
  cadetId: Subscription;
  selectedCadetCompany: string;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    jQuery('#dp').dropdown({
      onChange: function (val, text, choice) {
        this.selectedCadetId = val.split('|')[0];
        this.selectedCadet = val.split('|')[1];
      },
      onClick: function(val){
        this.selectedCadetId = val.split('|')[0];
        this.selectedCadet = val.split('|')[1];
        console.log(this.selectedCadet);
      }
    });
    // Get the Cadets Collection
    this.cadetCollection = this.afs.collection('Cadets');
    this.cadets = this.cadetCollection.valueChanges();
  }

  assignTickets(){
    const selection = jQuery('#dp').dropdown('get value');
    this.selectedCadet = selection.split('|')[1];
    this.selectedCadetId = selection.split('|')[0];
    const myCadet = this.selectedCadet;
    if (myCadet == null || ''){
        alert('You must choose a cadet to assign tickets.');
    }
    else if (myCadet != null || '')
    {
      console.log(this.ticketStart + ' - ' + this.ticketEnd);
      if (this.ticketEnd)
      {
      if (this.ticketEnd < this.ticketStart) {
        alert('Invalid ticket range');
      } else {
        // Assign Tickets to Cadet
        for (let t = this.ticketStart; t <= this.ticketEnd; t++ ){
          console.log(this.selectedCadetId);
          const cadetSalesData = {
            BuyerFirstName: '',
            BuyerLastName: '',
            BuyerPhone: '',
            SaleComplete: false,
            SaleCompletedDate: '',
            Seller: myCadet,
            SellerCompany: this.selectedCadetCompany,
            SellerId: this.selectedCadetId,
            TicketNumber: t
          };
          this.afs.collection('CadetSales').doc(t.toString()).set(cadetSalesData, {merge: true});
        }
        // Clear the form
        this.ticketStart = '';
        this.ticketEnd = '';
        // jQuery('#dp').dropdown('clear');
        // jQuery('#dp').dropdown('destroy');
        jQuery('#dp').dropdown('restore defaults');
        alert('Tickets Assigned Successfully');
      }
    }
    else {
      // assign single ticket
      const cadetSalesData = {
        BuyerFirstName: '',
        BuyerLastName: '',
        BuyerPhone: '',
        SaleComplete: false,
        SaleCompletedDate: '',
        Seller: myCadet,
        SellerCompany: this.selectedCadetCompany,
        SellerId: this.selectedCadetId,
        TicketNumber: this.ticketStart
      };
      this.afs.collection('CadetSales').doc(this.ticketStart.toString()).set(cadetSalesData, {merge: true});

      // Clear the form
      this.ticketStart = '';
      this.ticketEnd = '';
      // jQuery('#dp').dropdown('clear');
      // jQuery('#dp').dropdown('destroy');
      jQuery('#dp').dropdown('restore defaults');
      alert('Ticket Assigned Successfully');
    }
    
    }
    
    
  }


  setCadet(){
    const x = jQuery('#dp').dropdown('get value');
    this.selectedCadet = x.split('|')[1];
    this.selectedCadetId = x.split('|')[0];
    this.selectedCadetCompany = x.split('|')[2];
    console.log(this.selectedCadetCompany);

  }

  setCadetClick(cadet, cadetId, cadetCompany){
    this.selectedCadet = cadet;
    this.selectedCadetId = cadetId;
    this.selectedCadetCompany = cadetCompany;
    console.log(this.selectedCadetCompany);
  }


}
