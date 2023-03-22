// Importing the Injectable decorator from @angular/core and the BehaviorSubject class from rxjs.

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Applying the Injectable decorator to the ThemeService class and providing it at the root level of the app.

@Injectable({
  providedIn: 'root',
})

// Defining the ThemeService class with two public properties: default (a string representing the default theme) and themeChanged
// (a BehaviorSubject that emits the current theme).

export class ThemeService {
  public default = 'light';
  public themeChanged: BehaviorSubject<string> = new BehaviorSubject(this.theme);

  // Defining an empty constructor for the ThemeService class.

  constructor() {}

  // Defining a getter for the theme property that retrieves the current theme from local storage, or returns the default theme if none is found.

  public get theme(): string {
    return localStorage.getItem('theme') ?? this.default;
  }

  // Defining a setter for the theme property that sets the current theme in local storage and emits the new theme through the themeChanged subject.

  public set theme(value: string) {
    localStorage.setItem('theme', value);
    this.themeChanged.next(value);
  }

  // Defining a getter for the isDark property that returns true if the current theme is "dark", and false otherwise.

  public get isDark(): boolean {
    return this.theme == 'dark';
  }
}
