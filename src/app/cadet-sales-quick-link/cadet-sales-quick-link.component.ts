import { CadetService } from './../services/cadet.service';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { first } from 'rxjs/operators';
import { ContactInformation } from '../models/ContactInformation';
import { Buyer } from '../models/Buyer';
import { Cadets } from '../models/Cadets';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadet-sales-quick-link',
  templateUrl: './cadet-sales-quick-link.component.html',
  styleUrls: ['./cadet-sales-quick-link.component.css']
})
export class CadetSalesQuickLinkComponent implements OnInit {

  cadetCollection: AngularFirestoreCollection<Cadets>;
  cadets: Observable<Cadets[]>;



  // tslint:disable-next-line:max-line-length
  constructor(private afs: AngularFirestore, private cadetService: CadetService, private route: ActivatedRoute, private router: Router) { }



  ngOnInit() {
    this.cadetCollection = this.afs.collection('Cadets');
    this.cadets = this.cadetCollection.valueChanges();
    jQuery('#dp').dropdown();
    console.log('init from quick');
  }

  routeToSales(cadetId){
    this.router.navigate(['CadetSales', cadetId]);
  }


  onKeydown(){
    const cadetId = jQuery('#dp').dropdown('get value');
    this.router.navigate(['CadetSales', cadetId]);
  }




}
