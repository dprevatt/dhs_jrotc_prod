import { CompanyStats } from './../../models/CompanyStats';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-alpha-average',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css']
})
export class AlphaComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  alphaSalesDoc: AngularFirestoreDocument<CompanyStats>;
  alphaSales: number;
  alphaCadets: AngularFirestoreCollection<any>;
  alphaCadetCount: number;
  

  ngOnInit() {

    this.alphaSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Alpha');
    const alphaSalesSub = this.alphaSalesDoc.valueChanges().subscribe(b => {
      this.alphaSales = b.count;
    });

    this.alphaCadets = this.afs.collection<any>('Cadets', ref => {
      return ref.where('Company', '==', 'Alpha');
    });
    const alphaCadetCountSub = this.alphaCadets.valueChanges().subscribe(br => {
      this.alphaCadetCount = br.length;
      console.log('Alpha Cadet Count ' + br.length);
    });

  }

}
