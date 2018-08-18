import { CadetSalesQuickLinkComponent } from './../cadet-sales-quick-link/cadet-sales-quick-link.component';
import { Sale } from './../models/Sale';
import { Buyer } from './../models/Buyer';
import { Cadets } from './../models/Cadets';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { ContactInformation } from '../models/ContactInformation';
import { async } from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
import { removeSummaryDuplicates } from '@angular/compiler';
import { Subscription } from 'rxjs/Subscription';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-sales-entry',
  templateUrl: './sales-entry.component.html',
  styleUrls: ['./sales-entry.component.css']
})
export class SalesEntryComponent implements OnInit, OnDestroy {

  id: string;
  cadetCollection: AngularFirestoreCollection<Cadets>;
  cadets: Subscription;
  cadet: any;
  currentSale: any;
  salesCount: Subscription;
  totalSales: number;
  saleDoc: Observable<any>;
  salesCollection: AngularFirestoreCollection<any[]>;
  allCadetSalesCollection: AngularFirestoreCollection<any[]>;
  allCadetSales: Observable<any[]>;
  buyerFirst: String;
  currentSeller: Observable<any>;
  buyerLast: String;
  buyerPhone: String;
  ticketNumber: string;
  cadetName: String;
  currentCadet: String;
  cadetCompany: String;
  cadetId: String;
  sub: any;
  sale_buyerLast: String;
  sale_buyerFirst: String;
  sale_ticketNumberStart: any;
  sale_ticketNumberEnd: any;
  sale_buyerPhone?: String;
  showValidationError: Boolean;
  editState: boolean;
  itemToEdit: Sale;
  edit_BuyerFirst: string;
  edit_BuyerLast: string;
  edit_BuyerPhone: string;
  edit_TicketNumber: number;
  edit_Seller: string;
  totalSoldCount: any;
  cadetSaleCounter: number;
  message;
  dpizzle: Subscription;
  cadetCounterDoc: AngularFirestoreDocument<any>;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore, private msgService: MessagingService) { }


ngOnDestroy(){

}


  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

  closeNotification() {
    console.log('Attempted to close!');
    jQuery('#errNotification').transition('fade');
  }

//   addSale(name) {
//     console.log(name);
//     console.log('Sale Added for ' + this.sale_buyerLast + ', ' + this.sale_buyerFirst);

//     const newSale =  {
//         BuyerFirstName: this.toTitleCase(this.sale_buyerFirst),
//         BuyerLastName: this.toTitleCase(this.sale_buyerLast),
//         BuyerPhone: this.sale_buyerPhone !== undefined ? this.sale_buyerPhone : '',
//         Seller: this.currentCadet,
//         TicketNumber: this.sale_ticketNumberStart,
//         SaleComplete: true,
//         SaleCompletedDate: new Date()
//     };
  
//       console.log(newSale);



//     this.afs.collection('CadetSales').doc(this.sale_ticketNumberStart.toString()).set(newSale, {merge: true});
//     this.incrementCounters(name);

//     this.sale_buyerFirst = '';
//     this.sale_buyerLast = '';
//     this.sale_buyerPhone = '';
//     this.sale_ticketNumberStart = '';
//     jQuery('#ticketNumberStart').focus();

// }

// removeSale(event, tickNum) {
//   const saleToDel = 'CadetSales/' + tickNum;
//   console.log(saleToDel);
//   this.afs.doc(saleToDel).delete();
//   this.totalSoldCount = (this.totalSoldCount - 1);
// }

// submitBulkOrder(name){
//   console.log('bulk submitted for ' + name);
//   if (this.sale_ticketNumberEnd <= this.sale_ticketNumberStart){
//     alert('Invalid ticket range');
//   }
//   else{
//     for (let t = this.sale_ticketNumberStart; t <= this.sale_ticketNumberEnd; t++){
//       console.log(this.sale_ticketNumberStart + ' thru ' + this.sale_ticketNumberEnd);

//       const newBulkSale =  {
//         // CadetId: this.cadetId,
//       // Cadet: this.cadetName,
//       // Company: this.cadetCompany,
//         BuyerFirstName: this.toTitleCase(this.sale_buyerFirst),
//         BuyerLastName: this.toTitleCase(this.sale_buyerLast),
//         BuyerPhone: this.sale_buyerPhone !== undefined ? this.sale_buyerPhone : '',
//         TicketNumber: t,
//         Seller: this.currentCadet,
//         SaleComplete: true,
//         SaleCompletedDate: new Date()
//     };
      
//       this.afs.collection('CadetSales').doc(t.toString()).set(newBulkSale, {merge: true});
//       this.totalSoldCount = this.totalSoldCount + 1;

//     } // End Of Loop
//     // Clear the Modal Form
//       this.sale_buyerLast = '';
//       this.sale_buyerFirst = '';
//       this.sale_buyerPhone = '';
//       this.sale_ticketNumberStart = '';
//       this.sale_ticketNumberEnd = '';
//       jQuery('#ticketNumberStart').focus();
//   }
// }

// CreateSale(name) {
//   this.validateSale();
//   if (this.showValidationError !== true) {
//       if (!this.sale_ticketNumberEnd) {
//         this.addSale(name);
//     } else {
//         this.submitBulkOrder(name);
//     }
//   }
// }


// validateSale(){
//   if (!this.sale_buyerFirst) {
//     this.showValidationError = true;
//     jQuery('#buyerFirst').focus();
//   } else if (!this.sale_ticketNumberStart) {
//     this.showValidationError = true;
//     jQuery('#ticketNumberStart').focus();
//   } else {
//     this.showValidationError = false;
//   }
// }

// dismissError() {
//   this.showValidationError = false;
//   if (!this.sale_buyerFirst) {
//     this.showValidationError = true;
//     jQuery('.message .close').closest('.message').transition('fade');
//     jQuery('#buyerFirst').focus();
//   } else if (!this.sale_ticketNumberStart) {
//     this.showValidationError = true;
//     jQuery('.message .close').closest('.message').transition('fade');
//     jQuery('#ticketNumberStart').focus();
//   } else {
//     this.showValidationError = false;
//   }
// }


// setCurrentCadet(x) {
//   console.log('From set current cadet');
//   console.log(x.Seller);
//   this.currentCadet = x.Seller;

// }

// onBlur(tickNum){
  
//   if (this.sale_ticketNumberStart !== '')
//   {
//     this.saleDoc = this.afs.doc('CadetSales/' + tickNum).valueChanges();
//     const currentSeller = this.afs.collection('CadetSales').doc(tickNum.toString()).valueChanges().subscribe(x => {
//        if (x != null){
//          this.setCurrentCadet(x)
//        } else if (this.sale_ticketNumberStart !== '') {
//          alert('Invalid Ticket! The ticket number provided has not been assigned.')
//          this.sale_ticketNumberStart = '';
//          jQuery('#ticketNumberStart').focus();
//        }
//      });
//   }
// }


// editSale(sale){
//     this.edit_BuyerFirst = this.toTitleCase(sale.BuyerFirstName);
//     this.edit_BuyerLast = this.toTitleCase(sale.BuyerLastName);
//     this.edit_BuyerPhone = sale.BuyerPhone;
//     this.edit_TicketNumber = sale.TicketNumber;
//     this.edit_Seller = sale.Seller;
//     jQuery('#editModal').modal('show');
  
// }

// updateSale(ticket){
//   console.log(ticket);
//   const updatedSale = {
//     BuyerFirstName: this.toTitleCase(this.edit_BuyerFirst),
//     BuyerLastName: this.toTitleCase(this.edit_BuyerLast),
//     BuyerPhone: this.edit_BuyerPhone,
//     TicketNumber: this.edit_TicketNumber,
//     SaleComplete: true,
//     SaleModifiedDate: new Date()
//   };
//   this.afs.collection('CadetSales').doc(ticket.toString()).set(updatedSale, {merge: true});
// }


// phoneMask(){
//   jQuery('.myPhone')
// 	.keydown(function (e) {
// 		const key = e.which || e.charCode || e.keyCode || 0;
// 		const jQueryphone = jQuery(this);
//     // Don't let them remove the starting '('
//     if (jQueryphone.val().length === 1 && (key === 8 || key === 46)) {
// 			jQueryphone.val('('); 
//       return false;
// 		} 
//     // Reset if they highlight and type over first char.
//     else if (jQueryphone.val().charAt(0) !== '(') {
// 			jQueryphone.val('('+String.fromCharCode(e.keyCode)+''); 
// 		}
// 		// Auto-format- do not expose the mask as the user begins to type
// 		if (key !== 8 && key !== 9) {
// 			if (jQueryphone.val().length === 4) {
// 				jQueryphone.val(jQueryphone.val() + ')');
// 			}
// 			if (jQueryphone.val().length === 5) {
// 				jQueryphone.val(jQueryphone.val() + ' ');
// 			}			
// 			if (jQueryphone.val().length === 9) {
// 				jQueryphone.val(jQueryphone.val() + '-');
// 			}
// 		}
// 		// Allow numeric (and tab, backspace, delete) keys only
// 		return (key == 8 || 
// 				key == 9 ||
// 				key == 46 ||
// 				(key >= 48 && key <= 57) ||
// 				(key >= 96 && key <= 105));	
// 	})
// 	.bind('focus click', function () {
// 		const jQueryphone = jQuery(this);
		
// 		if (jQueryphone.val().length === 0) {
// 			jQueryphone.val('(');
// 		}
// 		else {
// 			var val = jQueryphone.val();
// 			jQueryphone.val('').val(val); // Ensure cursor remains at the end
// 		}
// 	})
// 	.blur(function () {
// 		const jQueryphone = jQuery(this);
		
// 		if (jQueryphone.val() === '(') {
// 			jQueryphone.val('');
// 		}
// 	});
// }


// toTitleCase(str) {
//     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
// }


// setTotalSales(sCount){
//   this.totalSales = sCount;
// }

// increaseTotalSales(){
//   this.totalSales = this.totalSales + 1;
// }

// decreaseTotalSales(){
//   this.totalSales = this.totalSales - 1;
// }


// // Build Reporting Function
// incrementCounters(name) {
//   this.totalSoldCount = (this.totalSoldCount + 1);
//   this.cadetCounterDoc = this.afs.doc<any>('/Rpt_CadetSalesByCadet/' + name);

//     this.dpizzle = this.cadetCounterDoc.valueChanges().subscribe(vx => {
//       this.setProperty(vx.count, name);
//       return vx.count;
//     });
  



//   // 

// }

// getCadetCounter(x){
//   if (x){
//     this.cadetSaleCounter = x.count;
//   }
//   else{
//     this.cadetSaleCounter = 0;
//   }
// }

// setProperty(val, name){
//     this.cadetSaleCounter = val;
//     console.log(this.cadetSaleCounter);
//     var cCounter = (this.cadetSaleCounter + 1);
//     console.log(cCounter);
//     this.afs.doc('/Rpt_CadetSalesByCadet/' + name).set({count: cCounter}, {merge: true});
//   this.dpizzle.unsubscribe();
// }


// docExists(datadoc){
//   const data = datadoc.snapshotChanges().map(action => {
//     if (action.payload.exists === true) {
//         return true;
//     } else {
//       return false;
//   }
// });
// }

} // End of Code
