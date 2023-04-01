// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { IUserCollectionResponse } from 'src/app/core/models/user.model';
import { AdminService } from 'src/app/core/services/admin.service';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class UserListComponent implements OnInit {
    user_pagination?: IUserCollectionResponse;
    isMultiPage?: boolean;

    // Defining a constructor for the DashboardComponent class
    constructor(private adminService: AdminService) {}

    // Implementing the ngOnInit lifecycle hook
    ngOnInit(): void {
        this.adminService
            .getUsers$()
            .subscribe((response: IUserCollectionResponse): void => {
                this.user_pagination = response;
                this.isMultiPage = this.user_pagination?.meta?.last_page !== 1;
                console.log(this.user_pagination);
            });
    }

    pageMaxCount() {
        return new Array(this.user_pagination?.meta?.last_page);
    }
}
