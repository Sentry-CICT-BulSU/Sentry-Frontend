// Importing necessary modules from @angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing necessary components from the current directory
import { ReportComponent } from './report.component';

// Defining the routes of the Report module
const routes: Routes = [
  {
    // Route for the base path of the Report module
    path: '',
    // The component to be loaded for the base path
    component: ReportComponent,
    // children: [
      // Route for the sub path 'home' of the Report module
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: 'home', component: ReportContentComponent },
      // If the requested path doesn't match any of the above, redirect to the '404' page
      // { path: '**', redirectTo: 'error/404' },
    // ],
  },
];

// Defining a new NgModule for the Report module routing
@NgModule({
  // Importing the routes defined above
  imports: [RouterModule.forChild(routes)],
  // Exporting the RouterModule for the module to use
  exports: [RouterModule],
})

// Exporting the NgModule class for the Report module routing
export class ReportRoutingModule {}


/* This code defines the routing configuration for the ReportModule in an Angular application. It imports the necessary modules
from the @angular package and the required components from the current directory.

It defines the routes for the ReportModule using an array of Routes. The routes array consists of one main route for the base path
of the Report module, which loads the ReportComponent and several child routes.

The child routes are nested under the main route and consist of a route for the 'nfts' subpath that loads the ReportContentComponent and a
catch-all route that redirects to an error page when the requested path doesn't match any of the defined routes.

Finally, it exports an NgModule class ReportRoutingModule, which imports the RouterModule and exports it for the ReportModule to use.*/
