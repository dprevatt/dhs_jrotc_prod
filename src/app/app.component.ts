import { async } from '@angular/core/testing';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ContactInformation } from './models/ContactInformation';
import { Buyer } from './models/Buyer';
import { Cadets } from './models/Cadets';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  cadetCollection: AngularFirestoreCollection<Cadets>;
  cadets: Observable<Cadets[]>;
  singleCadetSales: Observable<Cadets>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    // console.log('new uid: ', uuid());
    // this.cadetCollection = this.afs.collection('Cadets');

    // this.singleCadetSales = this.afs.collection('Cadets', ref => ref.where('CadetId',
    // '==', '626f0dff-32e7-47eb-9da7-cef3fede2c17').limit(1)).valueChanges().flatMap(result => result).map(x => x.Sales);
    // Example of Where
    // this.cadetCollection = this.afs.collection('Cadets', ref => {
    //    return ref.orderBy('Sales', '>=', 7)
   // });
    // this.cadets = this.cadetCollection.valueChanges();

    // racesCollection.snapshotChanges().map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data() as Race;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });

    // console.log(this.cadets);
    // console.log(this.singleCadetSales);
  }

}
