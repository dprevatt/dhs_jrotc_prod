
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-pickup-counter-display',
  templateUrl: './pickup-counter-display.component.html',
  styleUrls: ['./pickup-counter-display.component.css']
})
export class PickupCounterDisplayComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  totalPickedUpCount: Observable<any>;
  totalSalesCount: Observable<any>;

  ngOnInit() {
    this.verifyTotalSalesPickeupCounter();
    this.getPlatesToBePickedUp();
    this.getTotalSalesCount();
  }

  getPlatesToBePickedUp() {
    const totalPickedUpCounterRef = '/counters/PlatesPickedUp/count';
    this.totalPickedUpCount = this.db.object<any>(totalPickedUpCounterRef).valueChanges();
    return this.totalPickedUpCount;
  }

  getTotalSalesCount() {
    const totalSalesCounterRef = '/counters/totalSales/count';
    this.totalSalesCount = this.db.object<any>(totalSalesCounterRef).valueChanges();
    return this.totalSalesCount;
  }


  verifyTotalSalesPickeupCounter() {
    const cadetSalesCol = this.afs.collection('CadetSales', refv => {
      return refv.where('PlatePickedUp', '==', true);
    });
    cadetSalesCol.valueChanges().take(1).subscribe(b => {
      // Set The counter
      this.VerifyTotalSalesPickupCounter(b.length);
    });
  }

  VerifyTotalSalesPickupCounter(count) {
    const counterRef = this.db.database.ref('counters').child('totalSales');
    counterRef.transaction(dv => {
      if (!dv) {
        return dv;
      }
      console.log('Setting total sales counter to ' + count);
      dv.count = count;
      return dv;
    });
  }

}
