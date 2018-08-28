import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-bravo-sellers-table',
  templateUrl: './bravo-sellers-table.component.html',
  styleUrls: ['./bravo-sellers-table.component.css']
})
export class BravoSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;
bravoData: Array<any>;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Bravo').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

this.getBravoSales();

  } //  End of On Init



  getBravoSales() {
    const bravoSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    bravoSalesRef.valueChanges().subscribe(x => {
      const bravoCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].Company === 'Bravo') {
          bravoCadets.push(x[z]);
        }
      }
      this.bravoData = bravoCadets.reverse();
    });
  }

}
