import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-charlie-sellers-table',
  templateUrl: './charlie-sellers-table.component.html',
  styleUrls: ['./charlie-sellers-table.component.css']
})
export class CharlieSellersTableComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

cadetQuery: AngularFirestoreCollection<any>;
cadets: any;

  ngOnInit() {
    this.cadetQuery = this.afs.collection('Rpt_CadetSalesByCadet', ref => {
      return ref.where('Company', '==', 'Charlie').orderBy('count', 'desc');
    });

 this.cadets = this.cadetQuery.valueChanges();

  } 

}
