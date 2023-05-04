import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ISchedule, IScheduleCollection } from 'src/app/core/models';

@Component({
  selector: 'app-schedule-section-table',
  templateUrl: './schedule-section-table.component.html',
})
export class ScheduleSectionComponent implements OnChanges {
  @Input() data?: IScheduleCollection;
  @Output() delete = new EventEmitter<number>();
  schedules?: ISchedule[];

  ngOnChanges(): void {
    if (this.data?.data) this.schedules = this.data.data as ISchedule[];
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
