import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-silver-awards',
  templateUrl: './silver-awards.component.html',
  styleUrls: ['./silver-awards.component.css']
})
export class SilverAwardsComponent implements OnInit, OnDestroy {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  silverSales: Array<any>;
  silverAward: string;
  awardsSilverSubscription: Subscription;

  ngOnInit() {
    this.getSilverSales();
    this.getAwards();
  }

  ngOnDestroy() {
    this.awardsSilverSubscription.unsubscribe();
  }

  getSilverSales() {
    const cadetSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    cadetSalesRef.valueChanges().subscribe(x => {
      const silverCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].count >= 15) {
          silverCadets.push(x[z]);
        }
      }
      console.log(silverCadets);
      this.silverSales = silverCadets.reverse();
    });
  }

  getAwards() {
    this.awardsSilverSubscription = this.afs.doc<any>('/Rpt_SalesAward/Awards').valueChanges().subscribe(aw => {
      this.silverAward = aw.SilverAward;
    });

}

}
