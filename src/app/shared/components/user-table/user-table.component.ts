import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IUserCollection } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnChanges {
  @Input() pagination?: IUserCollection;

  p = 1;

  data?: IUser[];
  links?: IUserCollection['links'];
  meta?: IUserCollection['meta'];

  apiRoute: string = environment.apiRootRoute;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnChanges(): void {
    this.data = this.pagination?.data as IUser[];
    this.links = this.pagination?.links as IUserCollection['links'];
    this.meta = this.pagination?.meta as IUserCollection['meta'];
  }

  onEditUser(user: IUser) {
    this.router.navigate(['/faculty/' + user.id + '/edit']);
  }

  onDeleteUser(user: IUser) {
    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6941C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.softDeleteUser$(user.id).subscribe({
          next: (resp) => {
            console.log(resp);
            this.data = this.data?.filter((u) => u.id !== user.id);
          },
        });
        // Show success message
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  }
}
