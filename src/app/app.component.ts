import { Sale } from './models/Sale';
import { MessagingService } from './messaging.service';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule } from '@angular/forms';
import { async } from '@angular/core/testing';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ContactInformation } from './models/ContactInformation';
import { Buyer } from './models/Buyer';
import { Cadets } from './models/Cadets';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { jsonEval } from '../../node_modules/@firebase/util';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'app';

  cadetCollection: AngularFirestoreCollection<Cadets>;
  cadetTicketsSoldCollection: AngularFirestoreCollection<Sale[]>;
  cadets: Observable<Cadets[]>;
  singleCadetSales: Observable<Cadets>;
  userEmail: string;
  userPassword: string;
  loggedInUser: Subscription;
  currentUser: string;
  userLoggedIn: boolean;
  atRoot: boolean;
  url: string;
  message;
  messaging;
  cadetCount: number;

  // tslint:disable-next-line:max-line-length
  constructor(private afs: AngularFirestore, private firebaseAuth: AngularFireAuth, public route: ActivatedRoute, private router: Router, private msgService: MessagingService, private db: AngularFireDatabase) {
    // this.messaging = firebase.messaging();
  }

ngOnDestroy() {
  this.atRoot = false;
}

  ngOnInit() {
    // this.msgService.getPermission();
    // this.msgService.receiveMessage();
    // this.message = this.msgService.currentMessage;
    this.atRoot = true;
    jQuery('.dropdown').dropdown();


    // Get the user information
    this.loggedInUser = this.firebaseAuth.authState.pipe(first()).subscribe(x => {
      this.currentUser = x.email;
      this.setUser(x.email);
      return x.isAnonymous;
    });



    jQuery('.ui.menu')
    .on('click', '.item', function() {
      if(!jQuery(this).hasClass('dropdown')) {
        jQuery(this)
          .addClass('active')
          .siblings('.item')
            .removeClass('active');
      }
    });

      // Function for sticky NavBar

      window.onscroll = function() {myFunction()};

      const navbar = document.getElementById('navTopBar');
      const sticky = navbar.offsetTop;

      function myFunction() {
        if (window.pageYOffset >= sticky) {
          navbar.classList.add('sticky');
        } else {
          navbar.classList.remove('sticky');
        }
      }


//<-- Recount Function //-->
    jQuery('#progressModal').modal('show');
    const companies = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Bn Staff', 'SGM', 'Other'];
    for (let i = 0; i < companies.length; i ++) {
      this.verifyCompanyCounter(companies[i]);
    }

    // Set CadetCount
    this.afs.collection('Cadets').valueChanges().first().subscribe(cc => {
      console.log('CadetCount ' + cc.length);
      this.cadetCount = cc.length;
    });

    this.verifyCadetCounters();
    //this.verifyTotalSalesCounter();



  } // end of OnInit


  // setTotalSales() {
  //   let d = this.afs.collection('CadetSales', ref => ref.where('SaleComplete', '==', true)).valueChanges().first().subscribe(x => {
  //     console.log(x.length);
  //     this.dp_incrementTotalSales(x.length);
  //   });
  // }


  ngAfterViewInit() {

  }

   //---------------------------------> Recount Functions <---------------------------------- //
   verifyCadetCounters() {
     let z = 0;
    const cadetCounterCol = this.afs.collection<any>('Cadets').snapshotChanges().take(1).subscribe(c => {
      c.forEach(cadet => {
        // console.log(cadet.payload.doc.data().Cadet);
        const cadetName = cadet.payload.doc.data().Cadet;
        this.afs.collection('CadetSales', refz => {
          return refz.where('Seller', '==', cadetName).where('SaleComplete', '==', true);
        }).valueChanges().first().subscribe(xd => {
          z++;
          this.dp_increment_RptCadetSales(cadetName, xd.length);
          if (z === this.cadetCount)
          {
            this.hideModal();
          }
        });
      });
    });
  }

    // Update Sales Per Cadet Counter
    dp_increment_RptCadetSales(cadet, count) {
      const cadetSalesRef = this.db.object('Rpt_CadetSalesByCadet/' + cadet.toString());
      cadetSalesRef.valueChanges().first().subscribe(a => {
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

    hideModal() {
      jQuery('#progressModal').modal('hide');
    }

    verifyTotalSalesCounter() {
      const cadetSalesCol = this.afs.collection('CadetSales', refv => {
        return refv.where('SaleComplete', '==', true);
      });
      cadetSalesCol.valueChanges().take(1).subscribe(b => {
        // Set The counter
        console.log('TotalCount: ' + b.length);
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
      }).valueChanges().first().subscribe(v => {
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

    //---------------------------------> Recount Functions <---------------------------------- //

  setUser(user){
    this.currentUser = user;
    if (user) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }


  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        location.reload();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
      console.log(this.userEmail + ' has been signed out!');
      location.reload();
  }

  displaySignIn(){
    jQuery('#loginModal').modal('show');
  }


  navigateToAlphaReports() {
    this.router.navigate(['./Alpha-Reporting']);
  }

  navigateToBravoReports() {
    this.router.navigate(['./Bravo-Reporting']);
  }

  navigateToCharlieReports() {
    this.router.navigate(['./Charlie-Reporting']);
  }

  navigateToDeltaReports() {
    this.router.navigate(['./Delta-Reporting']);
  }

  navigateToEchoReports() {
    this.router.navigate(['./Echo-Reporting']);
  }

  navigateToCadetAwards() {
    this.router.navigate(['./Cadet-Awards']);
  }

  navigateToBronzeAwards() {
    this.router.navigate(['./Bronze-Awards']);
  }

  navigateToSilverAwards() {
    this.router.navigate(['./Silver-Awards']);
  }

  navigateToGoldAwards() {
    this.router.navigate(['./Gold-Awards']);
  }

  navigateToPlatinumAwards() {
    this.router.navigate(['./Platinum-Awards']);
  }

  navigateToLessThanFive() {
    this.router.navigate(['./Less-Than-Five']);
  }


} // end of func
