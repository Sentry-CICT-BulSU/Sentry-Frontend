// Import necessary modules from '@angular/core'
import { Component } from '@angular/core';

// Use the '@Component' decorator to define the metadata for the component
@Component({
  // Define the selector used to identify this component in the HTML markup
  selector: 'app-sign-in',
  // Define the HTML template used to render this component
  templateUrl: './sign-in.component.html',
  // Define the CSS styles applied to this component
  styleUrls: ['./sign-in.component.scss'],
})

// Define the class that represents this component and implement the 'OnInit' interface
export class SignInComponent {
  proceedMsg = 'Proceed to Authentication';
  // Define the constructor for this component
}
