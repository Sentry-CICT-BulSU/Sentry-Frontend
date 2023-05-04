import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { ISchedule, IScheduleCollection } from 'src/app/core/models';

@Component({
  selector: 'app-schedule-faculty-table',
  templateUrl: './schedule-faculty-table.component.html',
})
export class ScheduleFacultyComponent implements OnChanges {
  @Input() data?: IScheduleCollection | null;
  @Output() delete = new EventEmitter<number>();
  schedules?: ISchedule[];

  ngOnChanges(): void {
    console.log(this.data);
    this.schedules = this.data?.data as ISchedule[];
  }
  onDelete(id: number) {
    this.delete.emit(id);
  }
}
