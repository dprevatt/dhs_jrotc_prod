import { SortPipe } from './../../../sort.pipe';
import { OrderByPipe } from './../../../order-by.pipe';
import { AlphaComponent } from './../../../company-averages/alpha/alpha.component';
import { CompanyStats } from './../../../models/CompanyStats';
import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-total-sold-chart',
  templateUrl: './total-sold-chart.component.html',
  styleUrls: ['./total-sold-chart.component.css']
})
export class TotalSoldChartComponent implements OnInit, OnChanges {

  // @ViewChild('chart') el: ElementRef;
  soldCount: any;
  assignedCount: any;


  alphaSalesDoc: AngularFirestoreDocument<CompanyStats>;
  alphaSales: number;
  alphaCadets: AngularFirestoreCollection<any>;
  alphaCadetCount: number;

  bravoSalesDoc: AngularFirestoreDocument<CompanyStats>;
  bravoSales: number;
  bravoCadets: AngularFirestoreCollection<any>;
  bravoCadetCount: number;

  charlieSalesDoc: AngularFirestoreDocument<CompanyStats>;
  charlieSales: number;
  charlieCadets: AngularFirestoreCollection<any>;
  charlieCadetCount: number;

  deltaSalesDoc: AngularFirestoreDocument<CompanyStats>;
  deltaSales: number;
  deltaCadets: AngularFirestoreCollection<any>;
  deltaCadetCount: number;

  echoSalesDoc: AngularFirestoreDocument<CompanyStats>;
  echoSales: number;
  echoCadets: AngularFirestoreCollection<any>;
  echoCadetCount: number;

  foxtrotSalesDoc: AngularFirestoreDocument<CompanyStats>;
  foxtrotSales: number;
  foxtrotCadets: AngularFirestoreCollection<any>;
  foxtrotCadetCount: number;
  companySales: Array<any>;

  order: any;
  ascending: boolean;

  constructor(private afs: AngularFirestore, private sortPipe: SortPipe) { }

  ngOnInit() {
  this.companySales = [];

    // Alpha
    this.alphaSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Alpha');
    const alphaSalesSub = this.alphaSalesDoc.valueChanges().subscribe(b => {
      this.alphaSales = b.count;
      this.alphaCadets = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Alpha');
      });
      const alphaCadetCountSub = this.alphaCadets.valueChanges().subscribe(br => {
        this.alphaCadetCount = br.length;
        console.log('Alpha Cadet Count ' + br.length);
        const alphaSales = {
          Company: 'Alpha',
          CadetCount: this.alphaCadetCount,
          SalesPerCadet: parseFloat(((this.alphaSales / this.alphaCadetCount)).toFixed(2)),
          TotalSales: this.alphaSales
        };
        // Find index of specific object using findIndex method.
        const objIndex = this.companySales.findIndex((obj => obj.Company === 'Alpha'));
        if (objIndex === -1) {
          this.companySales.push(alphaSales);
        } else {
        // Log object to Console.
        console.log('Before update: ', this.companySales[objIndex])
        // Update object's name property.
        this.companySales[objIndex].SalesPerCadet = parseFloat(((this.alphaSales / this.alphaCadetCount)).toFixed(2));
        // Log object to console again.
        console.log('After update: ', this.companySales[objIndex]);
        }
        // Sort the Array for the Screen
        this.companySales.sort((b, a) => parseFloat(a.SalesPerCadet) - parseFloat(b.SalesPerCadet));
      });
    });



    // Bravo
    this.bravoSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Bravo');
    const bravoSalesSub = this.bravoSalesDoc.valueChanges().subscribe(b => {
      this.bravoSales = b.count;
      this.bravoCadets = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Bravo');
      });
      const bravoCadetCountSub = this.bravoCadets.valueChanges().subscribe(br => {
        this.bravoCadetCount = br.length;
        console.log('Bravo Cadet Count ' + br.length);
        const bravoSales = {
          Company: 'Bravo',
          CadetCount: this.bravoCadetCount,
          SalesPerCadet: parseFloat(((this.bravoSales / this.bravoCadetCount)).toFixed(2)),
          TotalSales: this.bravoSales
        };
          // Find index of specific object using findIndex method.
          const objIndex = this.companySales.findIndex((obj => obj.Company === 'Bravo'));
          if (objIndex === -1) {
            this.companySales.push(bravoSales);
          } else {
          // Log object to Console.
          console.log('Before update: ', this.companySales[objIndex])
          // Update object's name property.
          this.companySales[objIndex].SalesPerCadet = parseFloat(((this.bravoSales / this.bravoCadetCount)).toFixed(2));
          // Log object to console again.
          console.log('After update: ', this.companySales[objIndex]);
          }
          // Sort the Array for the Screen
          this.companySales.sort((b, a) => parseFloat(a.SalesPerCadet) - parseFloat(b.SalesPerCadet));
      });
    });




    // Charlie
    this.charlieSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Charlie');
    const charlieSalesSub = this.charlieSalesDoc.valueChanges().subscribe(b => {
      this.charlieSales = b.count;
      this.charlieCadets = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Charlie');
      });
      const charlieCadetCountSub = this.charlieCadets.valueChanges().subscribe(br => {
        this.charlieCadetCount = br.length;
        console.log('Charlie Cadet Count ' + br.length);
        const charlieSales = {
          Company: 'Charlie',
          CadetCount: this.charlieCadetCount,
          SalesPerCadet: parseFloat(((this.charlieSales / this.charlieCadetCount)).toFixed(2)),
          TotalSales: this.charlieSales
        };
            // Find index of specific object using findIndex method.
            const objIndex = this.companySales.findIndex((obj => obj.Company === 'Charlie'));
            if (objIndex === -1) {
              this.companySales.push(charlieSales);
            } else {
            // Log object to Console.
            console.log('Before update: ', this.companySales[objIndex])
            // Update object's name property.
            this.companySales[objIndex].SalesPerCadet = parseFloat(((this.charlieSales / this.charlieCadetCount)).toFixed(2));
            // Log object to console again.
            console.log('After update: ', this.companySales[objIndex]);
            }
            // Sort the Array for the Screen
            this.companySales.sort((b, a) => parseFloat(a.SalesPerCadet) - parseFloat(b.SalesPerCadet));
      });
    });





    // Delta
    this.deltaSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Delta');
    const deltaSalesSub = this.deltaSalesDoc.valueChanges().subscribe(b => {
      this.deltaSales = b.count;
      this.deltaCadets = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Delta');
      });
      const deltaCadetCountSub = this.deltaCadets.valueChanges().subscribe(br => {
        this.deltaCadetCount = br.length;
        console.log('Delta Cadet Count ' + br.length);
        const deltaSales = {
          Company: 'Delta',
          CadetCount: this.deltaCadetCount,
          SalesPerCadet: parseFloat(((this.deltaSales / this.deltaCadetCount)).toFixed(2)),
          TotalSales: this.deltaSales
        };
            // Find index of specific object using findIndex method.
            const objIndex = this.companySales.findIndex((obj => obj.Company === 'Delta'));
            if (objIndex === -1) {
              this.companySales.push(deltaSales);
            } else {
            // Log object to Console.
            console.log('Before update: ', this.companySales[objIndex])
            // Update object's name property.
            this.companySales[objIndex].SalesPerCadet = parseFloat(((this.deltaSales / this.deltaCadetCount)).toFixed(2));
            // Log object to console again.
            console.log('After update: ', this.companySales[objIndex]);
            }
            // Sort the Array for the Screen
            this.companySales.sort((b, a) => parseFloat(a.SalesPerCadet) - parseFloat(b.SalesPerCadet));
      });
    });





    // Echo
    this.echoSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Echo');
    const echoSalesSub = this.echoSalesDoc.valueChanges().subscribe(b => {
      this.echoSales = b.count;
      this.echoCadets = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Echo');
      });
      const echoCadetCountSub = this.echoCadets.valueChanges().subscribe(br => {
        this.echoCadetCount = br.length;
        console.log('Echo Cadet Count ' + br.length);
        const echoSales = {
          Company: 'Echo',
          CadetCount: this.echoCadetCount,
          SalesPerCadet: parseFloat(((this.echoSales / this.echoCadetCount)).toFixed(2)),
          TotalSales: this.echoSales
        };
            // Find index of specific object using findIndex method.
            const objIndex = this.companySales.findIndex((obj => obj.Company === 'Echo'));
            if (objIndex === -1) {
              this.companySales.push(echoSales);
            } else {
            // Log object to Console.
            console.log('Before update: ', this.companySales[objIndex])
            // Update object's name property.
            this.companySales[objIndex].SalesPerCadet = parseFloat(((this.echoSales / this.echoCadetCount)).toFixed(2));
            // Log object to console again.
            console.log('After update: ', this.companySales[objIndex]);
            }
            // Sort the Array for the Screen
            this.companySales.sort((b, a) => parseFloat(a.SalesPerCadet) - parseFloat(b.SalesPerCadet));
      });
    });





    // Foxtrot
    this.foxtrotSalesDoc = this.afs.doc<CompanyStats>('/Rpt_CadetSalesByCompany/Foxtrot');
    const foxtrotSalesSub = this.foxtrotSalesDoc.valueChanges().subscribe(b => {
      this.foxtrotSales = b.count;
      this.foxtrotCadets = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Foxtrot');
      });
      const foxtrotCadetCountSub = this.foxtrotCadets.valueChanges().subscribe(br => {
        this.foxtrotCadetCount = br.length;
        console.log('Foxtrot Cadet Count ' + br.length);
        const foxtrotSales = {
          Company: 'Foxtrot',
          CadetCount: this.foxtrotCadetCount,
          SalesPerCadet: parseFloat(((this.foxtrotSales / this.foxtrotCadetCount)).toFixed(2)),
          TotalSales: this.foxtrotSales
        };
            // Find index of specific object using findIndex method.
            const objIndex = this.companySales.findIndex((obj => obj.Company === 'Foxtrot'));
            if (objIndex === -1) {
              this.companySales.push(foxtrotSales);
            } else {
            // Log object to Console.
            console.log('Before update: ', this.companySales[objIndex])
            // Update object's name property.
            this.companySales[objIndex].SalesPerCadet = parseFloat(((this.foxtrotSales / this.foxtrotCadetCount)).toFixed(2));
            // Log object to console again.
            console.log('After update: ', this.companySales[objIndex]);
            }
            // Sort the Array for the Screen
            this.companySales.sort((b, a) => parseFloat(a.SalesPerCadet) - parseFloat(b.SalesPerCadet));
      });
    });

this.order = 'TotalSales';
this.ascending = false;


  } // End of On Init


  ngOnChanges() {
    console.log('Change occurred.');
 }



}


