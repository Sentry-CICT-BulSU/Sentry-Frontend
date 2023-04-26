// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/models';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    switch ((this.route.snapshot.data['user'] as IUser).type) {
      case 'Admin':
        this.router.navigate(['admin-dashboard'], { relativeTo: this.route });
        break;
      case 'Attendance Checker':
        this.router.navigate(['faculty-dashboard'], { relativeTo: this.route });
        break;
      default:
        this.router.navigate(['faculty-dashboard'], { relativeTo: this.route });
        break;
    }
  }
}
