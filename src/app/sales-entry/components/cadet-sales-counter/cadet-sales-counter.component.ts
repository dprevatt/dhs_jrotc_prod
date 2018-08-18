

import { Subscription } from 'rxjs/Subscription';
import { TotalCount } from './../../../models/TotalCount';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-cadet-sales-counter',
  templateUrl: './cadet-sales-counter.component.html',
  styleUrls: ['./cadet-sales-counter.component.css']
})
export class CadetSalesCounterComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  totalSalesDoc: AngularFirestoreDocument<TotalCount>;
  assignedTicketDoc: AngularFirestoreDocument<TotalCount>;
  totalSales: number;
  totalAssignedTickets: number;


  ngOnInit() {
    this.totalSalesDoc = this.afs.doc<TotalCount>('Rpt_CadetSalesByStatus/Completed');
    const d = this.totalSalesDoc.valueChanges().subscribe(x => {
      this.totalSales = x.count;
    });


  this.assignedTicketDoc = this.afs.doc('Rpt_CadetSalesByStatus/Incomplete');
  const x = this.assignedTicketDoc.valueChanges().subscribe(tx => {
      this.totalAssignedTickets = tx.count;
  });




} // End on OnInit

}
