import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-delta-sellers-table',
  templateUrl: './delta-sellers-table.component.html',
  styleUrls: ['./delta-sellers-table.component.css']
})
export class DeltaSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;
deltaData: Array<any>;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Delta').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

this.getDeltaSales();
  } // end of on init


  getDeltaSales() {
    const deltaSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    deltaSalesRef.valueChanges().subscribe(x => {
      const deltaCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].Company === 'Delta') {
          deltaCadets.push(x[z]);
        }
      }
      this.deltaData = deltaCadets.reverse();
    });
  }


}
