import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserCollection, IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment as env } from 'src/environments/environment';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
})
export class PersonalInformationComponent implements OnInit {
  updateUserForm?: FormGroup;
  user?: IUser;
  file?: File;
  profile_img: any = 'assets/avatars/user-profile.png';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public systemService: SystemService
  ) {}

  initSystemColor() {
    const color = this.systemService.color;

    this.replaceClassName('md:bg-primary-', `md:bg-${color}-`);
    this.replaceClassName('text-primary-', `text-${color}-`);
    this.replaceClassName('border-primary-', `border-${color}-`);
    this.replaceClassName('ring-primary-', `ring-${color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${color}-`);
    this.replaceClassName('tab-link', `tab-link-${color}`);
    this.replaceClassName(
      'peer-checked:bg-primary-',
      `peer-checked:bg-${color}-`
    );
    this.replaceClassName(
      'peer-checked:border-primary-',
      `peer-checked:border-${color}-`
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

  ngOnInit() {
    this.authService.current_user_subject$?.subscribe({
      next: (data) => {
        if (data) {
          this.initForm(data as IUser);
          this.profile_img =
            data.profile_img ?? 'assets/avatars/user-profile.png';
        }
      },
      error: (err) => console.debug(err),
    });
  }

  initForm(user: IUser) {
    this.updateUserForm = this.fb.group({
      first_name: [user.first_name],
      last_name: [user.last_name],
      email: [user.email],
      profile_img: [user.profile_img],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onImgChange(event: any) {
    const img: File = event.target.files[0];
    if (!this.updateUserForm) return;
    if (!img) {
      return alert('No image selected');
    } else if (img.length > env.MAX_FILE_SIZE) {
      return alert(
        'File size is too large, max accepted file size is: ' +
          env.MAX_FILE_SIZE / 1000
      );
    }
    this.file = img;

    const reader = new FileReader();
    reader.onload = (e) => (this.profile_img = reader.result);
    reader.readAsDataURL(img);
  }

  onSubmit() {
    if (!this.updateUserForm) return;
    // if (this.updateUserForm.controls['profile_img'].value && !this.file)
    //   return alert('No image selected');
    if (
      this.updateUserForm.controls['first_name'].pristine &&
      !this.updateUserForm.controls['first_name'].dirty
    )
      this.updateUserForm.removeControl('first_name');
    if (
      this.updateUserForm.controls['last_name'].pristine &&
      !this.updateUserForm.controls['last_name'].dirty
    )
      this.updateUserForm.removeControl('last_name');
    if (
      this.updateUserForm.controls['email'].pristine &&
      !this.updateUserForm.controls['email'].dirty
    )
      this.updateUserForm.removeControl('email');

    console.log(this.updateUserForm.value);
    // eslint-disable-next-line prefer-const
    const formData: FormData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries(this.updateUserForm.value).forEach(([key, value]: any[]) =>
      formData.append(key, value)
    );
    if (this.file && this.updateUserForm.contains('profile_img')) {
      formData.set('profile_img', this.file);
    }

    // eslint-disable-next-line
    console.log(formData);

    this.authService.updateUser$(formData).subscribe({
      next: (user: IUserCollection) => {
        console.log(user);
        window.location.reload();
      },
      error: (err) => console.debug(err),
    });
  }
}
