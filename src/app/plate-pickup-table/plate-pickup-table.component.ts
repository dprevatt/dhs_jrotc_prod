import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Sale } from '../../../models/Sale';


@Component({
  selector: 'app-plate-pickup-table',
  templateUrl: './plate-pickup-table.component.html',
  styleUrls: ['./plate-pickup-table.component.css']
})
export class PlatePickupTableComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  allCadetSalesCollection: AngularFirestoreCollection<any[]>;
  allCadetSales: Observable<any[]>;
  showTable: boolean;

  ngOnInit() {

    this.showTable = true;
    this.allCadetSalesCollection = this.afs.collection('CadetSales', ref => {
      return ref.where('SaleComplete', '==', true).orderBy('TicketNumber', 'asc');
    });

    this.allCadetSales = this.allCadetSalesCollection.valueChanges();

    jQuery('.message .close')
    .on('click', function() {
    jQuery(this)
      .closest('.message')
      .transition('fade');
    });

  }

  hideTable() {
    this.showTable = false;
  }

  markOrderReceived() {
  console.log('Marking as received');
}

}
