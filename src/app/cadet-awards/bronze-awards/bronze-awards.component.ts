import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-bronze-awards',
  templateUrl: './bronze-awards.component.html',
  styleUrls: ['./bronze-awards.component.css']
})
export class BronzeAwardsComponent implements OnInit, OnDestroy {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  bronzeSales: Array<any>;
  bronzeAward: string;
  awardsBronzeSubscription: Subscription;

  ngOnInit() {
    this.getBronzeSales();
    this.getAwards();
    console.log(this.bronzeAward);
  }

  ngOnDestroy() {
    this.awardsBronzeSubscription.unsubscribe();
  }

  getBronzeSales() {
    const cadetSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    cadetSalesRef.valueChanges().subscribe(x => {
      const bronzeCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (parseInt(x[z].count, null) >= 5) {
          bronzeCadets.push(x[z]);
        }
      }
      console.log(bronzeCadets);
      this.bronzeSales = bronzeCadets.reverse();
    });
  }

  getAwards() {
    this.awardsBronzeSubscription = this.afs.doc<any>('/Rpt_SalesAward/Awards').valueChanges().subscribe(aw => {
      this.bronzeAward = aw.BronzeAward;
    });

}

}
