import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-sales-statistics',
  templateUrl: './sales-statistics.component.html',
  styleUrls: ['./sales-statistics.component.css']
})
export class SalesStatisticsComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {


  }

totalSales: number;
salesGoal: number;
avgPerCadetList: Observable<any[]>;
avgPerCadetCollection: AngularFirestoreCollection<any>;
nonCompaniesList: Observable<any[]>;
myData: Observable<any[]>;

totalSalesCount: Observable<any>;
companySales: Array<any>;
otherSales: Array<any>;


  ngOnInit() {


      // Setting Total Sales Counter
      const soldArray = [];
      this.afs.collection('CadetSales').ref.get().then((data) => {
        console.log(data.size);
        data.forEach(sale => {
           if (sale.data().SaleComplete === true) {
            soldArray.push(sale);
           }
        });
        this.setTotalSalesCounter(soldArray.length);
      }).catch(function (error) {
        alert('An error occurred getting sales count: ' + error);
      });


      // Setting Total Picked Up Counter
      const pickedUpArray = [];
      this.afs.collection('CadetSales').ref.get().then((data) => {
        console.log(data.size);
        data.forEach(sale => {
           if (sale.data().PlatePickedUp === true) {
            pickedUpArray.push(sale);
           }
        });
        this.setTotalPickedUpCounter(pickedUpArray.length);
      }).catch(function (error) {
        alert('An error occurred getting plate picked up count: ' + error);
      });


    // this.avgPerCadetCollection = this.afs.collection<any>('Rpt_CadetSalesByCompany', ref => {
    //   return ref.where('isClass', '==', true)
    //             .orderBy('AvgSoldPerCadet', 'desc');
    // });

    // this.avgPerCadetList =  this.avgPerCadetCollection.valueChanges();


    // const nonCompList = this.afs.collection<any>('Rpt_CadetSalesByCompany', ref => {
    //   return ref.where('isClass', '==', false);
    // });

    // this.nonCompaniesList = nonCompList.valueChanges();


    // const totalCountCollection = this.afs.doc<any>('/Rpt_CadetSalesByStatus/Completed').valueChanges().subscribe(cv => {
    //   this.totalSales = cv.count;
    // });

    const salesGoalCollection = this.afs.doc<any>('/Rpt_SalesGoal/CurrentGoal').valueChanges().subscribe(cx => {
      this.salesGoal = cx.goal;
    });



    this.getTotalSalesCount();
    this.dp_getCompanySales();

  } // end of OnInit

/* ===================================================================== */


getTotalSalesCount() {
  const totalSalesCounterRef = '/counters/totalSales/count';
  this.totalSalesCount = this.db.object<any>(totalSalesCounterRef).valueChanges();
  return this.totalSalesCount;
}

dp_getCompanySales() {
  const CompanySalesRef = this.db.list<any>('/counters/companySales', ref => {
    return ref.orderByChild('AvgSoldPerCadet');
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

setTotalSalesCounter(cnt) {
    jQuery('#counterProgressModal').modal('show');
    // Reseting Counter
    const counterRef = this.db.database.ref('counters').child('totalSales');
    counterRef.transaction(dv => {
      if (!dv) {
        return dv;
      }
      console.log('Setting total sales counter to ' + cnt);
      dv.count = cnt;
      return dv;
    });
}


setTotalPickedUpCounter(cnt) {
  jQuery('#counterProgressModal').modal('show');
  // Reseting Counter
  const counterRef = this.db.database.ref('counters').child('PlatesPickedUp');
  counterRef.transaction(dv => {
    if (!dv) {
      return dv;
    }
    console.log('Setting platesPickedUp  counter to ' + cnt);
    dv.count = cnt;
    return dv;
  });
}


}
