// Import Component and OnInit modules from the Angular core library
import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  // Lifecycle hook method called after the component is initialized
  ngOnInit(): void {}
}
