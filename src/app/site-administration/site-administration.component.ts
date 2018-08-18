import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-site-administration',
  templateUrl: './site-administration.component.html',
  styleUrls: ['./site-administration.component.css']
})
export class SiteAdministrationComponent implements OnInit {

totalSalesCount: Observable<any>;
companySales: Array<any>;
otherSales: Array<any>;
Rpt_CadetSales: Array<any>;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.incrementTotalSales();
    this.getTotalSalesCount();
    this.getCompanySales();
    this.getRpt_CadetSales();
  }

  initializeCadetCount() {
    console.log('Invoked');
    this.set_Alpha_CadetCount();
    this.set_Bravo_CadetCount();
    this.set_Charlie_CadetCount();
    this.set_Delta_CadetCount();
    this.set_Echo_CadetCount();
    this.set_BnStaff_CadetCount();
    this.set_SGM_CadetCount();
    this.set_Other_CadetCount();
    //
    this.initializeTotalSalesCounter();
  }

  initializeTotalSalesCounter () {
    this.db.object<any>('counters/totalSales').set({
      count: 0
    });
  }

  set_Alpha_CadetCount() {
      const compDocQuery = this.afs.collection<any>('Cadets', ref => {
      return ref.where('Company', '==', 'Alpha');
      });
       const compDoc = compDocQuery.valueChanges().subscribe(br => {
         const docRef = '/counters/companySales/Alpha';
          this.db.database.ref(docRef).set({
            Company: 'Alpha',
            count: 0,
            AvgSoldPerCadet: 0.0,
            CadetCount: br.length,
            isClass: true
          })
          .then(res => {
            console.log('Alpha Company successfully Updated');
          })
          .catch(err => {
            alert('Error occurred while updating Alpha counter: ' + err);
          });
        });
   }

   set_Bravo_CadetCount() {
    const compDocQuery = this.afs.collection<any>('Cadets', ref => {
      return ref.where('Company', '==', 'Bravo');
      });
       const compDoc = compDocQuery.valueChanges().subscribe(br => {
         const docRef = '/counters/companySales/Bravo';
          this.db.database.ref(docRef).set({
            Company: 'Bravo',
            count: 0,
            AvgSoldPerCadet: 0.0,
            CadetCount: br.length,
            isClass: true
          })
          .then(res => {
            console.log('Bravo Company successfully Updated');
          })
          .catch(err => {
            alert('Error occurred while updating Bravo counter: ' + err);
          });
        });
}

   set_Charlie_CadetCount() {
    const compDocQuery = this.afs.collection<any>('Cadets', ref => {
      return ref.where('Company', '==', 'Charlie');
      });
       const compDoc = compDocQuery.valueChanges().subscribe(br => {
         const docRef = '/counters/companySales/Charlie';
          this.db.database.ref(docRef).set({
            Company: 'Charlie',
            count: 0,
            AvgSoldPerCadet: 0.0,
            CadetCount: br.length,
            isClass: true
          })
          .then(res => {
            console.log('Charlie Company successfully Updated');
          })
          .catch(err => {
            alert('Error occurred while updating Charlie counter: ' + err);
          });
        });
    }

    set_Delta_CadetCount() {
      const compDocQuery = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Delta');
        });
         const compDoc = compDocQuery.valueChanges().subscribe(br => {
           const docRef = '/counters/companySales/Delta';
            this.db.database.ref(docRef).set({
              Company: 'Delta',
              count: 0,
              AvgSoldPerCadet: 0.0,
              CadetCount: br.length,
              isClass: true
            })
            .then(res => {
              console.log('Delta Company successfully Updated');
            })
            .catch(err => {
              alert('Error occurred while updating Delta counter: ' + err);
            });
          });
    }

    set_Echo_CadetCount() {
      const compDocQuery = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Echo');
        });
         const compDoc = compDocQuery.valueChanges().subscribe(br => {
           const docRef = '/counters/companySales/Echo';
            this.db.database.ref(docRef).set({
              Company: 'Echo',
              count: 0,
              AvgSoldPerCadet: 0.0,
              CadetCount: br.length,
              isClass: true
            })
            .then(res => {
              console.log('Echo Company successfully Updated');
            })
            .catch(err => {
              alert('Error occurred while updating Echo counter: ' + err);
            });
          });
    }

    set_BnStaff_CadetCount() {
      const compDocQuery = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Bn Staff');
        });
         const compDoc = compDocQuery.valueChanges().subscribe(br => {
           const docRef = '/counters/companySales/Bn Staff';
            this.db.database.ref(docRef).set({
              Company: 'Bn Staff',
              count: 0,
              AvgSoldPerCadet: 0.0,
              CadetCount: br.length,
              isClass: false
            })
            .then(res => {
              console.log('Bn Staff Company successfully Updated');
            })
            .catch(err => {
              alert('Error occurred while updating Bn Staff counter: ' + err);
            });
          });
    }

    set_SGM_CadetCount() {
      const compDocQuery = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'SGM');
        });
         const compDoc = compDocQuery.valueChanges().subscribe(br => {
           const docRef = '/counters/companySales/SGM';
            this.db.database.ref(docRef).set({
              Company: 'SGM',
              count: 0,
              AvgSoldPerCadet: 0.0,
              CadetCount: br.length,
              isClass: false
            })
            .then(res => {
              console.log('SGM Company successfully Updated');
            })
            .catch(err => {
              alert('Error occurred while updating SGM counter: ' + err);
            });
          });
    }

    set_Other_CadetCount() {
      const compDocQuery = this.afs.collection<any>('Cadets', ref => {
        return ref.where('Company', '==', 'Other');
        });
         const compDoc = compDocQuery.valueChanges().subscribe(br => {
           const docRef = '/counters/companySales/Other';
            this.db.database.ref(docRef).set({
              Company: 'Other',
              count: 0,
              AvgSoldPerCadet: 0.0,
              CadetCount: br.length,
              isClass: false
            })
            .then(res => {
              console.log('Other Company successfully Updated');
            })
            .catch(err => {
              alert('Error occurred while updating Other counter: ' + err);
            });
          });
    }


    incrementTotalSales() {
      this.db.database.ref('counters').child('totalSales').transaction(d => {
        if (!d) {
          return d;
        }
        d.count += 1;
        return d;
      });
    }

    getTotalSalesCount() {
      const totalSalesCounterRef = '/counters/totalSales/count';
      this.totalSalesCount = this.db.object(totalSalesCounterRef).valueChanges();
    }

    getCompanySales() {
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

    Create_RptCadetSales() {
      const cadetSalesRef = this.db.object('Rpt_CadetSales/Prevatt, Dustin');
      cadetSalesRef.snapshotChanges().take(1).subscribe(x => {
        if (x.payload.exists()) {
          console.log('Exists');
          const newVal = x.payload.val().count + 1;
          cadetSalesRef.update({count: newVal});
        } else {
          console.log('Create Attempt..');
          this.db.object('Rpt_CadetSales/Prevatt, Dustin').set({
                Company: 'twst1',
                Name: 'test2',
                count: 0
            });
        }
        return x;
      });
    }


    // Get Rpt_CadetSales Data
    getRpt_CadetSales () {
    const rpt_CadetSalesRef = this.db.list<any>('Rpt_CadetSalesByCadet', ref => {
      return ref.orderByChild('count');
    });
    rpt_CadetSalesRef.valueChanges().subscribe(x => {
      const cadetSalesCounters = [];
      for (let z = 0; z < x.length; z++) {
        cadetSalesCounters.push(x[z]);
        }
      this.Rpt_CadetSales = cadetSalesCounters.reverse();
    });
  }


  }
