// Importing necessary modules from @angular
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/constants/user';
import { IUserConfig } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin.service';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  user_positions: string[] = User.user_positions;
  colleges: string[] = User.colleges;
  account_types: string[] = User.account_types;

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

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    public systemService: SystemService
  ) {
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
    this.newUserForm.controls['college'].setValue(this.colleges[0]);
  }

  onSubmit() {
    this.adminService
      .createUser$(this.newUserForm.value as IUserConfig)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/user']);

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User added successfully!',
          });
        },
        error: (error) => {
          console.debug(error);
        },
      });
  }
}
