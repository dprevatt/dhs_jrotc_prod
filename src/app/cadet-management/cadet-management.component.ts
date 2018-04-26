import { CadetService } from './../services/cadet.service';
import { async } from '@angular/core/testing';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ContactInformation } from '../models/ContactInformation';
import { Buyer } from '../models/Buyer';
import { Cadets } from '../models/Cadets';


@Component({
  selector: 'app-cadet-management',
  templateUrl: './cadet-management.component.html',
  styleUrls: ['./cadet-management.component.css']
})
export class CadetManagementComponent implements OnInit, OnDestroy {
  cadetCollection: AngularFirestoreCollection<Cadets>;
  cadets: Observable<Cadets[]>;
  cadetUploadFile: any;
  cadetName: String;
  cadetList: Array<any>;

  constructor(private afs: AngularFirestore, private cadetService: CadetService) { }

  ngOnInit() {
    this.cadetCollection = this.afs.collection('Cadets');
    this.cadets = this.cadetCollection.valueChanges();
    // this.cadets = this.cadetService.getCadets().subscribe(cadets => {
    //   const cadetName = cadets.Cadet;
    //   console.log(cadetName);
    //   console.log(cadets);
    //   this.cadets = cadets;
    //   this.cadetList.push(cadets);
    // });



  }

  ngOnDestroy() {

  }


  fileChanged (e) {
    this.cadetUploadFile = e.target.files[0];
    console.log(e.target.files[0]);
    // Code for reading CSV and uploading
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const fileContents = fileReader.result;
      const lines = fileContents.split('\r\n');
      let uploadedCadetCount = 0;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].split(',')[0] !== 'CadetFirstName') {
          uploadedCadetCount++;
          const col1 = lines[i].split(',')[0];
          const col2 = lines[i].split(',')[1];
          const col3 = lines[i].split(',')[2];
           console.log('Cadet: ' + col2 + ', ' + col1 + ' Company: ' + col3);
          // Actually post the data
          const postData = {
            CadetId: uuid(),
            Cadet: col2 + ', ' + col1,
            Company: col3
          };

          this.afs.collection('Cadets').doc(col2 + ', ' + col1).set(postData, {merge: true});

        } // End of if headerRow
      } // End of csv loop

    };
    fileReader.readAsText(this.cadetUploadFile);
}

removeCadet(event, cadet) {
  this.cadetService.removeCadet(cadet.Cadet);
}


} // Ending Bracket
