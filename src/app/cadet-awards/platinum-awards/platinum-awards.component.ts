import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-platinum-awards',
  templateUrl: './platinum-awards.component.html',
  styleUrls: ['./platinum-awards.component.css']
})
export class PlatinumAwardsComponent implements OnInit, OnDestroy {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  platinumSales: Array<any>;
  platinumAward: string;
  awardsPlatinumSubscription: Subscription;

  ngOnInit() {
    this.getGoldSales();
    this.getAwards();
  }

  ngOnDestroy() {
    this.awardsPlatinumSubscription.unsubscribe();
  }

  getGoldSales() {
    const cadetSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    cadetSalesRef.valueChanges().subscribe(x => {
      const platinumCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].count >= 50) {
          platinumCadets.push(x[z]);
        }
      }
      console.log(platinumCadets);
      this.platinumSales = platinumCadets.reverse();
    });
  }

  getAwards() {
    this.awardsPlatinumSubscription = this.afs.doc<any>('/Rpt_SalesAward/Awards').valueChanges().subscribe(aw => {
      this.platinumAward = aw.PlatinumAward;
    });

}

}
