import { Component, Input, OnInit } from '@angular/core';
import { IUserPaginate } from 'src/app/core/models/user.model';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit {

    @Input() pagination?: IUserPaginate;

    constructor() { }

    ngOnInit(): void { }
}
