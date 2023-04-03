import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IUser, IUserCollection } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

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
}
