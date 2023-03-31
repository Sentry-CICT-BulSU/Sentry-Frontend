import { Component, Input } from '@angular/core';
import { IUserPaginate } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
})
export class UserTableComponent {

    @Input() pagination?: IUserPaginate;

    apiRoute: string = environment.apiRootRoute;
}
