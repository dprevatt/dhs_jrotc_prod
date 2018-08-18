import { AppComponent } from './../../../app.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sold-per-comapny-chart',
  templateUrl: './sold-per-comapny-chart.component.html',
  styleUrls: ['./sold-per-comapny-chart.component.css']
})
export class SoldPerComapnyChartComponent implements OnInit {

  @ViewChild('chart') el: ElementRef;
atRoot: boolean;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router) { 
      this.atRoot = true;
      console.log(this.router.url);
    }

  ngOnInit() {
    this.basicChart();
  }


  basicChart() {
    const query = this.afs.collection<any>('Rpt_CadetSalesByCompany').valueChanges().subscribe(x => {

    const element = this.el.nativeElement;

      const data = [
        {
          labels: [x[0].Company, x[1].Company, x[2].Company, x[3].Company,  x[4].Company,  x[5].Company],
          values: [x[0].count, x[1].count, x[2].count, x[3].count,  x[4].count,  x[5].count],
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
