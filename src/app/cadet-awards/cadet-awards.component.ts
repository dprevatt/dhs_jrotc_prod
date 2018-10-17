import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-cadet-awards',
  templateUrl: './cadet-awards.component.html',
  styleUrls: ['./cadet-awards.component.css']
})
export class CadetAwardsComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  bronzeSales: Array<any>;
  silverSales: Array<any>;
  goldSales: Array<any>;
  platinumSales: Array<any>;

  ngOnInit() {
    this.getSales();
    console.log(this.bronzeSales);
  }

  getSales() {
    const cadetSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    cadetSalesRef.valueChanges().subscribe(x => {
      const bronzeCadets = [];
      const silverCadets = [];
      const goldCadets = [];
      const platinumCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (parseInt(x[z].count, null) >= 5) {
          bronzeCadets.push(x[z]);
        }
        if (x[z].count >= 15) {
          silverCadets.push(x[z]);
        }
        if (x[z].count >= 25) {
          goldCadets.push(x[z]);
        }
        if (x[z].count >= 50) {
          platinumCadets.push(x[z]);
        }
      }
      console.log(bronzeCadets);
      this.bronzeSales = bronzeCadets.reverse();
      this.silverSales = silverCadets.reverse();
      this.goldSales = goldCadets.reverse();
      this.platinumSales = platinumCadets.reverse();
    });
  }

}
