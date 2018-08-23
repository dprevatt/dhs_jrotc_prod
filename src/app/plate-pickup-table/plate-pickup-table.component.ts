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

// bulkOrderReceived() {
//   if (this.endingTicket <= this.startingTicket {
//     alert('Invalid ticket range');
//   }
//   else
//   {
//     for (let z = this.startingTicket; z <= this.endingTicket; z++ ) {

//     }
//   }
// }

  markBulkOrderReceived() {
    console.log('Marking bulk order received.');
    const incCount = (this.endingTicket - this.startingTicket) + 1;
    if (this.endingTicket <= this.startingTicket {
      alert('Invalid ticket range');
    }
    else
    {
      for (let z = this.startingTicket; z <= this.endingTicket; z++ ) {
        const saleDoc = this.afs.doc('CadetSales/' + z.toString());
        const docPath = 'CadetSales/' + z.toString();
        this.afs.doc<any>(docPath).valueChanges().take(1).subscribe(x => {
          if (x.SaleComplete === true) {
            // alert('Hit');
            saleDoc.set({
              PlatePickedUp: true
            }, {merge: true})
            .then(res => {
              // alert('Hit Then');
              console.log('Marked as picked up!');
              localStorage.setItem('ValidPickUp', 'true');
              this.startingTicket = '';
              this.endingTicket = '';
              return res;
            })
            .catch(err => {
              alert('Error occurred while setting order received: ' + err);
              return err;
            });
          } else {
            alert('TicketNumber ' + z.toString() + ' has not been completed. \r\n Please submit the ticket prior to pickup.');
          }
          });
          if (localStorage.getItem('ValidPickUp') === 'true') {
            this.dp_bulk_incrementPlatePickedUpCounter(incCount);
            localStorage.setItem('ValidPickUp', null);
          }
    } // End of loop
    } // End Of Else
} // End of Func

  dp_incrementPlatePickedUpCounter() {
    this.db.database.ref('counters').child('PlatesPickedUp').transaction(d => {
      if (!d) {
        return d;
      }
      d.count += 1;
      return d;
    });
  }

  dp_bulk_incrementPlatePickedUpCounter(num) {
    this.db.database.ref('counters').child('PlatesPickedUp').transaction(d => {
      if (!d) {
        return d;
      }
      d.count += num;
      return d;
    });
  }

}
