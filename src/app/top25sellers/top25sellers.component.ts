import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from '../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'app-top25sellers',
  templateUrl: './top25sellers.component.html',
  styleUrls: ['./top25sellers.component.css']
})
export class Top25sellersComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

topTwentyFiveSellers: Observable<any>[];
Rpt_CadetSales: Array<any>;

  ngOnInit() {
    // const query = this.afs.collection<any>('Rpt_CadetSalesByCadet', ref => {
    //   return ref.orderBy('count', 'desc').limit(25);
    // });
  
    // const adata = query.valueChanges().subscribe(x => {
    //   this.topTwentyFiveSellers = x;
    // });
    // console.log(this.topTwentyFiveSellers);
    this.dp_getRpt_CadetSales();
  }


      // Get Rpt_CadetSales Data
      dp_getRpt_CadetSales () {
        const rpt_CadetSalesRef = this.db.list<any>('Rpt_CadetSalesByCadet', ref => {
          return ref.orderByChild('count').limitToLast(25);
        });
        rpt_CadetSalesRef.valueChanges().subscribe(x => {
          const cadetSalesCounters = [];
          for (let z = 0; z < x.length; z++) {
            cadetSalesCounters.push(x[z]);
            }
          this.Rpt_CadetSales = cadetSalesCounters.reverse();
        });
      }

}
