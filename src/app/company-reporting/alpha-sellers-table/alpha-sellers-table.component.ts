import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-alpha-sellers-table',
  templateUrl: './alpha-sellers-table.component.html',
  styleUrls: ['./alpha-sellers-table.component.css']
})
export class AlphaSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Alpha').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

  } // End of On Init

  


} // End of component class
