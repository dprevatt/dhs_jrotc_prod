import { CompanyStats } from './../../models/CompanyStats';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-bravo-average',
  templateUrl: './bravo.component.html',
  styleUrls: ['./bravo.component.css']
})
export class BravoComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  bravoSalesDoc: AngularFirestoreDocument<CompanyStats>;
  bravoSales: number;
  bravoCadets: AngularFirestoreCollection<any>;
  bravoCadetCount: number;


  ngOnInit() {

    this.bravoSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Bravo');
    const bravoSalesSub = this.bravoSalesDoc.valueChanges().subscribe(b => {
      this.bravoSales = b.count;
    });

    this.bravoCadets = this.afs.collection<any>('Cadets', ref => {
      return ref.where('Company', '==', 'Bravo');
    });
    const bravoCadetCountSub = this.bravoCadets.valueChanges().subscribe(br => {
      this.bravoCadetCount = br.length;
      console.log('Bravo Cadet Count ' + br.length);
    });

  }


}
