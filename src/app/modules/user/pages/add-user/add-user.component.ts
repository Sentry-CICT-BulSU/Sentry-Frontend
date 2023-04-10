// Importing necessary modules from @angular
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { IUserConfig } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
})
export class AddUserComponent {
    user_positions: string[] = [
        'Instructor I',
        'Instructor II',
        'Instructor III',
        'Attendance Checker',
        'N/A',
    ];
    colleges: string[] = [
        'College of Information and Communications Technology',
    ];
    account_types: string[] = ['Faculty', 'Attendance Checker'];

    newUserForm!: FormGroup<{
        first_name: FormControl<string | null>;
        last_name: FormControl<string | null>;
        contact: FormControl<string | null>;
        email: FormControl<string | null>;
        password: FormControl<string | null>;
        password_confirmation: FormControl<string | null>;
        type: FormControl<string | null>;
        position: FormControl<string | null>;
        college: FormControl<string | null>;
    }>;

    constructor(private adminService: AdminService, private fb: FormBuilder) {
        this.newUserForm = this.fb.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            contact: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            // TODO: make custom validator to check if password === password_confirmation
            password_confirmation: ['', [Validators.required]],
            // TODO: make custom validator to check if type is in this.account_types
            type: ['', [Validators.required]],
            // TODO: make custom validator to check if position is in this.user_positions
            position: ['', [Validators.required]],
            // TODO: make custom validator to check if college is in this.colleges
            college: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.adminService
            .createUser$(this.newUserForm.value as IUserConfig)
            .subscribe({
                next: (response) => {
                    console.log(response);
                },
                error: (error) => {
                    console.debug(error);
                },
            });
    }
}
