// Import the Component and OnInit symbols from the Angular Core module
import { Component, OnInit } from '@angular/core';

// Declare a new component and specify its metadata using the @Component decorator
@Component({
  selector: 'app-forgot-password', // A CSS selector that defines how the component is used in templates
  templateUrl: './forgot-password.component.html', // The path to the component's template file
  styleUrls: ['./forgot-password.component.scss'] // An array of stylesheet files that define the component's styles
})

// Export the component class and implement the OnInit interface
export class ForgotPasswordComponent implements OnInit {

  // Declare the constructor method, which is executed when a new instance of the component is created
  constructor() { }

  // Declare the ngOnInit method, which is executed when the component is initialized
  ngOnInit(): void { }

}
