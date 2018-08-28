import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-echo-sellers-table',
  templateUrl: './echo-sellers-table.component.html',
  styleUrls: ['./echo-sellers-table.component.css']
})
export class EchoSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;
echoData: Array<any>;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Echo').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

this.getEchoSales();

  } // end of on Init


  getEchoSales() {
    const echoSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    echoSalesRef.valueChanges().subscribe(x => {
      const echoCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].Company === 'Echo') {
          echoCadets.push(x[z]);
        }
      }
      this.echoData = echoCadets.reverse();
    });
  }

}
