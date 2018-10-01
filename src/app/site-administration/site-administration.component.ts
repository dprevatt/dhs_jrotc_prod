import * as XLSX from 'js-xlsx';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { v4 as uuid } from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';


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
salesGoal: number;
deleteApplicationDataStatus: string;
importApplicationDataStatus: string;
cadetUploadFile: any;
authCode: string;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    jQuery('#authorizationModal')
    .modal('setting', 'closable', false)
    .modal('show');
    this.incrementTotalSales();
    this.getTotalSalesCount();
    this.getCompanySales();
    this.getRpt_CadetSales();
  }

  validateAuth() {
    if (this.authCode === 'DHS_JROTC_Admin') {
      jQuery('#authorizationModal').modal('hide');
    } else {
      alert('Permission Denied');
      this.router.navigate(['/']);
    }
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
    this.initializeTotalPickedUpCounter();
    //
    this.setSalesGoal();
    alert('Sales goal set successfully!');
  }

  setSalesGoal() {
    this.afs.doc('/Rpt_SalesGoal/CurrentGoal').set({
      goal: this.salesGoal
    });
    console.log('SalesGoal Set!');
  }

  initializeTotalSalesCounter () {
    this.db.object<any>('counters/totalSales').set({
      count: 0
    });
  }

  initializeTotalPickedUpCounter () {
    this.db.object<any>('counters/PlatesPickedUp').set({
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

  public fileChanged (e) {
    // this.createTables();
    const cadetList = [];
    const cadetSalesList = [];
    this.cadetUploadFile = e.target.files[0];
      console.log('Reading from file: ' + e.target.files[0]);
      const target: DataTransfer = <DataTransfer>(e.target);
      if (target.files.length !== 1) {
        alert('Cannot upload multiple files');
      }
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        jQuery('#importDataDataModal').modal('show');
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        console.log(wsname);
        if (wsname !== 'CadetData') {
          alert('Invalid spreadsheet!');
          return;
        }
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        // console.log(ws['A1'].v); // this gets the value of the cell
        // Read The Data into an JSON array
        const ssData = XLSX.utils.sheet_to_row_object_array(ws);
        console.log(ssData);
        for (let i = 0; i < ssData.length; i++) {
           // console.log('Cadet: ' + col2 + ', ' + col1 + ' Company: ' + col3);
          // Actually post the data
          const cadetIdentifier = uuid();
          const cadetData = {
            CadetId: cadetIdentifier,
            Cadet: ssData[i].CadetLastName + ', ' + ssData[i].CadetFirstName,
            Company: ssData[i].Company,
            CreatedDate: new Date().toISOString(),
            CreatedBy: 'System',
            ModifiedDate: '',
            ModifiedBy: ''
          };

          const cadetSalesData = {
            BuyerFirstName: '',
            BuyerLastName: '',
            BuyerPhone: '',
            SaleComplete: false,
            SaleCompletedDate: '',
            Seller: ssData[i].CadetLastName + ', ' + ssData[i].CadetFirstName,
            SellerCompany: ssData[i].Company,
            SellerId: cadetIdentifier,
            TicketNumberStart: ssData[i].TicketNumberStart,
            TicketNumberEnd: ssData[i].TicketNumberEnd
          };

          // tslint:disable-next-line:max-line-length
          if ( (ssData[i].CadetFirstName.toString().length > 2) && (ssData[i].CadetLastName.toString().length > 2) && (ssData[i].Company.toString().length > 2) ) {
            cadetList.push(cadetData);
          } else {
            alert(ssData[i].CadetLastName.toString() + ', ' + ssData[i].CadetFirstName.toString()
            + ' will not be added. Insufficient Data Supplied.');
          }

          // tslint:disable-next-line:max-line-length
          if ( (ssData[i].CadetFirstName.toString().length > 2) && (ssData[i].CadetLastName.toString().length > 2) && (ssData[i].Company.toString().length > 2) && (cadetSalesData.TicketNumberStart) && (cadetSalesData.TicketNumberEnd) ) {
            cadetSalesList.push(cadetSalesData);
          } else {
            alert('Tickets for ' + ssData[i].CadetLastName.toString() + ', ' + ssData[i].CadetFirstName.toString() +
            ' will not be added. Insufficient Data Supplied.' );
          }
        } // End of loop

        // Import the data
        this.importData('Cadets', cadetList);
        this.importData('CadetSales', cadetSalesList);
      };
      reader.readAsBinaryString(target.files[0]);
   }








  deleteApplicationData() {
    jQuery('#cleanAppDataModal').modal('show');
    jQuery('#appDataPrcCompBtn').fadeOut();
    jQuery('#deleteAppDataLoader').fadeIn();
    // <------------------------ Delete RealTimeDB CadetStats --------------------------- >
    this.db.list('Rpt_CadetSalesByCadet').remove()
    .then(x => {
      console.log('Rpt_CadetSalesByCadet has been removed successfully');
    }).catch(err => {
      alert('An error occurred: ' + err.message);
    });
    this.db.object('counters').remove()
    .then(x => {
      console.log('Counters has been removed successfully');
    }).catch(err => {
      alert('An error occurred: ' + err.message);
    });
    // <------------------------ Delete Cadet Sales --------------------------- >
    const ticketsCollection = this.afs.firestore.collection('CadetSales');
    ticketsCollection.get().then(snapshot => {

      snapshot.forEach(doc => {
        this.deleteDoc(doc.ref.path, 'Ticket Number');
      });
    }).then(x => {
      this.deleteApplicationDataStatus = 'Tickets removed successfully!';
    });
    // <------------------------ Delete Cadets --------------------------- >
    const cadetCollection = this.afs.firestore.collection('Cadets');
    cadetCollection.get().then(snapshot => {

      snapshot.forEach(doc => {
        this.deleteDoc(doc.ref.path, 'Cadet');
      });
    }).then(x => {
      this.deleteApplicationDataStatus = 'Cadets removed successfully!';
    });
    // <------------------------ Delete Sales Companies --------------------------- >
    const companyCollection = this.afs.firestore.collection('Rpt_CadetSalesByCompany');
    companyCollection.get().then(snapshot => {

      snapshot.forEach(doc => {
        this.deleteDoc(doc.ref.path, 'Companies');
      });
      this.deleteDoc('/Rpt_SalesGoal/CurrentGoal', 'Sales Goal');
      this.deleteDoc('/Rpt_CadetSalesByStatus/Completed', 'Stats');
      this.deleteDoc('/Rpt_CadetSalesByStatus/Incomplete', 'Stats');
      this.deleteApplicationDataStatus = 'Application Data removed successfully';
    }).then(x => {
      this.deleteApplicationDataStatus = 'Cadets removed successfully!';
    });
  }



// <-------------------------------- Helper Methods -------------------------------- >

deleteDoc(docX, itemType) {
  const dataEle = docX.split('/')[1];
  this.deleteApplicationDataStatus = 'Removing ' + itemType + ': ' + dataEle;
  this.afs.doc(docX).delete().then(v => {
    console.log(docX);
    if (docX === '/Rpt_CadetSalesByStatus/Incomplete') {
      this.deleteApplicationDataStatus = 'Application Data removed successfully';
      jQuery('#deleteAppDataLoader').fadeOut();
      jQuery('#appDataPrcCompBtn').fadeIn();
    } else {
      this.deleteApplicationDataStatus = itemType +  ': ' + dataEle + ' removed successfully';
    }
  }).catch(err => {
    this.deleteApplicationDataStatus = err.message;
    alert(err.message);
  });
}

deleteRTDBDoc(docX) {
  const deleteFn = this.db.object(docX).remove()
  .then(x => {
    console.log(docX + 'removed successfully.');
  }).catch(err => {
    alert('An error occurred: ' + err.message);
  });
}

deleteRtDBTest() {
  this.db.list('Rpt_CadetSalesByCadet').remove();
}

// <--------------------------------- Import Data Function ----------------------------------->

importData(type, arr) {
  jQuery('#importAppDataPrcCompBtn').fadeOut();
  jQuery('#importAppDataLoader').fadeIn();
  if (type === 'Cadets') {
    console.log('Importing Cadets');
    this.importApplicationDataStatus = 'Beginning Cadet Import';
    for (let c = 0; c < arr.length; c++) {
      const cadetBatch = this.afs.firestore.batch();
      const compBatch = this.afs.firestore.batch();
      const Rpt_CadetSalesByCadet_Batch = this.afs.firestore.batch();
      const cadetDocRef = this.afs.firestore.doc('Cadets/' + arr[c].Cadet.toString());
      cadetDocRef.get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          alert('Cadet ' + arr[c].Cadet.toString() + ' already exists');
        } else {
          this.importApplicationDataStatus = 'Imported ' + arr[c].Cadet.toString() + ' successfully.';
          cadetBatch.set(cadetDocRef, arr[c], {merge: true});
          const cadetCounter = {
            Name: arr[c].Cadet.toString(),
            Company: arr[c].Company.toString(),
            count: 0
            };

          const rptDocRef = this.db.object('Rpt_CadetSalesByCadet/' + arr[c].Cadet.toString()).set({
            Name: arr[c].Cadet.toString(),
            Company: arr[c].Company.toString(),
            count: 0
            });

            cadetBatch.commit();

          }
        }).catch(err => {
          alert(err.message);
        });
    } // end of loop
  } else {
    console.log('In Cadet Sales');
    this.importApplicationDataStatus = 'Beginning cadet ticket import.';
    for (let cs = 0; cs < arr.length; cs++) {
      // console.log(arr[cs].TicketNumberStart);
      for (let t = arr[cs].TicketNumberStart; t <= arr[cs].TicketNumberEnd; t++ ) {
        const cadetSalesBatch = this.afs.firestore.batch();
        const cadetSalesData = {
          BuyerFirstName: '',
          BuyerLastName: '',
          BuyerPhone: '',
          SaleComplete: false,
          SaleCompletedDate: '',
          PlatePickedUp: false,
          PlatePickedUpDate: '',
          Seller: arr[cs].Seller,
          SellerCompany: arr[cs].SellerCompany,
          SellerId: arr[cs].SellerId,
          TicketNumber: parseInt(t.toString(), null)
        };

        // <-------------------------------------------------------------------------
        const cadetSalesDocRef = this.afs.firestore.doc('CadetSales/' + t.toString());
        cadetSalesDocRef.get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          alert('TicketNumber ' + t.toString() + ' has already been assigned.');
        } else {
          cadetSalesBatch.set(cadetSalesDocRef, cadetSalesData, {merge: true});
          // Commit the batch
          cadetSalesBatch.commit()
          .then(res => {
            this.importApplicationDataStatus = 'Assigning tickets for ' + arr[cs].Seller;
            if ((cs + 1) === arr.length) {
              this.importApplicationDataStatus = 'Application Data import complete.';
              jQuery('#importAppDataLoader').fadeOut();
              jQuery('#importAppDataPrcCompBtn').fadeIn();
            }
            console.log('batch submitted successfully for ' + arr[cs].Seller);
          }).catch(err => {
            alert(err);
          });
        }
      }).catch(err => {
        alert('An error occurred processing ticket number ' + t.toString() + ': ' + err.message);
      });
    }
  }

  }


} // end of import-data function


// <-------------------------------- Helper Methods -------------------------------- >


  }
