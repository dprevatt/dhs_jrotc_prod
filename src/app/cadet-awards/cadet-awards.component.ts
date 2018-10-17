import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cadet-awards',
  templateUrl: './cadet-awards.component.html',
  styleUrls: ['./cadet-awards.component.css']
})
export class CadetAwardsComponent implements OnInit, OnDestroy {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  bronzeSales: Array<any>;
  silverSales: Array<any>;
  goldSales: Array<any>;
  platinumSales: Array<any>;

  bronzeAward: string;
  silverAward: string;
  goldAward: string;
  platinumAward: string;

  awardsSubscription: Subscription;

  ngOnInit() {
    this.getSales();
    this.getAwards();
    console.log(this.bronzeAward);
  }

  ngOnDestroy() {
    this.awardsSubscription.unsubscribe();
  }

  getSales() {
    const cadetSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    cadetSalesRef.valueChanges().subscribe(x => {
      const bronzeCadets = [];
      const silverCadets = [];
      const goldCadets = [];
      const platinumCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (parseInt(x[z].count, null) >= 5) {
          bronzeCadets.push(x[z]);
        }
        if (x[z].count >= 15) {
          silverCadets.push(x[z]);
        }
        if (x[z].count >= 25) {
          goldCadets.push(x[z]);
        }
        if (x[z].count >= 50) {
          platinumCadets.push(x[z]);
        }
      }
      console.log(bronzeCadets);
      this.bronzeSales = bronzeCadets.reverse();
      this.silverSales = silverCadets.reverse();
      this.goldSales = goldCadets.reverse();
      this.platinumSales = platinumCadets.reverse();
    });
  }

  getAwards() {
    this.awardsSubscription = this.afs.doc<any>('/Rpt_SalesAward/Awards').valueChanges().subscribe(aw => {
      console.log(aw);
      this.bronzeAward = aw.BronzeAward;
      this.silverAward = aw.SilverAward;
      this.goldAward = aw.GoldAward;
      this.platinumAward = aw.PlatinumAward;
    });
  }

}
