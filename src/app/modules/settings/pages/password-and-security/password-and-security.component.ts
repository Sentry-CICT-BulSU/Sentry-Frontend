import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-password-and-security',
  templateUrl: './password-and-security.component.html',
})
export class PasswordAndSecurityComponent implements OnInit {
  updatePasswordForm?: FormGroup;
  user?: IUser;
  constructor(
    public systemService: SystemService,
    private adminService: AdminService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initSystemColor();
    this.initComponent();
  }

  onSubmit() {
    if (!this.updatePasswordForm) return;
    if (this.updatePasswordForm.invalid) return;
    console.log(this.updatePasswordForm.value);
  }

  onForceResetPassword() {
    this.adminService.forceResetPassword$(1).subscribe((res) => {
      console.log(res);
    });
  }

  initComponent() {
    this.authService.current_user_subject$?.subscribe((user) => {
      if (user) {
        this.user = user;
        this.updatePasswordForm = this.fb.group({
          current_password: ['', [Validators.required]],
          password: ['', [Validators.required]],
          password_confirmation: ['', [Validators.required]],
        });
      }
    });
  }

  initSystemColor() {
    const color = this.systemService.color;
    console.log('system color: ', color);
    this.replaceClassName(
      'md:bg-primary-',
      `md:bg-${this.systemService.color}-`
    );
    this.replaceClassName('text-primary-', `text-${this.systemService.color}-`);
    this.replaceClassName(
      'border-primary-',
      `border-${this.systemService.color}-`
    );
    this.replaceClassName('ring-primary-', `ring-${this.systemService.color}-`);
    this.replaceClassName(
      'hover:bg-primary-',
      `hover:bg-${this.systemService.color}-`
    );
    this.replaceClassName(
      'button-colored',
      `button-${this.systemService.color}`
    );
    this.replaceClassName('tab-link', `tab-link-${this.systemService.color}`);
    this.replaceClassName(
      'peer-checked:bg-primary-',
      `peer-checked:bg-${this.systemService.color}-`
    );
    this.replaceClassName(
      'peer-checked:border-primary-',
      `peer-checked:border-${this.systemService.color}-`
    );
  }

  private replaceClassName(prefix: string, replacement: string) {
    const elements = document.querySelectorAll(`[class*="${prefix}"]`);
    for (let i = 0; i < elements.length; i++) {
      const classList = elements[i].classList;
      for (let j = 0; j < classList.length; j++) {
        if (classList[j].startsWith(prefix)) {
          classList.replace(
            classList[j],
            classList[j].replace(prefix, replacement)
          );
        }
      }
    }
  }
}
