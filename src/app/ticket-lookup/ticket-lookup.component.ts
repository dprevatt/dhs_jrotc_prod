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

  cadetCollection: AngularFirestoreCollection<Cadets>;
  cadets: Subscription;
  ticketSearch: string;
  salesCollection: AngularFirestoreCollection<Sale>;
  sale: Subscription;
  seller: string;
  salesDoc: Subscription;
  found: Boolean;
  notFound: Boolean;

  ngOnInit() {
    this.cadetCollection = this.afs.collection('Cadets');

  }

  findTicket(ticketNum){
    this.cadetCollection = this.afs.collection('Cadets');
    let x = 0;
    this.cadets = this.cadetCollection.valueChanges().subscribe(allCadets => {
        // console.log(allCadets);
        for (x = 0; x < allCadets.length; x++) {
          const docPath = 'Cadets/' + allCadets[x].Cadet.toString() + '/Sales/' + ticketNum;
          this.salesDoc = this.afs.doc(docPath).snapshotChanges().subscribe(mdoc => {
            if (mdoc.payload.data()) {
              console.log(mdoc.payload.data());
              console.log(docPath.split('/')[1]);
              this.seller = docPath.split('/')[1];
              this.found = true;
            }
          });
        }
        if (x === allCadets.length) {
          {
            if(this.found !== true)
            {
              this.notFound = true;
            }
          }
        }
    });
    return this.found;
  }




}
