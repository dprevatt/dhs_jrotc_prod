import { Observable } from '@firebase/util';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-top5sellers',
  templateUrl: './top5sellers.component.html',
  styleUrls: ['./top5sellers.component.css']
})
export class Top5sellersComponent implements OnInit {

top5Sellers: Array<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    const resultSet = [];
    const query = this.afs.collection<any>('Rpt_CadetSalesByCadet', ref => {
      return ref.orderBy('count', 'desc').limit(5);
    });

    const myData = query.valueChanges().subscribe(x => {
      console.log(x[0]);
      for (let z = 0; z < x.length; z++) {
        const compQuery = this.afs.collection<any>('Cadets', ref => {
          return ref.where('Cadet', '==', x[z].Name).limit(1);
        });

        const dta = compQuery.valueChanges().take(1).subscribe(vx => {
          const pushData = {
            Cadet: x[z].Name,
            Company: vx[0].Company,
            TicketsSold: x[z].count
          };
          resultSet.push(pushData);
        }); // End of company gET
      } // end of for loop
      this.top5Sellers = resultSet;
    }); // End of Cadet Get


  }


  pushResult(data) {
    console.log(data);
    this.top5Sellers.push(data);
  }

}
