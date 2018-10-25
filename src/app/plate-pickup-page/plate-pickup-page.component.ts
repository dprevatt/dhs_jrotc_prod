import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-plate-pickup-page',
  templateUrl: './plate-pickup-page.component.html',
  styleUrls: ['./plate-pickup-page.component.css']
})
export class PlatePickupPageComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  ngOnInit() {
    this.verifyTotalSalesPickeupCounter();
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
