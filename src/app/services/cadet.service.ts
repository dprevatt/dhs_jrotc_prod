import { Cadets } from './../models/Cadets';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { ContactInformation } from '../models/ContactInformation';
import { Buyer } from '../models/Buyer';

@Injectable()
export class CadetService {
  cadetCollection: AngularFirestoreCollection<Cadets[]>;
  cadets: Observable<Cadets[]>;
  singleCadet: Observable<Cadets>;
  cadetDoc: AngularFirestoreDocument<Cadets>;
  query: AngularFirestoreCollection<Cadets[]>;
  queryResult: Observable<String[]>;
  docToDelete: AngularFirestoreDocument<Cadets>;
  docIdToDelete: String;

  constructor(private afs: AngularFirestore) { 
    // this.cadets = this.afs.collection('Cadets').valueChanges();
    this.cadetCollection = this.afs.collection('Cadets', ref => ref.orderBy('Company', 'asc'));
    this.cadets = this.cadetCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Cadets;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getCadets(){
    return this.cadets;
  }

  addCadet(newCadet: any) {
    this.cadetCollection.add(newCadet);
  }

  removeCadet(id) {
    const docToDel = 'Cadets/' + id
    console.log(docToDel);
    this.cadetDoc = this.afs.doc(docToDel);
    this.cadetDoc.delete();

  }

  lookupDocumentId(cdoc: Cadets) {
    console.log(cdoc.CadetId);
    this.query = this.afs.collection('Cadets', ref => ref.where('CadetId', '==', cdoc.CadetId));
    this.queryResult = this.query.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Cadets;
        data.id = a.payload.doc.id;
        this.docIdToDelete = a.payload.doc.id;
        return data.id;
      });
    });
    // console.log(this.queryResult);
    this.queryResult.subscribe(x => {
      this.docIdToDelete = x[0];
    });
    return this.docIdToDelete;


  }

}
