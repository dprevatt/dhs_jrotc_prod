import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-delta-sellers-table',
  templateUrl: './delta-sellers-table.component.html',
  styleUrls: ['./delta-sellers-table.component.css']
})
export class DeltaSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Delta').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

  } 
}
