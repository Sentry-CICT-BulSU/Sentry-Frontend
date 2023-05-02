import { AdminService } from 'src/app/core/services/admin.service';
// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, IUserCollection } from 'src/app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/core/constants/user';
import { SystemService } from 'src/app/core/services/system.service';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class EditUserComponent implements OnInit {
  userId?: IUser['id'];
  user?: IUser;
  editUserForm?: FormGroup;

  user_positions: string[] = User.user_positions;
  colleges: string[] = User.colleges;
  account_types: string[] = User.account_types;
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    public systemService: SystemService
  ) {}

  loadUser() {
    this.route.paramMap.subscribe((params) => {
      this.userId = +(params.get('id') as string);
      this.adminService.getUser$(+(params.get('id') as string)).subscribe({
        next: (user: IUserCollection) => {
          if (user.data) {
            const usr = user.data as IUser;
            console.log(user);
            this.user = user.data as IUser;
            if (this.editUserForm) {
              this.editUserForm.controls['first_name'].setValue(usr.first_name);
              this.editUserForm.controls['last_name'].setValue(usr.last_name);
              this.editUserForm.controls['contact'].setValue(usr.contact);
              this.editUserForm.controls['email'].setValue(usr.email);
              this.editUserForm.controls['type'].setValue(usr.type);
              this.editUserForm.controls['position'].setValue(usr.position);
              this.editUserForm.controls['college'].setValue(usr.college);
            }
          }
        },
        error: (err) => console.debug(err),
      });
    });
  }

  loadForm() {
    this.editUserForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      contact: [''],
      email: ['', [Validators.email]],
      password: [''],
      // TODO: make custom validator to check if password === password_confirmation
      password_confirmation: [''],
      // TODO: make custom validator to check if type is in this.account_types
      type: [''],
      // TODO: make custom validator to check if position is in this.user_positions
      position: [''],
      // TODO: make custom validator to check if college is in this.colleges
      college: [''],
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadForm();
  }

  onSubmit() {
    if (!this.userId) return;
    if (!this.editUserForm) return;
    if (this.editUserForm.value.first_name === this.user?.first_name) {
      this.editUserForm.removeControl('first_name');
    }
    if (this.editUserForm.value.last_name === this.user?.last_name) {
      this.editUserForm.removeControl('last_name');
    }
    if (this.editUserForm.value.contact === this.user?.contact) {
      this.editUserForm.removeControl('contact');
    }
    if (this.editUserForm.value.email === this.user?.email) {
      this.editUserForm.removeControl('email');
    }
    if (this.editUserForm.value.password === '') {
      this.editUserForm.removeControl('password');
      this.editUserForm.removeControl('password_confirmation');
    }
    if (this.editUserForm.value.type === this.user?.type) {
      this.editUserForm.removeControl('type');
    }
    if (this.editUserForm.value.position === this.user?.position) {
      this.editUserForm.removeControl('position');
    }
    if (this.editUserForm.value.college === this.user?.college) {
      this.editUserForm.removeControl('college');
    }
    console.log(this.editUserForm.value);
    this.adminService
      .editUser$(this.userId, this.editUserForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/user']);

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User edited successfully!',
          });
        },
        error: (err) => console.debug(err),
      });
  }
}
