
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-pickup-counter-display',
  templateUrl: './pickup-counter-display.component.html',
  styleUrls: ['./pickup-counter-display.component.css']
})
export class PickupCounterDisplayComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  totalPickedUpCount: Observable<any>;
  totalSalesCount: Observable<any>;

  ngOnInit() {
    this.getPlatesToBePickedUp();
    this.getTotalSalesCount();
  }

  getPlatesToBePickedUp() {
    const totalPickedUpCounterRef = '/counters/PlatesPickedUp/count';
    this.totalPickedUpCount = this.db.object<any>(totalPickedUpCounterRef).valueChanges();
    return this.totalPickedUpCount;
  }

  getTotalSalesCount() {
    const totalSalesCounterRef = '/counters/totalSales/count';
    this.totalSalesCount = this.db.object<any>(totalSalesCounterRef).valueChanges();
    return this.totalSalesCount;
  }

}
