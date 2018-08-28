import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-alpha-sellers-table',
  templateUrl: './alpha-sellers-table.component.html',
  styleUrls: ['./alpha-sellers-table.component.css']
})
export class AlphaSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;
alphaData: Array<any>;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Alpha').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

 this.getAlphaSales();

  } // End of On Init


  getAlphaSales() {
    const alphaSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    alphaSalesRef.valueChanges().subscribe(x => {
      const alphaCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].Company === 'Alpha') {
          alphaCadets.push(x[z]);
        }
      }
      this.alphaData = alphaCadets.reverse();
    });
  }

} // End of component class
