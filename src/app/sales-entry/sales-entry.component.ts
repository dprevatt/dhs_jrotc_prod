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
import { AngularFireDatabase } from 'angularfire2/database';
declare let ga: Function;
import {Router, NavigationEnd} from '@angular/router';

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
  // cadetName: String;
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

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private afs: AngularFirestore, private msgService: MessagingService, private db: AngularFireDatabase, public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
   }


ngOnDestroy(){

}


  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;



    const companies = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Bn Staff', 'SGM', 'Other'];
    for (let i = 0; i < companies.length; i ++) {
      this.verifyCompanyCounter(companies[i]);
    }

    this.verifyCadetCounters();
    this.verifyTotalSalesCounter();

  }

  closeNotification() {
    console.log('Attempted to close!');
    jQuery('#errNotification').transition('fade');
  }


  verifyCadetCounters() {
    const cadetCounterCol = this.afs.collection<any>('Cadets').snapshotChanges().take(1).subscribe(c => {
      c.forEach(cadet => {
        // console.log(cadet.payload.doc.data().Cadet);
        const cadetName = cadet.payload.doc.data().Cadet;
        this.afs.collection('CadetSales', refz => {
          return refz.where('Seller', '==', cadetName).where('SaleComplete', '==', true);
        }).valueChanges().take(1).subscribe(xd => {
          this.dp_increment_RptCadetSales(cadetName, xd.length);
        });
      });
    });
  }

    // Update Sales Per Cadet Counter
    dp_increment_RptCadetSales(cadet, count) {
      const cadetSalesRef = this.db.object('Rpt_CadetSalesByCadet/' + cadet.toString());
      cadetSalesRef.snapshotChanges().take(1).subscribe(a => {
          this.db.database.ref('Rpt_CadetSalesByCadet').child(cadet.toString()).transaction(dx => {
            if (!dx) {
              return dx;
            }
            console.log('Setting CadetSaleCounter: ' + cadet + ' to: ' + count);
            dx.count = count;
            return dx;
          });
        return a;
      });
    }


    verifyTotalSalesCounter() {
      const cadetSalesCol = this.afs.collection('CadetSales', refv => {
        return refv.where('SaleComplete', '==', true);
      });
      cadetSalesCol.valueChanges().take(1).subscribe(b => {
        // Set The counter
        this.dp_incrementTotalSales(b.length);
      });
    }

    dp_incrementTotalSales(count) {
      const counterRef = this.db.database.ref('counters').child('totalSales');
      counterRef.transaction(dv => {
        if (!dv) {
          return dv;
        }
        console.log('Setting total sales counter to ' + count);
        dv.count = count;
        return dv;
      });
    }


    // Verify Campany Counters
    verifyCompanyCounter(company) {
      this.afs.collection('CadetSales', refx => {
        return refx.where('SellerCompany', '==', company).where('SaleComplete', '==', true);
      }).valueChanges().take(1).subscribe(v => {
        // Set the count
        this.dp_incrementCompanySales(company, v.length);
      });
    }


    dp_incrementCompanySales(company, count) {
      this.db.database.ref('counters').child('companySales').child(company.toString()).transaction(dt => {
        if (!dt) {
          return dt;
        }
        dt.count = count;
        dt.AvgSoldPerCadet = parseFloat((count / dt.CadetCount).toFixed(2));
        console.log('Setting CompanySalesCounter for ' + company + ' to ' + count);
        return dt;
      });
    }


} // End of Code
