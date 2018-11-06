import { MessagingService } from './messaging.service';

import { CadetSalesEntryComponent } from './sales-entry/components/cadet-sales-entry/cadet-sales-entry.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CadetManagementComponent } from './cadet-management/cadet-management.component';
import { SearchPipe } from './search.pipe';
import { CadetSalesComponent } from './cadet-sales/cadet-sales.component';

import { CadetService } from './services/cadet.service';
import { TicketAssignmentComponent } from './ticket-assignment/ticket-assignment.component';
import { TicketLookupComponent } from './ticket-lookup/ticket-lookup.component';
import { CadetSalesQuickLinkComponent } from './cadet-sales-quick-link/cadet-sales-quick-link.component';
import { CadetDataUploadComponent } from './cadet-data-upload/cadet-data-upload.component';
import { SalesEntryComponent } from './sales-entry/sales-entry.component';
import { ReportingComponent } from './reporting/reporting.component';
import { PhoneMaskComponent } from './custom-inputs/phone-mask/phone-mask.component';
import { CadetSalesListComponent } from './sales-entry/components/cadet-sales-list/cadet-sales-list.component';
import { CadetSalesCounterComponent } from './sales-entry/components/cadet-sales-counter/cadet-sales-counter.component';
import { TextTitlecaseComponent } from './custom-inputs/text-titlecase/text-titlecase.component';
import { TotalSoldChartComponent } from './charts/components/total-sold-chart/total-sold-chart.component';
import { SoldPerComapnyChartComponent } from './charts/components/sold-per-comapny-chart/sold-per-comapny-chart.component';
import { SoldPerCadetComponent } from './charts/components/sold-per-cadet/sold-per-cadet.component';
import { Top5sellersComponent } from './charts/components/top5sellers/top5sellers.component';
import { AlphaSellersTableComponent } from './company-reporting/alpha-sellers-table/alpha-sellers-table.component';
import { BravoSellersTableComponent } from './company-reporting/bravo-sellers-table/bravo-sellers-table.component';
import { CharlieSellersTableComponent } from './company-reporting/charlie-sellers-table/charlie-sellers-table.component';
import { DeltaSellersTableComponent } from './company-reporting/delta-sellers-table/delta-sellers-table.component';
import { EchoSellersTableComponent } from './company-reporting/echo-sellers-table/echo-sellers-table.component';
import { BravoComponent } from './company-averages/bravo/bravo.component';
import { AlphaComponent } from './company-averages/alpha/alpha.component';
import { CharlieComponent } from './company-averages/charlie/charlie.component';
import { DeltaComponent } from './company-averages/delta/delta.component';
import { EchoComponent } from './company-averages/echo/echo.component';
import { FoxtrotComponent } from './company-averages/foxtrot/foxtrot.component';
import { Top25sellersComponent } from './top25sellers/top25sellers.component';
import { OrderByPipe } from './order-by.pipe';
import { SortPipe } from './sort.pipe';
import { SalesStatisticsComponent } from './sales-statistics/sales-statistics.component';
import { SiteAdministrationComponent } from './site-administration/site-administration.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { PlatePickupPageComponent } from './plate-pickup-page/plate-pickup-page.component';
import { PlatePickupTableComponent } from './plate-pickup-table/plate-pickup-table.component';
import { PlatePickupCounterComponent } from './plate-pickup-counter/plate-pickup-counter.component';
import { ExactFilterPipe } from './exact-filter.pipe';
import { PickupCounterDisplayComponent } from './pickup-counter-display/pickup-counter-display.component';
import { CadetAwardsComponent } from './cadet-awards/cadet-awards.component';
import { BronzeAwardsComponent } from './cadet-awards/bronze-awards/bronze-awards.component';
import { SilverAwardsComponent } from './cadet-awards/silver-awards/silver-awards.component';
import { GoldAwardsComponent } from './cadet-awards/gold-awards/gold-awards.component';
import { PlatinumAwardsComponent } from './cadet-awards/platinum-awards/platinum-awards.component';





@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CadetManagementComponent,
    SearchPipe,
    CadetSalesComponent,
    TicketAssignmentComponent,
    TicketLookupComponent,
    CadetSalesQuickLinkComponent,
    CadetDataUploadComponent,
    SalesEntryComponent,
    ReportingComponent,
    PhoneMaskComponent,
    CadetSalesListComponent,
    CadetSalesEntryComponent,
    CadetSalesCounterComponent,
    TextTitlecaseComponent,
    TotalSoldChartComponent,
    SoldPerComapnyChartComponent,
    SoldPerCadetComponent,
    Top5sellersComponent,
    AlphaSellersTableComponent,
    BravoSellersTableComponent,
    CharlieSellersTableComponent,
    DeltaSellersTableComponent,
    EchoSellersTableComponent,
    BravoComponent,
    AlphaComponent,
    CharlieComponent,
    DeltaComponent,
    EchoComponent,
    FoxtrotComponent,
    Top25sellersComponent,
    OrderByPipe,
    SortPipe,
    SalesStatisticsComponent,
    SiteAdministrationComponent,
    DataManagementComponent,
    PlatePickupPageComponent,
    PlatePickupTableComponent,
    PlatePickupCounterComponent,
    ExactFilterPipe,
    PickupCounterDisplayComponent,
    CadetAwardsComponent,
    BronzeAwardsComponent,
    SilverAwardsComponent,
    GoldAwardsComponent,
    PlatinumAwardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule
  ],
  exports: [
    PhoneMaskComponent,
    TextTitlecaseComponent
  ],
  providers: [CadetService, AngularFireAuth, AngularFireDatabase, SortPipe, OrderByPipe, MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
