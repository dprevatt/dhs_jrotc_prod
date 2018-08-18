import { CompanyStats } from './../../models/CompanyStats';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-echo-average',
  templateUrl: './echo.component.html',
  styleUrls: ['./echo.component.css']
})
export class EchoComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  echoSalesDoc: AngularFirestoreDocument<CompanyStats>;
  echoSales: number;
  echoCadets: AngularFirestoreCollection<any>;
  echoCadetCount: number;

  ngOnInit() {

    this.echoSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Echo');
    const echoSalesSub = this.echoSalesDoc.valueChanges().subscribe(b => {
      this.echoSales = b.count;
    });

    this.echoCadets = this.afs.collection<any>('Cadets', ref => {
      return ref.where('Company', '==', 'Echo');
    });
    const echoCadetCountSub = this.echoCadets.valueChanges().subscribe(br => {
      this.echoCadetCount = br.length;
      console.log('Echo Cadet Count ' + br.length);
    });

  }

}
