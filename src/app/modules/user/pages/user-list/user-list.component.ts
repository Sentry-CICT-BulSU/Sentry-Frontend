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
    constructor(private adminService: AdminService, public systemService: SystemService) {}

    initSystemColor() {
      const color = this.systemService.color;
      console.log('system color: ', color);
      this.replaceClassName('md:bg-primary-', `md:bg-${this.systemService.color}-`);
      this.replaceClassName('text-primary-', `text-${this.systemService.color}-`);
      this.replaceClassName('border-primary-', `border-${this.systemService.color}-`);
      this.replaceClassName('ring-primary-', `ring-${this.systemService.color}-`);
      this.replaceClassName('hover:bg-primary-', `hover:bg-${this.systemService.color}-`);
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
