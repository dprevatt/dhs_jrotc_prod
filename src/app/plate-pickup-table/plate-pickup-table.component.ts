import { tick } from '@angular/core/testing';
import { ExactFilterPipe } from './../exact-filter.pipe';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { WriteTreeCompleteChildSource } from '@firebase/database/dist/esm/src/core/view/CompleteChildSource';
import { isUndefined } from 'util';
declare let ga: Function;
import {Router, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-plate-pickup-table',
  templateUrl: './plate-pickup-table.component.html',
  styleUrls: ['./plate-pickup-table.component.css']
})
export class PlatePickupTableComponent implements OnInit, OnDestroy {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  allCadetSalesCollection: AngularFirestoreCollection<any[]>;
  allCadetSales: Observable<any[]>;
  showTable: boolean;
  startingTicket: any;
  endingTicket: any;
  scanCode: any;
  queryString: any;
  objArr: Array<any>;
  successNotificationMsg: string;
  allCadetSalesCollectionSub: Subscription;

  ngOnInit() {
    this.showTable = true;
    this.allCadetSalesCollection = this.afs.collection('CadetSales', ref => {
      return ref.where('SaleComplete', '==', true)
                .where('PlatePickedUp', '==', false)
                .orderBy('TicketNumber', 'asc');
    });

    this.allCadetSales = this.allCadetSalesCollection.valueChanges();

    this.allCadetSalesCollectionSub = this.allCadetSalesCollection.valueChanges().subscribe(xv => {
      this.objArr = xv;
    });


    jQuery('.message .close')
    .on('click', function() {
    jQuery(this)
      .closest('.message')
      .transition('fade');
    });

  } // End of On Init

  ngOnDestroy() {
    this.allCadetSalesCollectionSub.unsubscribe();
  }

  hideTable() {
    this.showTable = false;
  }

  markOrderReceived(sale) {
  console.log('Marking as received');
  const ticketNumber = sale.TicketNumber;
  this.setPlatePickedUp(ticketNumber);
  this.scanCode = '';
  this.queryString = '';
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
    let incCount = (this.endingTicket - this.startingTicket) + 1;
    if (this.endingTicket <= this.startingTicket) {
      alert('Invalid ticket range');
    }
    else
    {
      for (let z = this.startingTicket; z <= this.endingTicket; z++ ) {
        // if (this.isValidBulkEntry(this.objArr, z)) {
        //   this.bulkPlatePickedUp(z);
        // } else {
        //   const err = 'TicketNumber ' + z.toString() + ' can not be marked as picked up.';
        //   console.log(err);
        // }
        this.scanTicket(z.toString());

      } // End of loop
    } // End Of Else
    this.startingTicket = '';
    this.endingTicket = '';
} // End of Func

  dp_incrementPlatePickedUpCounter() {
    console.log('Incremented!');
    this.db.database.ref('counters').child('PlatesPickedUp').transaction(d => {
      if (!d) {
        return d;
      }
      d.count += 1;
      return d;
    });
  }

  dp_decrementPlatePickedUpCounter() {
    this.db.database.ref('counters').child('PlatesPickedUp').transaction(d => {
      if (!d) {
        return d;
      }
      d.count -= 1;
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

  isValidBulkEntry(items, entry) {
    let isValid = false;
      for (let i = 0; i <= items.length; i++) {
        console.log('Entry is ' + entry);
         if (items[i].TicketNumber === entry) {
              isValid = true;
              break;
          } else {
            isValid = false;
          }
    }
    return isValid;

  }

  setPlatePickedUp(ticketNumber) {
    const doc = this.afs.doc('CadetSales/' + ticketNumber.toString());
    doc.set(
      {
        PlatePickedUp: true,
        PlatePickedUpDate: new Date().toISOString()
      }, {merge: true});
  }

  bulkPlatePickedUp(ticketNumber) {
        // Set Sale as picked up
        this.setPlatePickedUp(ticketNumber);
        // Increment the counter
        this.dp_incrementPlatePickedUpCounter();
  }



  scanTicket(ticketNum) {
    const docRef = this.afs.collection<any>('CadetSales').doc<any>(ticketNum.toString());
    docRef.valueChanges().take(1).subscribe(d => {
      console.log(d);
      if (!d) {
        alert('Invalid Ticket Number');
      }
      if (d.PlatePickedUp === true) {
        alert('Ticket number ' + d.TicketNumber + ' has already been picked up.');
      }
      if (d.SaleComplete === false) {
        alert('Ticket number ' + d.TicketNumber + ' has not been marked as sold.');
      }
      if ( (d.PlatePickedUp === false) && (d.SaleComplete === true) ) {
        console.log('Valid entry');
        this.setPlatePickedUp(d.TicketNumber.toString());

        // tslint:disable-next-line:max-line-length
        const notificationMsg = 'TicketNumber: ' + d.TicketNumber + ' picked up successfully by ' + d.BuyerLastName + ', ' + d.BuyerFirstName + ' !';
        this.showCompletionNotification(notificationMsg);

        this.dp_incrementPlatePickedUpCounter();
      }
    });
    this.scanCode = '';
    jQuery('#sacnner').focus();
  }

  showCompletionNotification(notification) {
    this.successNotificationMsg = null;
    this.successNotificationMsg = notification;
    console.log('Showing Modal');
    jQuery('#successModal').modal('show', function () {
      console.log('Showing success modal');
    }, setTimeout(function() {
      jQuery('#successModal').modal('hide');
    }, 2000));
  }



}
