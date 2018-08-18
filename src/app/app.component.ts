import { MessagingService } from './messaging.service';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule } from '@angular/forms';
import { async } from '@angular/core/testing';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  cadetCollection: AngularFirestoreCollection<Cadets>;
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

  // tslint:disable-next-line:max-line-length
  constructor(private afs: AngularFirestore, private firebaseAuth: AngularFireAuth, public route: ActivatedRoute, private router: Router, private msgService: MessagingService) { 
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

      

      // jQuery('.ui.menu a.item').on('click', function() {
      //   jQuery(this).addClass('active');
      // });




    //console.log(this.route.events.subscribe((url: any) => console.log(url)));

  } // end of OnInit


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


} // end of func
