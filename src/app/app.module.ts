import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from 'src/app/core/services/auth.service';
// Import the required modules.
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CredentialsInterceptor } from './core/interceptor/credentials.interceptor';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';

/*Define the AppModule class using the @NgModule decorator. The @NgModule decorator in Angular is used to define and configure modules,
which are containers for related components, directives, pipes, and services. It allows you to declare the components, directives,
and pipes that belong to the module, and to import and export other modules that the current module depends on. It also allows you
to configure providers for the module, which are used to provide instances of services throughout the application, and to specify
which components should be loaded when the application starts.*/

@NgModule({
    // Declare that AppComponent is part of the AppModule.
    declarations: [AppComponent],

    // Import the BrowserModule, AppRoutingModule, and SharedModule.
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,
        OAuthModule.forRoot()
    ],

    // No providers are needed for this module. The providers array can be used to specify services that should be available
    //to all components in the application, but in this case, no providers are defined.
    providers: [
        AuthService,
        AuthGuard,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: CredentialsInterceptor,
        //     multi: true
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],

    // Bootstrap the AppComponent when the module is loaded.
    // It means that the AppComponent gets loaded when our application starts.
    bootstrap: [AppComponent],
})

// Export the AppModule class for use in other parts of the application.
export class AppModule { }
