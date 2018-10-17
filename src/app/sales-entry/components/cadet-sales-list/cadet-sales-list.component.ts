import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Sale } from '../../../models/Sale';


@Component({
  selector: 'app-cadet-sales-list',
  templateUrl: './cadet-sales-list.component.html',
  styleUrls: ['./cadet-sales-list.component.css']
})
export class CadetSalesListComponent implements OnInit {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  allCadetSalesCollection: AngularFirestoreCollection<any[]>;
  allCadetSales: Observable<any[]>;
  saleToDelete: Sale;
  edit_BuyerFirst: string;
  edit_BuyerLast: string;
  edit_BuyerPhone: string;
  edit_TicketNumberStart: any;
  edit_TicketNumberEnd: any;
  edit_Seller: string;

  ngOnInit() {

    this.FormValidation();

    this.allCadetSalesCollection = this.afs.collection('CadetSales', ref => {
      return ref.where('SaleComplete', '==', true).orderBy('SaleCompletedDate', 'desc').limit(25);
    });

    this.allCadetSales = this.allCadetSalesCollection.valueChanges();

  }


// Sale Deletion Methods

  deleteSale(sale) {
    console.log(sale);
    this.saleToDelete = sale;
    jQuery('#deleteSaleModal').modal({
    closable  : false,
    onDeny    : function(){
      // Just close the Modal
    },
    onApprove : function() {
      console.log('Approved');
    }
  })
  .modal('show');
  }


  decrementTotalSales() {

    const query = this.afs.doc<any>('/Rpt_CadetSalesByStatus/Completed');

    const fireDoc = query.snapshotChanges().take(1).subscribe(vc => {
      const myCount = vc.payload.data().count - 1;
      const cCounter = {count: myCount};
      query.update(cCounter);
      return vc.payload.data().count;
    });

  }

  decrementCadetSales(sale) {

    const query = this.afs.doc<any>('/Rpt_CadetSalesByCadet/' + sale.Seller);

    const fireDoc = query.snapshotChanges().take(1).subscribe(vc => {
      const myCount = vc.payload.data().count - 1;
      const cCounter = {count: myCount};
      query.update(cCounter);
      return vc.payload.data().count;
    });

  }

decrementCompanySales(sale) {

  const query = this.afs.doc<any>('/Rpt_CadetSalesByCompany/' + sale.SellerCompany);

  const fireDoc = query.snapshotChanges().take(1).subscribe(vc => {
    const myCount = vc.payload.data().count - 1;
    const cCounter = {count: myCount};
    query.update(cCounter);
    return vc.payload.data().count;
  });

}


PurgeSale() {

    // Remove the sale
    const sale = this.saleToDelete;
    const saleToDel = 'CadetSales/' + sale.TicketNumber;
    this.afs.doc<Sale>(saleToDel).delete();
    // this.decrementTotalSales();
    // this.decrementCompanySales(sale);
    // this.decrementCadetSales(sale);

    this.dp_decrementTotalSales();
    this.dp_decrementCompanySales(sale.SellerCompany.toString());
    this.dp_decrement_RptCadetSales(sale.Seller.toString(), sale.SellerCompany.toString());

}


// Form Validation
FormValidation() {
  jQuery('#editForm')
  .form({
    on: 'blur',
    inline: true,
    keyboardShortcuts: false,
    fields: {
      editbuyerLast: {
        identifier  : 'edit_buyerLast',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a last name for the buyer.'
          }
        ]
      },
      editticketNumber: {
        identifier  : 'edit_ticketNumberStart',
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



// Sale Edit Methods

editSale(sale) {
  console.log(sale);
      this.edit_BuyerFirst = null;
      this.edit_BuyerLast = null;
      this.edit_BuyerPhone = null;
      this.edit_TicketNumberStart = null;
      this.edit_Seller = null;

    jQuery('#editModal').modal('show', {
      keyboardShortcuts: false
    });

    this.edit_BuyerFirst = sale.BuyerFirstName;
    this.edit_BuyerLast = sale.BuyerLastName;
    this.edit_BuyerPhone = sale.BuyerPhone;
    this.edit_TicketNumberStart = sale.TicketNumber;
    this.edit_Seller = sale.Seller;
}


vUpdateSale() {
  if (this.edit_TicketNumberEnd) {
    this.dp_bulkUpdateSales();
  } else {
    this.updateSale();
  }
}

bulkUpdateSales() {
  if (this.edit_TicketNumberEnd <= this.edit_TicketNumberStart) {
    alert('Invalid ticket range');
  }
  else {
    const batch = this.afs.firestore.batch();
    for (let t = this.edit_TicketNumberStart; t <= this.edit_TicketNumberEnd; t++) {
      const currentdocRef = this.afs.doc(`CadetSales/${t.toString()}`);
      batch.update(currentdocRef.ref, {
        BuyerFirstName: this.edit_BuyerFirst,
        BuyerLastName: this.edit_BuyerLast,
        BuyerPhone: this.edit_BuyerPhone,
        TicketNumber: t,
        SaleComplete: true,
        SaleModifiedDate: new Date().toISOString(),
        SaleCompletedDate: new Date().toISOString()
    });
  } // end of loop
      // execute our batch
      batch.commit()
      .then(res => console.log('Batch Update completed!'), err => alert(err));
  } // end of else
}


dp_bulkUpdateSales() {
  for (let x = this.edit_TicketNumberStart; x <= this.edit_TicketNumberEnd; x++) {
    this.dp_BulkSubmission(x)
  }
}

dp_BulkSubmission(tNum) {
  // Lookup Current Ticket
  const query = this.afs.collection<any>('CadetSales', ref => {
    return ref.where('TicketNumber', '==',  tNum).where('Seller', '==', this.edit_Seller).limit(1);
  });

  const fireDoc = query.valueChanges().take(1).subscribe(x => {
    if (!x[0]) {
      alert('Ticket number ' + tNum + ' is not currently assigned to ' + this.edit_Seller + '. Sale will not be submitted.');
    }
    else {
   // pErform Submission
  const docRef = this.afs.doc(`CadetSales/${tNum.toString()}`).snapshotChanges().take(1).subscribe(d => {
    console.log(d.payload.data());
    if (d.payload.data().SaleComplete === false) {
      // Update and increment Counters
      this.afs.doc(`CadetSales/${tNum.toString()}`).update({
        BuyerFirstName: this.edit_BuyerFirst,
        BuyerLastName: this.edit_BuyerLast,
        BuyerPhone: this.edit_BuyerPhone,
        TicketNumber: tNum,
        SaleComplete: true,
        SaleModifiedDate: new Date().toISOString(),
        SaleCompletedDate: new Date().toISOString()
      })
      .then(res => {
        this.dp_incrementTotalSales();
        this.dp_incrementCompanySales(d.payload.data().SellerCompany.toString());
        this.dp_increment_RptCadetSales(d.payload.data().Seller.toString(), d.payload.data().SellerCompany.toString());
        console.log('Bulk Update Successful');
        this.edit_TicketNumberEnd = '';
        return res;
      })
      .catch(err => {
        alert('Error occurred while updating. ' + err);
      });
    }// end of IF
    else if (d.payload.data().SaleComplete === true) {
      this.afs.doc(`CadetSales/${tNum.toString()}`).update({
        BuyerFirstName: this.edit_BuyerFirst,
        BuyerLastName: this.edit_BuyerLast,
        BuyerPhone: this.edit_BuyerPhone,
        TicketNumber: tNum,
        SaleModifiedDate: new Date().toISOString()
      })
      .then(res => {
        console.log('Bulk Update Successful');
        this.edit_TicketNumberEnd = '';
        return res;
      })
      .catch(err => {
        alert('Error occurred while updating. ' + err);
      })
    }
  }); // End of lookup_dp
  } // End of ELSE
 }); // End of Lookup

} // End of function


updateSale() {
  const updatedSale = {
    BuyerFirstName: this.edit_BuyerFirst,
    BuyerLastName: this.edit_BuyerLast,
    BuyerPhone: this.edit_BuyerPhone,
    TicketNumber: this.edit_TicketNumberStart,
    SaleComplete: true,
    SaleModifiedDate: new Date()
  };
  this.afs.collection('CadetSales').doc(this.edit_TicketNumberStart.toString()).set(updatedSale, {merge: true});
}


doSomething(){
  const updatedSale = {
    BuyerFirstName: this.edit_BuyerFirst,
    BuyerLastName: this.edit_BuyerLast,
    BuyerPhone: this.edit_BuyerPhone,
    TicketNumber: this.edit_TicketNumberStart,
    SaleComplete: true,
    SaleModifiedDate: new Date()
  };
  this.afs.collection('CadetSales').doc(this.edit_TicketNumberStart.toString()).set(updatedSale, {merge: true});
}



/* ================================================================================================================================ */

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

/* ========================================= Decrerement Methods =================================================== */

  // Decrement Sales Per Cadet Counter
  dp_decrement_RptCadetSales(cadet, company) {
        this.db.database.ref('Rpt_CadetSalesByCadet').child(cadet.toString()).transaction(d => {
          if (!d) {
            return d;
          }
          d.count -= 1;
          console.log('Done..Deleted from cadet');
          return d;
        });
  }

  // Decrement Sales Per Company Counter
  dp_decrementCompanySales(company) {
    this.db.database.ref('counters').child('companySales').child(company.toString()).transaction(d => {
      if (!d) {
        return d;
      }
      d.count -= 1;
      d.AvgSoldPerCadet = parseFloat((d.count / d.CadetCount).toFixed(2));
      console.log('Done..Deleted from company');
      return d;
    });
  }

  // Decrement Total Sales
  dp_decrementTotalSales() {
    this.db.database.ref('counters').child('totalSales').transaction(d => {
      if (!d) {
        return d;
      }
      d.count -= 1;
      console.log('Done..Deleted from total');
      return d;
    });
  }
/* ========================================= Decrerement Methods =================================================== */

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



} // end of component
