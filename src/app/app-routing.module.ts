import { TicketAssignmentComponent } from './ticket-assignment/ticket-assignment.component';
import { CadetSalesComponent } from './cadet-sales/cadet-sales.component';
import { CadetManagementComponent } from './cadet-management/cadet-management.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
// import { HomeComponent } from './home/home.component';     // Add your component here
// import { AboutComponent } from './about/about.component';  // Add your component here

//This is my case 
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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
