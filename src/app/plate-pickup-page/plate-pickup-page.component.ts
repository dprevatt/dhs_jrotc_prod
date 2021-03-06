import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-plate-pickup-page',
  templateUrl: './plate-pickup-page.component.html',
  styleUrls: ['./plate-pickup-page.component.css']
})
export class PlatePickupPageComponent implements OnInit, OnDestroy {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  cadetSalesColSub: Subscription;

  ngOnInit() {
    this.verifyTotalSalesPickeupCounter();

      // Setting Total Picked Up Counter
      const pickedUpArray = [];
      this.afs.collection('CadetSales').ref.get().then((data) => {
        console.log(data.size);
        data.forEach(sale => {
           if (sale.data().PlatePickedUp === true) {
            pickedUpArray.push(sale);
           }
        });
        this.setTotalPickedUpCounter(pickedUpArray.length);
      }).catch(function (error) {
        alert('An error occurred getting plate picked up count: ' + error);
      });

  }

  ngOnDestroy() {
    this.cadetSalesColSub.unsubscribe();
  }

  verifyTotalSalesPickeupCounter() {
    const cadetSalesCol = this.afs.collection('CadetSales', refv => {
      return refv.where('PlatePickedUp', '==', true);
    });
    this.cadetSalesColSub = cadetSalesCol.valueChanges().take(1).subscribe(b => {
      // Set The counter
      this.VerifyTotalSalesPickupCounter(b.length);
    });
  }

  VerifyTotalSalesPickupCounter(count) {
    const counterRef = this.db.database.ref('counters').child('PlatesPickedUp');
    counterRef.transaction(dv => {
      if (!dv) {
        return dv;
      }
      console.log('Setting PlatesPickedUp counter to ' + count);
      dv.count = count;
      return dv;
    });
  }


  setTotalPickedUpCounter(cnt) {
    // Reseting Counter
    const counterRef = this.db.database.ref('counters').child('PlatesPickedUp');
    counterRef.transaction(dv => {
      if (!dv) {
        return dv;
      }
      console.log('Setting platesPickedUp  counter to ' + cnt);
      dv.count = cnt;
      return dv;
    });
  }

}
