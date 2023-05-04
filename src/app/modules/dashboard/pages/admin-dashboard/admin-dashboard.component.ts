import { ScheduleService } from './../../../../core/services/schedule.service';
import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RoomKeyLogsService } from 'src/app/core/services/roomkey-logs.service';
import { IRoomKeyLog, IRoomKeyLogCollection } from 'src/app/core/models';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  roomKeyLogs?: IRoomKeyLog[];
  roomKeyLogsCollection?: IRoomKeyLogCollection;
  // Defining a constructor for the DashboardComponent class
  constructor(
    private roomKeyLogsService: RoomKeyLogsService,
    private schedulesService: ScheduleService
  ) {}

  // Implementing the ngOnInit lifecycle hook
  ngOnInit(): void {
    forkJoin([
      this.roomKeyLogsService.getRoomKeyLogs$(),
      this.schedulesService.loadSchedules$({ 'admin-dash': true }),
    ]).subscribe(([logs, schedules]) => {
      console.log(logs, schedules);
      this.roomKeyLogsCollection = logs;
      if (
        this.roomKeyLogsCollection.data &&
        Array.isArray(this.roomKeyLogsCollection.data)
      ) {
        this.roomKeyLogs = this.roomKeyLogsCollection.data;
      }
    });
  }
}
