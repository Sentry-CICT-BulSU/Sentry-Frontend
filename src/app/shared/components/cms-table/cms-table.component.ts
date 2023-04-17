import { Component, Input, OnChanges } from '@angular/core';
import { IRoom, IRoomCollection } from 'src/app/core/models';

@Component({
    selector: 'app-cms-table',
    templateUrl: './cms-table.component.html',
    styleUrls: ['./cms-table.component.scss'],
})
export class CmsTableComponent implements OnChanges {
    @Input() tableConfig?: any;
    @Input() data?: IRoomCollection;

    room?: IRoom[];

    ngOnChanges() {
        this.room = this.data?.data as IRoom[];
    }
}
