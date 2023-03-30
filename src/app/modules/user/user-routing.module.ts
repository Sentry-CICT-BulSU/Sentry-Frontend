// Importing necessary modules from @angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing necessary components from the current directory
import { UserComponent } from './user.component';

// Defining the routes of the Report module
const routes: Routes = [
  {
    // Route for the base path of the Report module
    path: '',
    // The component to be loaded for the base path
    component: UserComponent,
    // children: [
      // Route for the sub path 'home' of the Report module
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: 'home', component: ReportContentComponent },
      // If the requested path doesn't match any of the above, redirect to the '404' page
      // { path: '**', redirectTo: 'error/404' },
    // ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserRoutingModule {}
