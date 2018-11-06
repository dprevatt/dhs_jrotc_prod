import { CadetAwardsComponent } from './cadet-awards/cadet-awards.component';
import { PickupCounterDisplayComponent } from './pickup-counter-display/pickup-counter-display.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { SiteAdministrationComponent } from './site-administration/site-administration.component';
import { DeltaSellersTableComponent } from './company-reporting/delta-sellers-table/delta-sellers-table.component';
import { CharlieSellersTableComponent } from './company-reporting/charlie-sellers-table/charlie-sellers-table.component';
import { BravoSellersTableComponent } from './company-reporting/bravo-sellers-table/bravo-sellers-table.component';

import { SalesEntryComponent } from './sales-entry/sales-entry.component';
import { TicketLookupComponent } from './ticket-lookup/ticket-lookup.component';
import { TicketAssignmentComponent } from './ticket-assignment/ticket-assignment.component';
import { CadetSalesComponent } from './cadet-sales/cadet-sales.component';
import { CadetManagementComponent } from './cadet-management/cadet-management.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ReportingComponent } from './reporting/reporting.component';
import { AlphaSellersTableComponent } from './company-reporting/alpha-sellers-table/alpha-sellers-table.component';
import { EchoSellersTableComponent } from './company-reporting/echo-sellers-table/echo-sellers-table.component';
import { PlatePickupPageComponent } from './plate-pickup-page/plate-pickup-page.component';
import { BronzeAwardsComponent } from './cadet-awards/bronze-awards/bronze-awards.component';
import { SilverAwardsComponent } from './cadet-awards/silver-awards/silver-awards.component';
import { GoldAwardsComponent } from './cadet-awards/gold-awards/gold-awards.component';
import { PlatinumAwardsComponent } from './cadet-awards/platinum-awards/platinum-awards.component';
// import { HomeComponent } from './home/home.component';     // Add your component here
// import { AboutComponent } from './about/about.component';  // Add your component here


const routes: Routes = [
    // {
    //     path: '/',
    //     component: AppComponent
    // },
    {
        path: 'about',
        component: AboutComponent
    },
    {
      path: 'CadetManagement',
      component: CadetManagementComponent
    },
    {
      path: 'CadetSales/:id',
       component: CadetSalesComponent
    },
    {
      path: 'TicketAssignment',
       component: TicketAssignmentComponent
    },
    {
      path: 'TicketLookup',
       component: TicketLookupComponent
    },
    {
      path: 'SalesEntry',
       component: SalesEntryComponent
    },
    {
      path: 'Reporting',
       component: ReportingComponent
    },
    {
      path: 'Alpha-Reporting',
      component: AlphaSellersTableComponent
    },
    {
      path: 'Bravo-Reporting',
      component: BravoSellersTableComponent
    },
    {
      path: 'Charlie-Reporting',
      component: CharlieSellersTableComponent
    },
    {
      path: 'Delta-Reporting',
      component: DeltaSellersTableComponent
    },
    {
      path: 'Echo-Reporting',
      component: EchoSellersTableComponent
    },
    {
      path: 'Site-Administration',
      component: SiteAdministrationComponent
    },
    {
      path: 'DataManagement',
      component: DataManagementComponent
    },
    {
      path: 'PlatePickup',
      component: PlatePickupPageComponent
    },
    {
      path: 'PickupCounterDisplay',
      component: PickupCounterDisplayComponent
    },
    {
      path: 'Cadet-Awards',
      component: CadetAwardsComponent
    },
    {
      path: 'Bronze-Awards',
      component: BronzeAwardsComponent
    },
    {
      path: 'Silver-Awards',
      component: SilverAwardsComponent
    },
    {
      path: 'Gold-Awards',
      component: GoldAwardsComponent
    },
    {
      path: 'Platinum-Awards',
      component: PlatinumAwardsComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
