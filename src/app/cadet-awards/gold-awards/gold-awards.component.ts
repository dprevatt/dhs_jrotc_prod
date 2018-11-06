import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-gold-awards',
  templateUrl: './gold-awards.component.html',
  styleUrls: ['./gold-awards.component.css']
})
export class GoldAwardsComponent implements OnInit, OnDestroy {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  goldSales: Array<any>;
  goldAward: string;
  awardsGoldSubscription: Subscription;

  ngOnInit() {
    this.getGoldSales();
    this.getAwards();
  }

  ngOnDestroy() {
    this.awardsGoldSubscription.unsubscribe();
  }

  getGoldSales() {
    const cadetSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    cadetSalesRef.valueChanges().subscribe(x => {
      const goldCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].count >= 25) {
          goldCadets.push(x[z]);
        }
      }
      console.log(goldCadets);
      this.goldSales = goldCadets.reverse();
    });
  }

  getAwards() {
    this.awardsGoldSubscription = this.afs.doc<any>('/Rpt_SalesAward/Awards').valueChanges().subscribe(aw => {
      this.goldAward = aw.GoldAward;
    });

}

}
