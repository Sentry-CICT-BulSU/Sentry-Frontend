import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

// Declaring a constant named routes that is of type Routes, which is an array of route definitions.

const routes: Routes = [
  {

    // A route definition for the dashboard path, which loads the DashboardModule lazily and displays it using the LayoutComponent.

    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },


  {

    // A route definition for the report path, which loads the DashboardModule lazily and displays it using the LayoutComponent.

    path: 'report',
    component: LayoutComponent,
    loadChildren: () => import('../report/report.module').then((m) => m.ReportModule),
  },

  // A route definition that redirects the root path to the dashboard path.
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // A route definition that redirects any undefined path to the error/404 path.
  { path: '**', redirectTo: 'error/404' },
];

// Declaring an NgModule named LayoutRoutingModule with the following configuration:
// imports: [RouterModule.forChild(routes)], - importing the RouterModule and calling its forChild method to configure the routes defined in routes.
// exports: [RouterModule], - exporting the configured RouterModule so that it can be imported by other modules.

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
