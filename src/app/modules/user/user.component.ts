import { AdminService } from './../../core/services/admin.service';
import { IUser, IUserResponse, IUserPaginate } from './../../core/models/user.model';
// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class UserComponent implements OnInit {
    user_pagination?: IUserPaginate;

    // Defining a constructor for the DashboardComponent class
    constructor(private adminService: AdminService) { }

    // Implementing the ngOnInit lifecycle hook
    ngOnInit(): void {
        this.adminService.getUsers().subscribe((response: IUserResponse) => {
            this.user_pagination = response.paginate;
            console.log(this.user_pagination);
        });
    }
}
