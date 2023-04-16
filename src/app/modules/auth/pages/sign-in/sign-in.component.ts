import { Router } from '@angular/router';
// Import necessary modules from '@angular/core'
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

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
export class SignInComponent implements OnInit {
    signinForm!: FormGroup;
    loading?: boolean;
    errors?: boolean;
    // Define the constructor for this component
    constructor(
        private fBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    // Define the method that is called when this component is initialized
    ngOnInit(): void {
        this.signinForm = this.fBuilder.group({
            email: [
                '',
                [
                    /* Validators.required, Validators.email */
                ],
                [],
            ],
            password: [
                '',
                [
                    /* Validators.required */
                ],
                [],
            ],
        });
    }

    submit() {
        this.loading = true;
        this.errors = false;

        this.authService.login();
    }

    hanldeErrors(error: any) {
        this.loading = false;
        this.errors = true;
        console.log(error);
    }
}
