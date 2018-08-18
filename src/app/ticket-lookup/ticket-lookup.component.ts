import { CadetSales } from './../models/CadetSales';
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
import { async, tick } from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
import { removeSummaryDuplicates } from '@angular/compiler';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-ticket-lookup',
  templateUrl: './ticket-lookup.component.html',
  styleUrls: ['./ticket-lookup.component.css']
})
export class TicketLookupComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  cadetSalesCollection: AngularFirestoreCollection<any>;
  cadets: Subscription;
  ticketSearch: string;
  salesCollection: AngularFirestoreCollection<any>;
  sale: Subscription;
  seller: string;
  salesDoc: Subscription;
  ticketNumber: number;

  ngOnInit() {
    this.cadetSalesCollection = this.afs.collection('CadetSales');

  }

  findTicket(){
    // jQuery('#ticketSearch').addClass('loading');
    // const ticketNum = this.ticketNumber;
    // this.cadetSalesCollection = this.afs.collection('CadetSales', ref => {
    //   return ref.where('TicketNumber', '==', ticketNum).limit(1);
    // });
    // this.seller = this.cadetSalesCollection.valueChanges().subscribe(s => {
    //   return s.Seller;
    // });
    // // Do something with Seller data
    // // ...
    // // stop spinner
    // jQuery('#ticketSearch').removeClass('loading');
  }




}
