import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-charlie-sellers-table',
  templateUrl: './charlie-sellers-table.component.html',
  styleUrls: ['./charlie-sellers-table.component.css']
})
export class CharlieSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;
charlieData: Array<any>;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Charlie').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

this.getCharlieSales();

  } // end of on init


  getCharlieSales() {
    const charlieSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    charlieSalesRef.valueChanges().subscribe(x => {
      const charlieCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].Company === 'Charlie') {
          charlieCadets.push(x[z]);
        }
      }
      this.charlieData = charlieCadets.reverse();
    });
  }

}
