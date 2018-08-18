import { CompanyStats } from './../../models/CompanyStats';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-charlie-average',
  templateUrl: './charlie.component.html',
  styleUrls: ['./charlie.component.css']
})
export class CharlieComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  charlieSalesDoc: AngularFirestoreDocument<CompanyStats>;
  charlieSales: number;
  charlieCadets: AngularFirestoreCollection<any>;
  charlieCadetCount: number;

  ngOnInit() {

    this.charlieSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Charlie');
    const charlieSalesSub = this.charlieSalesDoc.valueChanges().subscribe(b => {
      this.charlieSales = b.count;
    });

    this.charlieCadets = this.afs.collection<any>('Cadets', ref => {
      return ref.where('Company', '==', 'Charlie');
    });
    const charlieCadetCountSub = this.charlieCadets.valueChanges().subscribe(br => {
      this.charlieCadetCount = br.length;
      console.log('Charlie Cadet Count ' + br.length);
    });

  }

}
