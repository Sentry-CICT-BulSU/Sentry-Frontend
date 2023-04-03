// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
    ISchedule,
    IScheduleCollection,
} from 'src/app/core/models/schedule.model';
import { ScheduleService } from 'src/app/core/services/schedule.service';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class ScheduleListComponent implements OnInit {
    schedules?: IScheduleCollection;
    isMultiPage?: boolean;
    constructor(private scheduleService: ScheduleService) {}

    ngOnInit(): void {
        this.scheduleService.loadSchedules$().subscribe((schedules) => {
            this.schedules = schedules;
            this.isMultiPage = this.schedules?.meta?.last_page !== 1;
        });
    }

    pageMaxCount() {
        return new Array(this.schedules?.meta?.last_page);
    }
}
