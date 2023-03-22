// Importing necessary modules from @angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing necessary components from the current directory
import { DashboardComponent } from './dashboard.component';

// Defining the routes of the dashboard module
const routes: Routes = [
  {
    // Route for the base path of the dashboard module
    path: '',
    // The component to be loaded for the base path
    component: DashboardComponent,
  },
];

// Defining a new NgModule for the dashboard module routing
@NgModule({
  // Importing the routes defined above
  imports: [RouterModule.forChild(routes)],
  // Exporting the RouterModule for the module to use
  exports: [RouterModule],
})

// Exporting the NgModule class for the dashboard module routing
export class DashboardRoutingModule {}


/* This code defines the routing configuration for the DashboardModule in an Angular application. It imports the necessary modules
from the @angular package and the required components from the current directory.

It defines the routes for the DashboardModule using an array of Routes. The routes array consists of one main route for the base path
of the dashboard module, which loads the DashboardComponent and several child routes.

The child routes are nested under the main route and consist of a route for the 'nfts' subpath that loads the NftComponent and a
catch-all route that redirects to an error page when the requested path doesn't match any of the defined routes.

Finally, it exports an NgModule class DashboardRoutingModule, which imports the RouterModule and exports it for the DashboardModule to use.*/
