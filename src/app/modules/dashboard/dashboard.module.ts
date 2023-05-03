import { NgxPaginationModule } from 'ngx-pagination';
// Importing necessary modules from @angular and other third-party packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { NgApexchartsModule } from 'ng-apexcharts';

// Importing all necessary components
import { DashboardComponent } from './dashboard.component';
import { AuthInterceptor } from 'src/app/core/interceptor/auth.interceptor';

import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { FacultyDashboardComponent } from './pages/faculty-dashboard/faculty-dashboard.component';

// Defining the NgModule for the Dashboard feature module
@NgModule({
    declarations: [DashboardComponent, ChartCardComponent, AdminDashboardComponent, FacultyDashboardComponent,],

    // Importing necessary modules to be used in this module
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule.forRoot(),
        HttpClientModule,
        NgApexchartsModule,
        AngularSvgIconModule.forRoot(),
        NgxPaginationModule
    ]
})

// Exporting the DashboardModule class
export class DashboardModule {}
