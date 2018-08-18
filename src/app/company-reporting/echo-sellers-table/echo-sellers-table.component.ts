import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-echo-sellers-table',
  templateUrl: './echo-sellers-table.component.html',
  styleUrls: ['./echo-sellers-table.component.css']
})
export class EchoSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Echo').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

  } 

}
