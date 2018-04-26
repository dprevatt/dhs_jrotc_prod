import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CadetManagementComponent } from './cadet-management/cadet-management.component';
import { SearchPipe } from './search.pipe';
import { CadetSalesComponent } from './cadet-sales/cadet-sales.component';

import { CadetService } from './services/cadet.service';
import { TicketAssignmentComponent } from './ticket-assignment/ticket-assignment.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CadetManagementComponent,
    SearchPipe,
    CadetSalesComponent,
    TicketAssignmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [CadetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
