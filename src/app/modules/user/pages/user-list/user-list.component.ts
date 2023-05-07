// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { IUserCollection } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin.service';
import { SystemService } from 'src/app/core/services/system.service';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class UserListComponent implements OnInit {
  user_pagination?: IUserCollection;
  isMultiPage?: boolean;

  // Defining a constructor for the DashboardComponent class
  constructor(
    private adminService: AdminService,
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

  printThisPage() {
    window.print();
  }

  // Implementing the ngOnInit lifecycle hook
  ngOnInit(): void {
    this.adminService
      .getUsers$()
      .subscribe((response: IUserCollection): void => {
        this.user_pagination = response;
        this.isMultiPage = this.user_pagination?.meta?.last_page !== 1;
        console.log(this.user_pagination);
      });
  }

  pageMaxCount() {
    return new Array(this.user_pagination?.meta?.last_page);
  }
}
