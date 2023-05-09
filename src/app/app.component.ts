// Import the Component and ThemeService from Angular core.
import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemService } from './core/services/system.service';
import { Title } from '@angular/platform-browser';
// Define a component with metadata using the @Component decorator.
@Component({
  selector: 'app-root', // Define the selector for the component.
  templateUrl: './app.component.html', // Define the template for the component.
  styleUrls: ['./app.component.scss'], // Define the styles for the component.
})

// Define the AppComponent class.
export class AppComponent implements OnInit {
  title = 'Tean 404 System'; // Define a title property for the component.

  loading$: Observable<boolean> = of(false);

  // Define a constructor that takes the ThemeService as a dependency. Constructor is a special method that is called
  //when a new instance of a class is created
  constructor(
    public themeService: ThemeService,
    private router: Router,
    public systemService: SystemService,
    private system: SystemService,
    private sysTitle: Title
  ) {}

  ngOnInit() {
    this.sysTitle.setTitle(this.system.name);
    this.loading$ = this.router.events.pipe(
      filter(
        (e) =>
          e instanceof NavigationStart ||
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
      ),
      map((e) => e instanceof NavigationStart)
    );
  }
}

// This code represents the main component of an Angular application and sets up the theme service to toggle
// the dark class on the application's root element based on the current theme.
