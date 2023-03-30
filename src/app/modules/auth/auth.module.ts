import { AuthInterceptor } from './../../core/interceptor/auth.interceptor';
import { CredentialsInterceptor } from '../../core/interceptor/credentials.interceptor';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';   // imports the NgModule and other modules from Angular
import { CommonModule } from '@angular/common';   // imports the CommonModule from Angular
import { AuthRoutingModule } from './auth-routing.module';   // imports the AuthRoutingModule from the same directory
import { AuthComponent } from './auth.component';   // imports the AuthComponent from the same directory
import { SignInComponent } from './pages/sign-in/sign-in.component';   // imports the SignInComponent from the 'pages' directory
import { AngularSvgIconModule } from 'angular-svg-icon';   // imports the AngularSvgIconModule from the external library
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';   // imports the HttpClientModule from Angular
import { SignUpComponent } from './pages/sign-up/sign-up.component';   // imports the SignUpComponent from the 'pages' directory
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';   // imports the ForgotPasswordComponent from the 'pages' directory
import { NewPasswordComponent } from './pages/new-password/new-password.component';   // imports the NewPasswordComponent from the 'pages' directory
import { TwoStepsComponent } from './pages/two-steps/two-steps.component';   // imports the TwoStepsComponent from the 'pages' directory
import { DeviceDetectorService } from 'ngx-device-detector';
import { UniversalDeviceDetectorService } from './../../core/services/universal-device-detector.service';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';

@NgModule({
    declarations: [
        AuthComponent,
        SignInComponent,
        SignUpComponent,
        ForgotPasswordComponent,
        NewPasswordComponent,
        TwoStepsComponent,
        AuthCallbackComponent,
    ],   // declares all the components that are part of this module

    imports: [
        CommonModule,
        AuthRoutingModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        ReactiveFormsModule
    ],
    providers: [
        AuthService,
        {
            provide: DeviceDetectorService,
            useClass: UniversalDeviceDetectorService
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: CredentialsInterceptor,
        //     multi: true
        // },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true
        // }
    ]
    // imports the CommonModule, AuthRoutingModule, HttpClientModule and AngularSvgIconModule with forRoot() method

})

export class AuthModule { }   // exports the AuthModule class, which is a standard Angular module
