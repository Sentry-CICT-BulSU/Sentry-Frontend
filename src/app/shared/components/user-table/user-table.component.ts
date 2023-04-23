import { Component, Input, OnChanges } from '@angular/core';
import { IUser, IUserCollection } from 'src/app/core/models';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnChanges {
  @Input() pagination?: IUserCollection;

  data!: IUser[];
  links!: IUserCollection['links'];
  meta!: IUserCollection['meta'];

  apiRoute: string = environment.apiRootRoute;

  ngOnChanges(): void {
    this.data = this.pagination?.data as IUser[];
    this.links = this.pagination?.links as IUserCollection['links'];
    this.meta = this.pagination?.meta as IUserCollection['meta'];
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
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the user data here
        // Replace this block with your actual backend logic to delete the user data
        // For example:
        // this.userService.deleteUser(user.id).subscribe(() => {
        //   // Success message
        //   Swal.fire('Deleted!', 'User has been deleted.', 'success');
        //   // Update the data array after successful deletion
        //   this.data = this.data.filter(u => u.id !== user.id);
        // }, (error) => {
        //   // Error message
        //   Swal.fire('Error!', 'Failed to delete user.', 'error');
        // });
        // For now, just remove the user from the data array for demonstration purposes
        this.data = this.data.filter(u => u.id !== user.id);
        // Show success message
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  }
}
