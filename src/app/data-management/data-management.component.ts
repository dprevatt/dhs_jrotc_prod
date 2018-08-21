import { Observable } from 'rxjs/Observable';
import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { TableExport } from 'tableexport';
import { Subscription } from '../../../node_modules/rxjs/Subscription';


@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.css']
})
export class DataManagementComponent implements OnInit, AfterViewChecked, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  constructor(private afs: AngularFirestore,  private db: AngularFireDatabase) { }

cadetSales: Subscription;
startTicketParam: number;
endTicketParam: number;
showResults: boolean;
dataBucket: Array<any>;
myData: Array<any>;
tableData: any;
showSpinner: boolean;
showFullTextSearch: boolean;
query: any;


  ngOnInit() {
    this.showFullTextSearch = false;

  } // End of OnInit

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {


  }


clickMe() {
  const query = this.afs.collection('CadetSales', ref => {
    return ref.orderBy('TicketNumber', 'asc')
              .where('TicketNumber', '>=', this.startTicketParam)
              .where('TicketNumber', '<=', this.endTicketParam);
  });


this.dataBucket = [];
this.cadetSales = query.snapshotChanges().take(1).subscribe(vc => {
  console.log('Check');
  console.log(vc)
  this.tableExportInit();
  for (let d = 0; d < vc.length; d++) {
    this.dataBucket.push(vc[d].payload.doc.data());
  }
});

this.myData = this.dataBucket;
this.showResults = true;




}

tableExportInit() {
  // tslint:disable-next-line:no-unused-expression
this.tableData =  new TableExport(jQuery('#mytable'), {
    headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
    footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
    formats: ['xlsx'],            // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
    // tslint:disable-next-line:max-line-length
    filename: 'Dhn-Jrotc_Tickets',                             // (id, String), filename for the downloaded file, (default: 'id')
    bootstrap: true,                           // (Boolean), style buttons using bootstrap, (default: true)
    // tslint:disable-next-line:max-line-length
    exportButtons: false,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)                        // (top, bottom), position of the caption element relative to table, (default: 'bottom')
    ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
    ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
    trimWhitespace: false
  }).reset();
}


showAllTickets() {
  const query = this.afs.collection('CadetSales', ref => {
    return ref.orderBy('TicketNumber', 'asc');
  });


this.dataBucket = [];
this.cadetSales = query.snapshotChanges().take(1).subscribe(vc => {
  console.log('Check');
  console.log(vc)
  this.tableExportInit();
  for (let d = 0; d < vc.length; d++) {
    this.dataBucket.push(vc[d].payload.doc.data());
  }
});

this.myData = this.dataBucket;
this.showResults = true;
this.showFullTextSearch = true;

}

export() {
this.showSpinner = true;
  this.tableExportInit();
  console.log('initialized..');
  const exportData = this.tableData.getExportData()['mytable']['xlsx'];
  console.log('exportData Recieved..');
    //                   // data          // mime              // name              // extension
    this.tableData.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
    console.log('exported..');
    this.showSpinner = false;

}

}
