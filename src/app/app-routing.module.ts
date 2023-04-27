import { AuthGuard } from './core/guards/auth.guard';
// Import the NgModule and RouterModule from the Angular core library.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthResolver } from './core/resolvers/auth.resolver';

// Define an array of route objects using the Routes interface.
const routes: Routes = [
  {
    path: '', // If the path is empty, load the LayoutModule.
    canActivate: [AuthGuard],
    resolve: {
      // tokens: AccessTokenResolver,
      user: AuthResolver,
    },
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth', // If the path is 'auth', load the AuthModule.
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: 'error/404' }, // If the path is anything else, redirect to the 404 error page.
];

// Declare the AppRoutingModule as an NgModule.
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ], // Use the RouterModule to configure the routes.
  exports: [RouterModule], // Export the RouterModule for use in other parts of the application.
})
export class AppRoutingModule {} // Export the AppRoutingModule class for use in other parts of the application.
