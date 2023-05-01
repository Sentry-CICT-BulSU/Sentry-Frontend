import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ISchedule, IScheduleCollection } from 'src/app/core/models';

@Component({
  selector: 'app-schedule-section-table',
  templateUrl: './schedule-section-table.component.html',
})
export class ScheduleSectionComponent implements OnChanges {
  @Input() data?: IScheduleCollection;
  schedules?: ISchedule[];

  ngOnChanges(): void {
    if (this.data?.data) this.schedules = this.data.data as ISchedule[];
  }
}
