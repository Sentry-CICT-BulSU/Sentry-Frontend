// Import Component and OnInit modules from the Angular core library
import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

// Decorator to define a new Angular component
@Component({
  // Selector to use this component in HTML
  selector: 'app-auth',
  // Path to the HTML file containing the template for this component
  templateUrl: './auth.component.html',
  // Array of paths to CSS files to be used by this component
  styleUrls: ['./auth.component.scss'],
})
// Define the class for this component
export class AuthComponent implements OnInit {
  // Constructor method to create an instance of this component
  sysIcon?: string;
  sysName?: string;
  sysAbout?: string;
  constructor(private system: SystemService) {}

  // Lifecycle hook method called after the component is initialized
  ngOnInit(): void {
    this.sysName = this.system.name;
    this.sysAbout = this.system.about;
    this.sysIcon = this.system.icon;
  }
}
