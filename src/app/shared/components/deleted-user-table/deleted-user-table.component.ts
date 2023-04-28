import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IUserCollection } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-deleted-user-table',
  templateUrl: './deleted-user-table.component.html',
})
export class DeletedUserTableComponent implements OnInit {
  deletedUsersColleciton?: IUserCollection;
  deletedUsers?: IUser[];
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const params = {
      q: 'trashed',
    };
    this.adminService.getUsers$(params).subscribe({
      next: (resp) => {
        this.deletedUsersColleciton = resp;
        this.deletedUsers = this.deletedUsersColleciton.data as IUser[];
        console.log(resp);
      },
      error: (err) => {
        console.debug(err);
      },
    });
  }

  onRestore(id: number) {
    this.adminService.restoreUser$(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
