import { CompanyStats } from './../../models/CompanyStats';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-foxtrot-average',
  templateUrl: './foxtrot.component.html',
  styleUrls: ['./foxtrot.component.css']
})
export class FoxtrotComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  foxtrotSalesDoc: AngularFirestoreDocument<CompanyStats>;
  foxtrotSales: number;
  foxtrotCadets: AngularFirestoreCollection<any>;
  foxtrotCadetCount: number;

  ngOnInit() {

    this.foxtrotSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Foxtrot');
    const foxtrotSalesSub = this.foxtrotSalesDoc.valueChanges().subscribe(b => {
      this.foxtrotSales = b.count;
    });

    this.foxtrotCadets = this.afs.collection<any>('Cadets', ref => {
      return ref.where('Company', '==', 'Foxtrot');
    });
    const foxtrotCadetCountSub = this.foxtrotCadets.valueChanges().subscribe(br => {
      this.foxtrotCadetCount = br.length;
      console.log('Foxtrot Cadet Count ' + br.length);
    });

  }

}
