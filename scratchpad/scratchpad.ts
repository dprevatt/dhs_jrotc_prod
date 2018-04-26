// import { async } from '@angular/core/testing';
// import { Component, OnInit } from '@angular/core';
// import { NgModel } from '@angular/forms';
// import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
// import { v4 as uuid } from 'uuid';
// import { JsonPipe } from '@angular/common';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/mergeMap';
// import { ContactInformation } from '../models/ContactInformation';
// import { Buyer } from '../models/Buyer';
// import { Cadets } from '../models/Cadets';

// @Component({
//   selector: 'app-cadet-enrollment',
//   templateUrl: './cadet-enrollment.component.html',
//   styleUrls: ['./cadet-enrollment.component.css']
// })
// export class CadetEnrollmentComponent implements OnInit {
//   title = 'Cadet Enrollment';
//   // company = '';
//   // CadetName: string;
//   // cadetUploadFile: any;
//   // cadet: Observable<Cadets>;


//   // cadetCollection: AngularFirestoreCollection<Cadets>;

//   constructor(private afs: AngularFirestore) { }

//   ngOnInit() {
//     console.log('Cadet-Enrollment NG-Init Ran!');
//     // jQuery('.ui.radio.checkbox').checkbox();
//     // this.cadetCollection = this.afs.collection('Cadets'); // a ref to the todos collection
//   }

// // postData: void () {
// //   const postData = {
// //     CadetId: uuid(),
// //     Cadet: 'Prevatt-Dustin'; 
// //     Company: 'Alpha'
// //     Sales: []
// //   };
// //   this.cadetCollection.add(postData);
// // }

// fileChanged: void (e) {
//     this.cadetUploadFile = e.target.files[0];
// }


// uploadCadets: void () {
//   const fileReader = new FileReader();
//     fileReader.onload = (e) => {
//       const fileContents = fileReader.result;
//       const lines = fileContents.split('\r\n');
//       let uploadedCadetCount = 0;
//       for (let i = 1; i < lines.length; i++) {
//         if (lines[i].split(',')[0] !== 'CadetFirstName') {
//           uploadedCadetCount++;
//           const col1 = lines[i].split(',')[0];
//           const col2 = lines[i].split(',')[1];
//           const col3 = lines[i].split(',')[2];
//            console.log('Cadet: ' + col2 + ', ' + col1 + ' Company: ' + col3);
//           // Actually post the data
//           const postData = {
//             CadetId: uuid(),
//             Cadet: col2 + ', ' + col1; 
//             Company: col3
//             Sales: []
//           };

//           this.afs.collection('Cadets').doc(col2 + ', ' + col1).set(postData, {merge: true});
//         } // End of if headerRow
//       } // End of csv loop
//       alert(uploadedCadetCount + ' Cadets have been enrolled successfully.');
//     };
//     fileReader.readAsText(this.cadetUploadFile);
// }


//   setCompany: void (x) {
//     this.company = x;
//   }


  //   function simpleStringify (object){
  //     var simpleObject = {};
  //     for (var prop in object ){
  //         if (!object.hasOwnProperty(prop)){
  //             continue;
  //         }
  //         if (typeof(object[prop]) == 'object'){
  //             continue;
  //         }
  //         if (typeof(object[prop]) == 'function'){
  //             continue;
  //         }
  //         simpleObject[prop] = object[prop];
  //     }
  //     return JSON.stringify(simpleObject); // returns cleaned up JSON
  // };

  //   console.log(simpleStringify(this.cadets))


// }
