import { TotalSoldChartComponent } from './../../../charts/components/total-sold-chart/total-sold-chart.component';
import { CadetSales } from './../../../models/CadetSales';
import { TextTitlecaseComponent } from './../../../custom-inputs/text-titlecase/text-titlecase.component';
import { PhoneMaskComponent } from './../../../custom-inputs/phone-mask/phone-mask.component';
import { Component, OnInit, transition, Optional } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscribe } from '@firebase/util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import * as firebase from 'firebase';
import { post } from '../../../../../node_modules/@types/selenium-webdriver/http';


@Component({
  selector: 'app-cadet-sales-entry',
  templateUrl: './cadet-sales-entry.component.html',
  styleUrls: ['./cadet-sales-entry.component.css']
})
export class CadetSalesEntryComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

enteredTicket: any;
enteredSale: CadetSales;
sale_ticketNumberEnd: any;
sale_buyerLast: string;
sale_buyerFirst: string;
sale_buyerPhone: string;
RptSellerSaleCount: number;
previouslyEntered: boolean;
isvalidOwner: number;
validBulkSale: boolean;
cadetCompanyCount: number;

toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

  ngOnInit() {
    this.FormValidation();
    TextTitlecaseComponent.prototype.textTitleCase();
    PhoneMaskComponent.prototype.phoneMask();
  }

  sendTab(){
    const inputs = jQuery(':input').keypress(function(e) {
      if (e.which === 13) {
         e.preventDefault();
         jQuery('#buyerLast').focus();
         const nextInput = inputs.get(inputs.index(this) + 1);
         if (nextInput) {
            nextInput.focus();
         }
      }
    });
  }

  findTicketOwner() {
    this.previouslyEntered = false;
    if (this.enteredTicket){
      console.log(this.enteredTicket);
      const query = this.afs.collection<any>('CadetSales', ref => {
        return ref.where('TicketNumber', '==', this.enteredTicket).limit(1);
      });

      query.valueChanges().take(1).subscribe(vx => {
        if (vx.length === 1) {
          console.log(vx);
          console.log(vx[0].Seller);
          if (vx[0].SaleComplete === true){
            alert('This ticket has been previously submitted.');
            this.previouslyEntered = true;
          }
          this.enteredSale = vx[0];
        } else {
          alert('Ticket number ' + this.enteredTicket + ' has not been assigned');
          this.enteredSale = null;
        }
      });
    }
  }

  FormValidation() {
    jQuery('.ui form')
    .form({
      on: 'blur',
      inline: true,
      keyboardShortcuts: false,
      fields: {
        buyerLast: {
          identifier  : 'buyerLast',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a last name for the buyer.'
            }
          ]
        },
        ticketNumber: {
          identifier  : 'ticketNumberStart',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a ticket number.'
            }
          ]
        }
      }
    });

  }

  submitSale() {
    if (this.sale_ticketNumberEnd) {
      this.submitBulkSale();
    } else {
      this.submitSingleSale();
    }
  }

submitBulkSale() {
  console.log('Initiating Bulk Sale..');
  console.log(this.sale_buyerFirst);
  this.validBulkSale = false;
  if (this.sale_ticketNumberEnd <= this.enteredTicket) {
        alert('Invalid ticket range');
      }
       else {
         if (this.formIsValid()) {
           const bCount = (this.sale_ticketNumberEnd - this.enteredTicket) + 1;
          for (let t = this.enteredTicket; t <= this.sale_ticketNumberEnd; t++) {
            console.log(this.enteredTicket + ' thru ' + this.sale_ticketNumberEnd);
            const buyerInfo = {
              buyerFirst: this.sale_buyerFirst,
              buyerLast: this.sale_buyerLast,
              buyerPhone: this.sale_buyerPhone
            };
                this.bulkSubmission(this, t, buyerInfo, this.validBulkSale, bCount);

            } // end of for loop
            if (localStorage.getItem('ValidBulkSale') === 'true'){
              this.clearForm();
              localStorage.removeItem('ValidBulkSale');
            }
         } // end if valid form
  } // End of Else
  this.clearForm();
} // end of function


bulkSubmission(context, i, buyerInfo, vBulk, bCount) {
  const query = this.afs.collection<any>('CadetSales', ref => {
    return ref.where('TicketNumber', '==',  i).where('Seller', '==', context.enteredSale.Seller).limit(1);
  });

  const fireDoc = query.valueChanges().take(1).subscribe(x => {
    if (!x[0]) {
      alert('Ticket number ' + i + ' is not currently assigned to ' + context.enteredSale.Seller + '. Sale will not be submitted.');
    }
    else {
      /* Submit the SAle! */
      const documentReference = this.afs.doc('CadetSales/' + i);
              // running the transaction
              this.afs.firestore.runTransaction(t => {
                // returning the transaction function
                return t.get(documentReference.ref)
                    .then(doc => {
                        t.update(documentReference.ref, {
                          BuyerFirstName: buyerInfo.buyerFirst !== undefined ? buyerInfo.buyerFirst : '',
                          BuyerLastName: buyerInfo.buyerLast,
                          BuyerPhone: buyerInfo.buyerPhone !== undefined ? buyerInfo.buyerPhone : '',
                          SaleComplete: true,
                          PlatePickedUp: false,
                          SaleCompletedDate: new Date().toISOString(),
                          Seller: context.enteredSale.Seller,
                          SellerCompany: context.enteredSale.SellerCompany,
                          SellerId: context.enteredSale.SellerId,
                        });
                    });
            // tslint:disable-next-line:max-line-length
            }).then(res => {
              this.validBulkSale = true;
              this.setValidBulkSale();
              localStorage.setItem('ValidBulkSale', 'true');
              vBulk = true;
              this.dp_incrementTotalSales();
              this.dp_incrementCompanySales(context.enteredSale.SellerCompany.toString());
              // tslint:disable-next-line:max-line-length
              this.dp_increment_RptCadetSales(context.enteredSale.Seller.toString(), context.enteredSale.SellerCompany.toString());
                console.log('Bulk submission successful');
              },
               err => alert(err + ' occurred while attempting to add ticket number' + i.toString()));
    } // End of else
    this.clearForm();
  });
} // End of Bulk Submission

setValidBulkSale() {
  this.validBulkSale = true;
}

submitSingleSale() {
  console.log('Initiating Single Sale..');
  if (this.formIsValid()) {
    const documentReference = this.afs.doc('CadetSales/' + this.enteredTicket.toString());
    // this.afs.collection('CadetSales').doc(this.enteredTicket.toString()).set(sale, {merge: true});
    this.afs.firestore.runTransaction(t => {
        return t.get(documentReference.ref)
          .then(doc => {
            t.update(documentReference.ref, {
              BuyerFirstName: this.sale_buyerFirst !== undefined ? this.sale_buyerFirst : '',
              BuyerLastName: this.sale_buyerLast,
              BuyerPhone: this.sale_buyerPhone !== undefined ? this.sale_buyerPhone : '',
              SaleComplete: true,
              PlatePickedUp: false,
              SaleCompletedDate: new Date().toISOString(),
              Seller: this.enteredSale.Seller,
              SellerCompany: this.enteredSale.SellerCompany,
              SellerId: this.enteredSale.SellerId,
              TicketNumber: this.enteredTicket
            });
          });
    // tslint:disable-next-line:max-line-length
    }).then(res => {
      this.dp_incrementTotalSales();
      this.dp_incrementCompanySales(this.enteredSale.SellerCompany.toString());
      this.dp_increment_RptCadetSales(this.enteredSale.Seller.toString(), this.enteredSale.SellerCompany.toString());
      // this.increment_RptCadetSales();
      // this.incrementCompanySales();
      // this.incrementTotalSales();
      this.clearForm();
    },
      err => alert(err + ' occurred while attempting to add ticket number' + this.enteredTicket));
  } // end of if form is valid.
} // end of single sal esubmission



formIsValid() {
  if (!this.enteredTicket || !this.sale_buyerLast || !this.enteredSale) {
    return false;
  } else {
    return true;
  }
}


clearForm() {
  this.sale_buyerFirst = '';
  this.sale_buyerLast = '';
  this.sale_buyerPhone = '';
  this.enteredTicket = '';
  this.sale_ticketNumberEnd = '';
 jQuery('#ticketNumberStart').focus();
}




increment_RptCadetSales() {
  // tslint:disable-next-line:max-line-length
  const queryDocFur = this.afs.firestore.collection('Rpt_CadetSalesByCadet').doc(this.enteredSale.Seller);

  this.afs.firestore.runTransaction(transaction => {
    return transaction.get(queryDocFur).then(res => {
      const newVal = res.data().count + 1;
      transaction.update(queryDocFur, { count: newVal });
    });
  });
}

bulk_increment_RptCadetSales(num) {
  // tslint:disable-next-line:max-line-length
  const queryDocFur = this.afs.firestore.collection('Rpt_CadetSalesByCadet').doc(this.enteredSale.Seller);

  this.afs.firestore.runTransaction(transaction => {
    return transaction.get(queryDocFur).then(res => {
      const newVal = res.data().count + num;
      transaction.update(queryDocFur, { count: newVal });
    });
  });
}

// incrementCompanySales() {
//   if (!this.previouslyEntered) {
//     const query = this.afs.doc<any>('/Rpt_CadetSalesByCompany/' + this.toTitleCase(this.enteredSale.SellerCompany.toString()));

//       const fireDoc = query.snapshotChanges().take(1).subscribe(vc => {
//         const myCount = vc.payload.data().count + 1;
//         const cCounter = {count: myCount};
//         query.update(cCounter);
//         return vc.payload.data().count;
//       });
//   }
// }


incrementCompanySales() {

    const documentReference = this.afs.doc('/Rpt_CadetSalesByCompany/' + this.enteredSale.SellerCompany.toString());
    // running the transaction
    this.afs.firestore.runTransaction(t => {
      // returning the transaction function
      return t.get(documentReference.ref)
          .then(doc => {
            this.setCadetCompanyAvg(this.enteredSale.SellerCompany.toString(), doc.data().count + 1);
              // read the current "value" field of the document
              const newValue = doc.data().count + 1;
              // increase it by 1 atomically
              t.update(documentReference.ref, {
                  count: newValue
              });
          });
  }).then(res => console.log('Company Counter Updated'), err => alert('An error occurred updating Company Counter ' + err));

}// end of function


incrementTotalSales() {
  if (!this.previouslyEntered) {
    const documentReference = this.afs.doc('/Rpt_CadetSalesByStatus/Completed');
        // running the transaction
        this.afs.firestore.runTransaction(t => {
          // returning the transaction function
          return t.get(documentReference.ref)
              .then(doc => {
                  // read the current "value" field of the document
                  const newValue = doc.data().count + 1;
                  // increase it by 1 atomically
                  t.update(documentReference.ref, {
                      count: newValue
                  });
              });
      }).then(res => console.log('Counter Updated'), err => alert('An error occurred updating Sales Counter ' + err));
  }
}

bulk_incrementTotalSales(num) {
  if (!this.previouslyEntered) {
    const documentReference = this.afs.doc('/Rpt_CadetSalesByStatus/Completed');
        // running the transaction
        this.afs.firestore.runTransaction(t => {
          // returning the transaction function
          return t.get(documentReference.ref)
              .then(doc => {
                  // read the current "value" field of the document
                  const newValue = doc.data().count + num;
                  // increase it by 1 atomically
                  t.update(documentReference.ref, {
                      count: newValue
                  });
              });
      }).then(res => console.log('Counter Updated'), err => alert('An error occurred updating Sales Counter ' + err));
  }
}


validateTicketOwner(t) {
  const query = this.afs.collection('CadetSales', ref => {
    return ref.where('TicketNumber', '==',  t).where('Seller', '==', this.enteredSale.Seller).limit(1);
  });

  const fireDoc = query.valueChanges().subscribe(sx => {
     console.log(sx.length);
  });

console.log(this.isvalidOwner);

}

setCadetCompanyAvg(comp, currentCount) {
  const query = this.afs.collection('Cadets', ref => {
    return ref.where('Company', '==', comp);
  });

query.valueChanges().take(1).subscribe(x => {
    const documentReference = this.afs.doc('/Rpt_CadetSalesByCompany/' + comp);
    // running the transaction
    this.afs.firestore.runTransaction(t => {
      // returning the transaction function
      return t.get(documentReference.ref)
          .then(doc => {
              // read the current "value" field of the document
              const newValue = currentCount / x.length;
              // increase it by 1 atomically
              t.update(documentReference.ref, {
                  AvgSoldPerCadet: parseFloat(newValue.toFixed(2))
              });
          });
  }).then(res => console.log('Company Average Updated'), err => alert('An error occurred updating Company Average ' + err));
  });
}

batch_SetCadetCompanyAvg(comp, currentCount) {
  const query = this.afs.collection('Cadets', ref => {
    return ref.where('Company', '==', comp);
  });

query.valueChanges().take(1).subscribe(x => {
    const documentReference = this.afs.doc('/Rpt_CadetSalesByCompany/' + comp);
    // running the transaction
    this.afs.firestore.runTransaction(t => {
      // returning the transaction function
      return t.get(documentReference.ref)
          .then(doc => {
              // read the current "value" field of the document
              const newValue = currentCount / x.length;
              // increase it by 1 atomically
              t.update(documentReference.ref, {
                  AvgSoldPerCadet: parseFloat(newValue.toFixed(2))
              });
          });
  }).then(res => console.log('Company Average Updated'), err => alert('An error occurred updating Company Average ' + err));
  });
}


bulk_incrementCompanySales(num) {

  const documentReference = this.afs.doc('/Rpt_CadetSalesByCompany/' + this.enteredSale.SellerCompany.toString());
  // running the transaction
  this.afs.firestore.runTransaction(t => {
    // returning the transaction function
    return t.get(documentReference.ref)
        .then(doc => {
          this.batch_SetCadetCompanyAvg(this.enteredSale.SellerCompany.toString(), doc.data().count + num);
            // read the current "value" field of the document
            const newValue = doc.data().count + num;
            // increase it by 1 atomically
            t.update(documentReference.ref, {
                count: newValue
            });
        });
}).then(res => console.log('Company Counter Updated'), err => alert('An error occurred updating Company Counter ' + err));

}// end of function

/* ========================================================================================================== */
dp_incrementTotalSales() {
  this.db.database.ref('counters').child('totalSales').transaction(d => {
    if (!d) {
      return d;
    }
    d.count += 1;
    return d;
  });
}

dp_incrementCompanySales(company) {
  console.log('Company init with ' + company);
  console.log('HIT');
  this.db.database.ref('counters').child('companySales').child(company.toString()).transaction(d => {
    if (!d) {
      return d;
    }
    d.count += 1;
    d.AvgSoldPerCadet = parseFloat((d.count / d.CadetCount).toFixed(2));
    return d;
  });
} // Update Company Counter Function End


  // Update Sales Per Cadet Counter
  dp_increment_RptCadetSales(cadet, company) {
    const cadetSalesRef = this.db.object('Rpt_CadetSalesByCadet/' + cadet.toString());
    cadetSalesRef.snapshotChanges().take(1).subscribe(x => {
      if (x.payload.exists()) {
        console.log('Exists');
        this.db.database.ref('Rpt_CadetSalesByCadet').child(cadet.toString()).transaction(d => {
          if (!d) {
            return d;
          }
          d.count += 1;
          return d;
        });
      } else {
        console.log('Create Attempt..');
        this.db.database.ref('Rpt_CadetSalesByCadet').child(cadet.toString()).transaction(d => {
          if (!d) {
            return d;
          }
          d.Company = company.toString(),
          d.Name = cadet.toString(),
          d.count += 1;
          return d;
        });
      }
      return x;
    });
  }

  // Update Sales Per Cadet Counter (BULK)
  dp_bulkIncrement_RptCadetSales(cadet, company, count) {
    const cadetSalesRef = this.db.object('Rpt_CadetSalesByCadet/' + cadet.toString());
    cadetSalesRef.snapshotChanges().take(count).subscribe(x => {
      if (x.payload.exists()) {
        console.log('Exists');
        const newVal = x.payload.val().count + 1;
        cadetSalesRef.update({count: newVal});
      } else {
        console.log('Create Attempt..');
        this.db.object('Rpt_CadetSalesByCadet/' + cadet.toString()).set({
              Company: company.toString(),
              Name: cadet.toString(),
              count: 1
          });
      }
      return x;
    });
  }


  bulkSaleTab() {
    jQuery('#buyerLast').focus();
  }



} // End of component function
