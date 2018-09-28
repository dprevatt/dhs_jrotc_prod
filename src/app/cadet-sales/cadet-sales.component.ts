import { CadetSalesQuickLinkComponent } from './../cadet-sales-quick-link/cadet-sales-quick-link.component';
import { Sale } from './../models/Sale';
import { Buyer } from './../models/Buyer';
import { Cadets } from './../models/Cadets';
import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class CadetSalesComponent implements OnInit, AfterViewInit {
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
  cadetName: String;
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



  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id + 'From sales');


    // Get the user information
    this.loggedInUser = this.firebaseAuth.authState.pipe(first()).subscribe(x => {
      this.currentUser = x.email;
      this.setUser(x.email);
      return x.isAnonymous;
    });

    // Get Sales for tableview
    this.cadetSalesCollection = this.afs.collection('CadetSales', ref => {
      return ref.where('SellerId', '==', this.id)
    });

    this.sales = this.cadetSalesCollection.valueChanges();

    // Get total assigned Tickets
    this.cadetTicketsSoldCollection = this.afs.collection('CadetSales', ref => {
      return ref.where('SellerId', '==', this.id).where('SaleComplete', '==', true);
    });

    const tickSold = this.cadetTicketsSoldCollection.valueChanges().subscribe(tx => {
      this.ticketsSold = tx.length;
      return tx.length;
    });

    // Get total of tickets assigned
    this.cadetTotalTicketsCollection = this.afs.collection('CadetSales', ref => {
      return ref.where('SellerId', '==', this.id);
    });

    const tickAssigned = this.cadetTotalTicketsCollection.valueChanges().subscribe(tx => {
      this.ticketsAssigned = tx.length;
      return tx.length;
    });

    const cadetName = this.cadetSalesCollection.valueChanges().subscribe(c => {
      return c.map(x => {
        this.setCurrentCadet(x);
        return x;
      })
    })

    this.phoneMask();

} // end of onInit


setCurrentCadet(x) {
  console.log('From set current cadet');
  console.log(x.Seller);
  this.currentCadet = x.Seller;
  }



  editSale(sale){
    this.edit_BuyerFirst = sale.BuyerFirstName;
    this.edit_BuyerLast = sale.BuyerLastName;
    this.edit_BuyerPhone = sale.BuyerPhone;
    this.edit_TicketNumber = sale.TicketNumber;
    this.edit_Seller = sale.Seller;
    jQuery('#editModal').modal('show');

}

updateSale(ticket){
  console.log(ticket);
  const updatedSale = {
    BuyerFirstName: this.edit_BuyerFirst,
    BuyerLastName: this.edit_BuyerLast,
    BuyerPhone: this.edit_BuyerPhone,
    TicketNumber: this.edit_TicketNumber,
    SaleComplete: true,
    SaleModifiedDate: new Date()
  };
  this.afs.collection('CadetSales').doc(ticket.toString()).set(updatedSale, {merge: true});
}


removeSale(event, tickNum) {
  const saleToDel = 'CadetSales/' + tickNum;
  console.log(saleToDel);
  this.afs.doc(saleToDel).delete();
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
      this.query = 'true';
      jQuery('#ticketQuery').fadeOut();
    }

    showOnlyOpenTickets() {
      this.query = 'false';
      jQuery('#ticketQuery').fadeOut();
    }

    showAllTickets() {
      jQuery('#ticketQuery').fadeIn();
      this.query = '';
      jQuery('#ticketQuery').focus();
    }



} //  end of class
