import { CompanyStats } from './../../models/CompanyStats';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-delta-average',
  templateUrl: './delta.component.html',
  styleUrls: ['./delta.component.css']
})
export class DeltaComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  deltaSalesDoc: AngularFirestoreDocument<CompanyStats>;
  deltaSales: number;
  deltaCadets: AngularFirestoreCollection<any>;
  deltaCadetCount: number;


  ngOnInit() {

    this.deltaSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Delta');
    const deltaSalesSub = this.deltaSalesDoc.valueChanges().subscribe(b => {
      this.deltaSales = b.count;
    });

    this.deltaCadets = this.afs.collection<any>('Cadets', ref => {
      return ref.where('Company', '==', 'Delta');
    });
    const deltaCadetCountSub = this.deltaCadets.valueChanges().subscribe(br => {
      this.deltaCadetCount = br.length;
      console.log('Delta Cadet Count ' + br.length);
    });

  }

}
