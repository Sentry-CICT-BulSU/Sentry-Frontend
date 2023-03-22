import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TwoStepsComponent } from './pages/two-steps/two-steps.component';

// Defining a constant named routes of type Routes

const routes: Routes = [
  {
    // Defining a route object for the root path of the Auth module. The component property specifies that the AuthComponent
    // should be displayed when this route is activated. The children property defines the child routes for this path.

    path: '',
    component: AuthComponent,
    children: [

      // Defining a child route that redirects to the SignInComponent when the root path is accessed.
      // It specifies that when the user navigates to the empty path ('') of the Auth module, the application should redirect them to the sign-in path.

      // The redirectTo property specifies the target route to redirect to, and the pathMatch property specifies the matching strategy to use.
      // In this case, the full strategy means that the whole URL path must match the empty path exactly ('') for the redirection to happen.

      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },

      // This code defines a route for the "Sign-In" page of the Angular application. It maps the path "sign-in" to the component
      // "SignInComponent" and provides additional data through the "data" property. In this case, the data includes a "returnUrl"
      // field with a value of "window.location.pathname".

      // The "returnUrl" field can be used to redirect the user back to the page they were on before they were prompted to sign in.
      // For example, if the user is on the "dashboard" page and clicks a link that requires authentication, they will be redirected to
      // the "sign-in" page. After they sign in, they can be automatically redirected back to the "dashboard" page thanks to the "returnUrl" field.

      { path: 'sign-in', component: SignInComponent, data: { returnUrl: window.location.pathname } },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'new-password', component: NewPasswordComponent },
      { path: 'two-steps', component: TwoStepsComponent },

      // This code is a catch-all route that will be used when the requested URL does not match any of the defined routes.

      // { path: '**' }: This means that any URL can match this route, regardless of its path.
      // redirectTo: 'sign-in': This specifies that when the URL matches this route, it should be redirected to the 'sign-in' route.
      // pathMatch: 'full': This specifies that the whole URL should be matched, not just a prefix.

      { path: '**', redirectTo: 'sign-in', pathMatch: 'full' },
    ],
  },
];

// This NgModule is used to organize and manage the routing configuration for the authentication feature of the application.

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
