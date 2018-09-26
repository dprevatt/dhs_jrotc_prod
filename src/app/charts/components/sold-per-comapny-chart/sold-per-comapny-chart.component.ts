import { AppComponent } from './../../../app.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-sold-per-comapny-chart',
  templateUrl: './sold-per-comapny-chart.component.html',
  styleUrls: ['./sold-per-comapny-chart.component.css']
})
export class SoldPerComapnyChartComponent implements OnInit {

  @ViewChild('chart') el: ElementRef;
atRoot: boolean;
companySales: Array<any>;
otherSales: Array<any>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router, private db: AngularFireDatabase) {
      this.atRoot = true;
      console.log(this.router.url);
    }

  ngOnInit() {
    this.dp_getCompanySales();
    this.basicChart();
  }


  basicChart() {
    const query = this.db.list<any>('/counters/companySales').valueChanges().subscribe(x => {

      const element = this.el.nativeElement;

      const data = [
        {
          labels: [x[0].Company, x[1].Company, x[2].Company, x[3].Company,  x[4].Company,  x[5].Company, x[7].Company],
          values: [x[0].count, x[1].count, x[2].count, x[3].count,  x[4].count,  x[5].count, x[7].count],
          type: 'pie'
        }
      ];
      const style = {
        height: 600,
        width: 600,
        title: 'Tickets Sold By Company',
      };

      Plotly.plot( element, data, style );
    });
} // End of function




  dp_getCompanySales() {
    const CompanySalesRef = this.db.list<any>('/counters/companySales', ref => {
      return ref.orderByChild('count');
    });
    CompanySalesRef.valueChanges().subscribe(x => {
      const myCompList = [];
      const myOtherList = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].isClass === true) {
          myCompList.push(x[z]);
        }
        else {
          myOtherList.push(x[z]);
        }
      }
      this.companySales = myCompList.reverse();
      this.otherSales = myOtherList.reverse();
    });
  }


/*
        const data = [{
        values: [x[0].count, x[1].count],
        labels: ['Sold Tickets', 'Assigned Tickets'],
        type: 'pie'
      }];

      const style = {
        height: 400,
        width: 500,
        title: 'Tickets Sold vs Tickets Assigned'
      };

*/


} // End of Component
