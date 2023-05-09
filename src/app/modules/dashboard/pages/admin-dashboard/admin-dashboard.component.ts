import { ScheduleService } from './../../../../core/services/schedule.service';
import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RoomKeyLogsService } from 'src/app/core/services/roomkey-logs.service';
import {
  IAvailableKeys,
  IRoomKeyLog,
  IRoomKeyLogCollection,
} from 'src/app/core/models';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  roomKeyLogs?: IRoomKeyLog[];
  roomKeyLogsCollection?: IRoomKeyLogCollection;
  attendanceToday: any = {
    presents: 0,
    absents: 0,
    not_visited: 0,
  };
  availableKeys: IAvailableKeys = {
    available: 0,
    available_percentage: 0,
    unavailable: 0,
    unavailable_percentage: 0,
    total_keys: 0,
  };
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
      this.roomKeyLogsService.getAvailableRoomKeys$(),
    ]).subscribe(([logs, schedules, available]) => {
      console.log(logs, schedules);
      this.attendanceToday = schedules;
      this.roomKeyLogsCollection = logs;
      if (
        this.roomKeyLogsCollection.data &&
        Array.isArray(this.roomKeyLogsCollection.data)
      ) {
        this.roomKeyLogs = this.roomKeyLogsCollection.data;
      }
      if (available) {
        this.availableKeys = available;
      }
    });
  }
}
