// Import the Component and ThemeService from Angular core.
import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
// Define a component with metadata using the @Component decorator.
@Component({
    selector: 'app-root', // Define the selector for the component.
    templateUrl: './app.component.html', // Define the template for the component.
    styleUrls: ['./app.component.scss'], // Define the styles for the component.
})

// Define the AppComponent class.
export class AppComponent {
    title = 'Tean 404 System'; // Define a title property for the component.

    // Define a constructor that takes the ThemeService as a dependency. Constructor is a special method that is called
    //when a new instance of a class is created
    constructor(public themeService: ThemeService) {}
}

// This code represents the main component of an Angular application and sets up the theme service to toggle
// the dark class on the application's root element based on the current theme.
