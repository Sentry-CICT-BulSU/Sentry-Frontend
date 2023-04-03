import { Component, Input, OnChanges } from '@angular/core';
import {
    ISchedule,
    IScheduleCollection,
} from 'src/app/core/models/schedule.model';

@Component({
    selector: 'app-schedule-faculty-table',
    templateUrl: './schedule-faculty-table.component.html',
})
export class ScheduleFacultyComponent implements OnChanges {
    @Input() data?: IScheduleCollection | null;
    schedules?: ISchedule[];

    ngOnChanges(): void {
        console.log(this.data);
        this.schedules = this.data?.data as ISchedule[];
    }
}
