import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
declare let ga: Function;
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-plate-pickup-counter',
  templateUrl: './plate-pickup-counter.component.html',
  styleUrls: ['./plate-pickup-counter.component.css']
})
export class PlatePickupCounterComponent implements OnInit {

  constructor(private db: AngularFireDatabase, public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
   }
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
