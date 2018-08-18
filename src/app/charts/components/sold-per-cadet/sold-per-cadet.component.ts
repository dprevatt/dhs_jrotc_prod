import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-sold-per-cadet',
  templateUrl: './sold-per-cadet.component.html',
  styleUrls: ['./sold-per-cadet.component.css']
})
export class SoldPerCadetComponent implements OnInit {

  @ViewChild('chart') el: ElementRef;

  constructor(private afs: AngularFirestore) { }


  ngOnInit() {
    this.basicChart();
  }


  basicChart() {
    const query = this.afs.collection<any>('Rpt_CadetSalesByCadet').valueChanges().subscribe(x => {
    const cadetArr = [];
    const cadetSoldArr = [];
    for (let k = 0; k < x.length; k++) {
      // console.log(x[k].Name);
      cadetArr.push(x[k].Name);
      cadetSoldArr.push(x[k].count);
    }
    const element = this.el.nativeElement;

      const data = [
        {
          x: cadetArr,
          y: cadetSoldArr,
          type: 'bar'
        }
      ];

      const style = {
        title: 'Tickets Sold By Cadet',
        xaxis: {
          margin: {
            b: 1000,
            t: 1000
          }
        },
      };

      Plotly.plot( element, data, style )
    });
  }

} // End of Component


