import { AuthGuard } from './../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { Error404Component } from '../error-404/error-404.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'faculty',
    component: LayoutComponent,
    loadChildren: () =>
      import('../faculty/faculty.module').then((m) => m.FacultyModule),
  },
  {
    path: 'schedule',
    component: LayoutComponent,
    loadChildren: () =>
      import('../schedule/schedule.module').then((m) => m.ScheduleModule),
  },
  {
    path: 'attendance',
    component: LayoutComponent,
    loadChildren: () =>
      import('../attendance/attendance.module').then((m) => m.AttendanceModule),
  },

  {
    path: 'semester',
    component: LayoutComponent,
    loadChildren: () =>
      import('../semester/semester.module').then((m) => m.SemesterModule),
  },
  {
    path: 'subject',
    component: LayoutComponent,
    loadChildren: () =>
      import('../subject/subject.module').then((m) => m.SubjectModule),
  },
  {
    path: 'room',
    component: LayoutComponent,
    loadChildren: () => import('../room/room.module').then((m) => m.RoomModule),
  },
  {
    path: 'section',
    component: LayoutComponent,
    loadChildren: () => import('../section/section.module').then((m) => m.SectionModule),
  },

  {
    path: 'room-key',
    component: LayoutComponent,
    loadChildren: () =>
      import('../room-key/room-key.module').then((m) => m.RoomKeyModule),
  },
  {
    path: 'reports',
    component: LayoutComponent,
    loadChildren: () =>
      import('../reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'user',
    component: LayoutComponent,
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'attendance-check',
    component: LayoutComponent,
    loadChildren: () =>
      import('../attendance-check/attendance-check.module').then(
        (m) => m.AttendanceCheckModule
      ),
  },
  {
    path: 'keys',
    component: LayoutComponent,
    loadChildren: () => import('../keys/keys.module').then((m) => m.KeysModule),
  },
  {
    path: 'settings',
    component: LayoutComponent,
    loadChildren: () =>
      import('../settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'faculty-profile',
    component: LayoutComponent,
    loadChildren: () =>
      import('../settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'faculty-mode',
    component: LayoutComponent,
    loadChildren: () =>
      import('../faculty-mode/faculty-mode.module').then(
        (m) => m.FacultyModeModule
      ),
  },
  {
    path: 'pdf',
    component: LayoutComponent,
    loadChildren: () =>
      import('../pdf/pdf.module').then((m) => m.PdfModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // A route definition that redirects any undefined path to the error/404 path.
  { path: 'error-404', component: Error404Component },
  // { path: '**', redirectTo: 'error-404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
