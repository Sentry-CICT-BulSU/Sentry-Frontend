import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; // Import Location from @angular/common

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
})
export class Error404Component implements OnInit {

  constructor(private location: Location) { } // Inject Location in the constructor

  ngOnInit() {
  }

  goBack(): void {
    this.location.back(); // Implement goBack() method to navigate back
  }

}
