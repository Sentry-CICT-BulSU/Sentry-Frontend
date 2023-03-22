// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
  selector: 'app-dashboard',
  templateUrl: './report.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class ReportComponent implements OnInit {

  // Defining a constructor for the DashboardComponent class
  constructor() {}

  // Implementing the ngOnInit lifecycle hook
  ngOnInit(): void {}
}
