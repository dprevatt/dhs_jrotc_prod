import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-bravo-sellers-table',
  templateUrl: './bravo-sellers-table.component.html',
  styleUrls: ['./bravo-sellers-table.component.css']
})
export class BravoSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Bravo').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

  } 

}
