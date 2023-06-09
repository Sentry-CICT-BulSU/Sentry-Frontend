// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
    selector: 'app-section-list',
    templateUrl: './section-list.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class SectionListComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
