import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { TableExport } from 'tableexport';

@Component({
  selector: 'app-platinum-awards',
  templateUrl: './platinum-awards.component.html',
  styleUrls: ['./platinum-awards.component.css']
})
export class PlatinumAwardsComponent implements OnInit, OnDestroy {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  platinumSales: Array<any>;
  platinumAward: string;
  awardsPlatinumSubscription: Subscription;
  tableData: any;

  ngOnInit() {
    this.getGoldSales();
    this.getAwards();
  }

  ngOnDestroy() {
    this.awardsPlatinumSubscription.unsubscribe();
  }

  getGoldSales() {
    const cadetSalesRef = this.db.list<any>('/Rpt_CadetSalesByCadet'
    , ref => {
      return ref.orderByChild('count');
    });
    cadetSalesRef.valueChanges().subscribe(x => {
      const platinumCadets = [];
      for (let z = 0; z < x.length; z++) {
        if (x[z].count >= 50) {
          platinumCadets.push(x[z]);
        }
      }
      console.log(platinumCadets);
      this.platinumSales = platinumCadets.reverse();
    });
  }

  getAwards() {
    this.awardsPlatinumSubscription = this.afs.doc<any>('/Rpt_SalesAward/Awards').valueChanges().subscribe(aw => {
      this.platinumAward = aw.PlatinumAward;
    });

}



tableExportInit() {
  // tslint:disable-next-line:no-unused-expression
    this.tableData =  new TableExport(jQuery('#mytable'), {
    headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
    footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
    formats: ['xlsx'],            // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
    // tslint:disable-next-line:max-line-length
    filename: 'Platinum-Awards',                             // (id, String), filename for the downloaded file, (default: 'id')
    bootstrap: true,                           // (Boolean), style buttons using bootstrap, (default: true)
    // tslint:disable-next-line:max-line-length
    exportButtons: false,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)                        // (top, bottom), position of the caption element relative to table, (default: 'bottom')
    ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
    ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
    trimWhitespace: false
  }).reset();
}

export() {
    this.tableExportInit();
    console.log('initialized..');
    const exportData = this.tableData.getExportData()['mytable']['xlsx'];
    console.log('exportData Recieved..');
      //                   // data          // mime              // name              // extension
      this.tableData.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
      console.log('exported..');
  }





}
