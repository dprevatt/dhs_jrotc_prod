import { ExactFilterPipe } from './../exact-filter.pipe';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { WriteTreeCompleteChildSource } from '@firebase/database/dist/esm/src/core/view/CompleteChildSource';



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
  startingTicket: any;
  endingTicket: any;
  query: any;

  ngOnInit() {

    this.showTable = true;
    this.allCadetSalesCollection = this.afs.collection('CadetSales', ref => {
      return ref.where('SaleComplete', '==', true)
                .where('PlatePickedUp', '==', false)
                .orderBy('TicketNumber', 'asc');
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

  markOrderReceived(sale) {
  console.log('Marking as received');
  const ticketNumber = sale.TicketNumber;
  console.log(ticketNumber);
  const doc = this.afs.doc('CadetSales/' + ticketNumber);
  doc.set({
    PlatePickedUp: true
  }, {merge: true});
  this.query = '';
  this.dp_incrementPlatePickedUpCounter();
}

  markBulkOrderReceived() {
    console.log('Marking bulk order received.');
    for (let z = this.startingTicket; z <= this.endingTicket; z++ ) {
      const saleDoc = this.afs.doc('CadetSales/' + z.toString());
      saleDoc.set({
        PlatePickedUp: true
      }, {merge: true})
      .then(res => {
        console.log('Marked as picked up!');
        this.dp_incrementPlatePickedUpCounter();
        this.startingTicket = '';
        this.endingTicket = '';
        return res;
      })
      .catch(err => {
        alert('Error occurred while setting order received: ' + err);
        return err;
      });
    }
  }

  dp_incrementPlatePickedUpCounter() {
    this.db.database.ref('counters').child('PlatesPickedUp').transaction(d => {
      if (!d) {
        return d;
      }
      d.count += 1;
      return d;
    });
  }

}
