import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-plate-pickup-counter',
  templateUrl: './plate-pickup-counter.component.html',
  styleUrls: ['./plate-pickup-counter.component.css']
})
export class PlatePickupCounterComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }
  totalPickedUpCount: Observable<any>;

  ngOnInit() {
    console.log('Counter Initialized..');
    this.getTotalPickedUpCount();
  }

  getTotalPickedUpCount() {
    const totalPickedUpCounterRef = '/counters/PlatesPickedUp/count';
    this.totalPickedUpCount = this.db.object<any>(totalPickedUpCounterRef).valueChanges();
    return this.totalPickedUpCount;
  }


}
