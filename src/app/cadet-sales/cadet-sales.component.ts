import { CadetSalesQuickLinkComponent } from './../cadet-sales-quick-link/cadet-sales-quick-link.component';
import { Sale } from './../models/Sale';
import { Buyer } from './../models/Buyer';
import { Cadets } from './../models/Cadets';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { first } from 'rxjs/operators';
import { ContactInformation } from '../models/ContactInformation';
import { async } from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
import { removeSummaryDuplicates } from '@angular/compiler';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-cadet-sales',
  templateUrl: './cadet-sales.component.html',
  styleUrls: ['./cadet-sales.component.css']
})
export class CadetSalesComponent implements OnInit, AfterViewInit, OnDestroy {
  id: string;
  cadetSalesCollection: AngularFirestoreCollection<Sale[]>;
  cadetTicketsSoldCollection: AngularFirestoreCollection<Sale[]>;
  cadetTotalTicketsCollection: AngularFirestoreCollection<Sale[]>;
  ticketsSold: number;
  ticketsAssigned: number;
  sales: Observable<any>;
  cadet: any;
  salesCount: Subscription;
  totalSales: Number;
  buyerFirst: String;
  buyerLast: String;
  buyerPhone: String;
  ticketNumber: string;
  // cadetName: String;
  currentCadet: String;
  cadetCompany: String;
  cadetId: String;
  editState: Boolean;
  sub: any;
  edit_BuyerFirst: string;
  edit_BuyerLast: string;
  edit_BuyerPhone: string;
  edit_TicketNumber: number;
  edit_Seller: string;
  loggedInUser: Subscription;
  currentUser: string;
  userLoggedIn: boolean;
  query: any;
  /*
  */




  constructor(private route: ActivatedRoute, private afs: AngularFirestore, private firebaseAuth: AngularFireAuth) { }


  ngAfterViewInit(){
   }

ngOnDestroy() {
  // this.salesCount.unsubscribe();

}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id + 'From sales');

    jQuery('#querySalesTB').focus();

    // Get the user information
    this.loggedInUser = this.firebaseAuth.authState.pipe(first()).subscribe(x => {
      this.currentUser = x.email;
      this.setUser(x.email);
      return x.isAnonymous;
    });

    // Get Sales for tableview
    this.cadetSalesCollection = this.afs.collection('CadetSales', ref => {
      return ref.orderBy('TicketNumber', 'asc')
                .where('Seller', '==', this.id);
    });

    this.sales = this.cadetSalesCollection.valueChanges().take(1);

    // Get total assigned Tickets
    this.cadetTicketsSoldCollection = this.afs.collection('CadetSales', ref => {
      return ref.where('Seller', '==', this.id).where('SaleComplete', '==', true);
    });

    const tickSold = this.cadetTicketsSoldCollection.valueChanges().take(1).subscribe(tx => {
      this.ticketsSold = tx.length;
      return tx.length;
    });

    // Get total of tickets assigned
    this.cadetTotalTicketsCollection = this.afs.collection('CadetSales', ref => {
      return ref.where('Seller', '==', this.id);
    });

    const tickAssigned = this.cadetTotalTicketsCollection.valueChanges().take(1).subscribe(tx => {
      this.ticketsAssigned = tx.length;
      return tx.length;
    });

    const cadetName = this.cadetSalesCollection.valueChanges().take(1).subscribe(c => {
      return c.map(x => {
        this.setCurrentCadet(x);
        return x;
      });
    });

    this.phoneMask();


    this.edit_BuyerFirst = null;
    this.edit_BuyerLast = null;
    this.edit_BuyerPhone = null;
    this.edit_TicketNumber = null;
    this.edit_Seller = null;

    this.showAllTickets();

} // end of onInit


setCurrentCadet(x) {
  // console.log('From set current cadet');
  // console.log(x.Seller);
  this.currentCadet = x.Seller;
  }



  editSale(sale) {
    this.edit_BuyerFirst = null;
    this.edit_BuyerLast = null;
    this.edit_BuyerPhone = null;
    this.edit_TicketNumber = null;
    this.edit_Seller = null;


    jQuery('#editModal').modal('show');

    this.edit_BuyerFirst = sale.BuyerFirstName;
    this.edit_BuyerLast = sale.BuyerLastName;
    this.edit_BuyerPhone = sale.BuyerPhone;
    this.edit_TicketNumber = sale.TicketNumber;
    this.edit_Seller = sale.Seller;

}

updateSale(ticket, buyerFirst, buyerLast, buyerPhone){
  const updatedSale = {
    BuyerFirstName: buyerFirst,
    BuyerLastName: buyerLast,
    BuyerPhone: buyerPhone,
    SaleModifiedDate: new Date().toISOString(),
  };
  // this.afs.collection('CadetSales').doc(ticket.toString()).set(updatedSale, {merge: true});
  const docRef = this.afs.doc('CadetSales/' + ticket.toString());
  return this.afs.firestore.runTransaction(function(transaction) {
    // This code may get re-run multiple times if there are conflicts.
    return transaction.get(docRef.ref).then(function(xDoc) {
        if (!xDoc.exists) {
            alert('An error occurred updating ticket.');
        }
        console.log('Updating Ticket : ' + ticket.toString());
        transaction.update(docRef.ref, updatedSale);
    });
    }).then(function() {
      console.log('Ticket: ' + ticket.toString() + ' updated successfully');
      ticket = null;
      buyerLast = null;
      buyerPhone = null;
      buyerFirst = null;
    }).catch(function(error) {
        alert('Transaction failed: ' + error);
        ticket = null;
        buyerLast = null;
        buyerPhone = null;
        buyerFirst = null;
    });
}



removeSale(tickNum) {
  const saleToDel = 'CadetSales/' + tickNum;
  console.log(saleToDel);
  this.afs.doc(saleToDel).delete();

  const tickSold = this.cadetTicketsSoldCollection.valueChanges().take(1).subscribe(tx => {
    this.ticketsSold = tx.length;
    return tx.length;
  });

  // Get total of tickets assigned
  this.cadetTotalTicketsCollection = this.afs.collection('CadetSales', ref => {
    return ref.where('Seller', '==', this.id);
  });

  const tickAssigned = this.cadetTotalTicketsCollection.valueChanges().take(1).subscribe(tx => {
    this.ticketsAssigned = tx.length;
    return tx.length;
  });

}


phoneMask(){
  jQuery('.myPhone')
	.keydown(function (e) {
		const key = e.which || e.charCode || e.keyCode || 0;
		const jQueryphone = jQuery(this);
    // Don't let them remove the starting '('
    if (jQueryphone.val().length === 1 && (key === 8 || key === 46)) {
			jQueryphone.val('(');
      return false;
		}
    // Reset if they highlight and type over first char.
    else if (jQueryphone.val().charAt(0) !== '(') {
			jQueryphone.val('('+String.fromCharCode(e.keyCode)+'');
		}
		// Auto-format- do not expose the mask as the user begins to type
		if (key !== 8 && key !== 9) {
			if (jQueryphone.val().length === 4) {
				jQueryphone.val(jQueryphone.val() + ')');
			}
			if (jQueryphone.val().length === 5) {
				jQueryphone.val(jQueryphone.val() + ' ');
			}
			if (jQueryphone.val().length === 9) {
				jQueryphone.val(jQueryphone.val() + '-');
			}
		}
		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 ||
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));
	})
	.bind('focus click', function () {
		const jQueryphone = jQuery(this);

		if (jQueryphone.val().length === 0) {
			jQueryphone.val('(');
		}
		else {
			var val = jQueryphone.val();
			jQueryphone.val('').val(val); // Ensure cursor remains at the end
		}
	})
	.blur(function () {
		const jQueryphone = jQuery(this);

		if (jQueryphone.val() === '(') {
			jQueryphone.val('');
		}
	});
}




    setUser(user){
      this.currentUser = user;
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    }


    showOnlySoldTickets() {
      // this.query = 'true';
      // jQuery('#ticketQuery').fadeOut();
      this.cadetSalesCollection = this.afs.collection('CadetSales', ref => {
        return ref.orderBy('TicketNumber', 'asc')
                  .where('SellerId', '==', this.id)
                  .where('SaleComplete', '==', true);
      });

      this.sales = this.cadetSalesCollection.valueChanges();

      jQuery('#ticketQuery').focus();
    }

    showOnlyOpenTickets() {
      // this.query = 'false';
      // jQuery('#ticketQuery').fadeOut();
      this.cadetSalesCollection = this.afs.collection('CadetSales', ref => {
        return ref.orderBy('TicketNumber', 'asc')
                  .where('SellerId', '==', this.id)
                  .where('SaleComplete', '==', false);
      });

      this.sales = this.cadetSalesCollection.valueChanges();

      jQuery('#ticketQuery').focus();
    }

    showAllTickets() {
      // jQuery('#ticketQuery').fadeIn();
      // this.query = '';
      // jQuery('#ticketQuery').focus();
      this.cadetSalesCollection = this.afs.collection('CadetSales', ref => {
        return ref.orderBy('TicketNumber', 'asc')
                  .where('SellerId', '==', this.id);
      });

      this.sales = this.cadetSalesCollection.valueChanges();

      jQuery('#ticketQuery').focus();
    }



} //  end of class
