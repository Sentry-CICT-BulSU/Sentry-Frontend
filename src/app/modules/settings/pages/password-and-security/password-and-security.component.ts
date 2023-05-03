import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-and-security',
  templateUrl: './password-and-security.component.html',
})
export class PasswordAndSecurityComponent implements OnInit {

  constructor(public systemService: SystemService) { }

  ngOnInit(): void {
    this.initSystemColor();
  }

  resetPassword() {
    Swal.fire({
      title: 'Are you sure you want to change your password?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Code to reset the password goes here.
        // For example, you can call a reset password service API.
      }
    });
  }



  initSystemColor() {
    const color = this.systemService.color;
    console.log('system color: ', color);
    this.replaceClassName('md:bg-primary-', `md:bg-${this.systemService.color}-`);
    this.replaceClassName('text-primary-', `text-${this.systemService.color}-`);
    this.replaceClassName('border-primary-', `border-${this.systemService.color}-`);
    this.replaceClassName('ring-primary-', `ring-${this.systemService.color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${this.systemService.color}-`);
    this.replaceClassName('button-colored', `button-${this.systemService.color}`);
    this.replaceClassName('tab-link', `tab-link-${this.systemService.color}`);
    this.replaceClassName('peer-checked:bg-primary-', `peer-checked:bg-${this.systemService.color}-`);
    this.replaceClassName('peer-checked:border-primary-', `peer-checked:border-${this.systemService.color}-`);
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
