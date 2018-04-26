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

@Component({
  selector: 'app-ticket-assignment',
  templateUrl: './ticket-assignment.component.html',
  styleUrls: ['./ticket-assignment.component.css']
})
export class TicketAssignmentComponent implements OnInit {

  cadetCollection: AngularFirestoreCollection<Cadets>;
  cadets: Observable<Cadets[]>;
  ticketStart: string;
  ticketEnd: string;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    jQuery('.ui.normal.dropdown').dropdown();
    this.cadetCollection = this.afs.collection('Cadets');
    this.cadets = this.cadetCollection.valueChanges();
  }

  assignTickets(tStart, tEnd){

    let myCadet = jQuery('#selectedCadet').dropdown('get value');
    if (myCadet != null || '')
    {
      console.log(tStart + ' - ' + tEnd);
      if (tEnd < tStart)
      {
        alert('Invalid ticket range');
      }
      else{
        // Assign Tickets to Cadet
        for (let t = tStart;  t <= tEnd; t++)
        {
          console.log('TicketNumber: ' + t);
        }
        // Clear the form
        this.ticketStart = '';
        this.ticketEnd = '';

      }
    }

  }


}
